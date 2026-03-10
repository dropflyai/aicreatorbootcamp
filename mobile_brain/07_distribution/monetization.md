# Mobile Monetization

## Foundational Reference

This module codifies the technical implementation of mobile monetization —
in-app purchases (IAP), subscriptions, and related commerce mechanics.
Monetization strategy (pricing, packaging, positioning) is owned by the
MBA Brain. This module owns the technical implementation that makes
those strategies possible.

References: Apple StoreKit 2 documentation, Google Play Billing Library
documentation, RevenueCat documentation, App Store Review Guidelines
Section 3 (Business), Google Play Billing policy.

---

## Monetization Models

| Model | Description | Platform Commission | Best For |
|-------|-------------|-------------------|----------|
| Paid app | One-time purchase to download | 30% (15% for small biz) | Utilities, premium tools |
| Freemium + IAP | Free download, buy features/content | 30% (15% for small biz) | Games, productivity |
| Subscription | Recurring payment for access | 30% Y1, 15% Y2+ (Apple); 15% (Google) | SaaS, content, services |
| Advertising | Free, monetized via ads | N/A (ad network takes cut) | High-volume, low-engagement apps |
| Hybrid | Subscription + ads for free tier | Mixed | News, streaming, games |

---

## Apple StoreKit 2

StoreKit 2 is Apple's modern in-app purchase framework using Swift
concurrency. It provides client-side purchase verification and a
dramatically simpler API than the original StoreKit.

### Product Configuration

Products are configured in App Store Connect and referenced by ID:

```swift
// Product IDs matching App Store Connect configuration
enum ProductID: String, CaseIterable {
    // Consumable
    case credits10 = "com.app.credits.10"
    case credits50 = "com.app.credits.50"

    // Non-consumable
    case premiumThemes = "com.app.themes.premium"
    case removeAds = "com.app.removeads"

    // Auto-renewable subscriptions
    case monthlyPro = "com.app.pro.monthly"
    case yearlyPro = "com.app.pro.yearly"
}
```

### Store Manager Implementation

```swift
import StoreKit

@Observable
class StoreManager {
    private(set) var products: [Product] = []
    private(set) var purchasedProductIDs: Set<String> = []
    private(set) var subscriptionStatus: SubscriptionStatus = .none

    private var transactionListener: Task<Void, Error>?

    enum SubscriptionStatus {
        case none
        case active(expirationDate: Date, willRenew: Bool)
        case expired
        case inGracePeriod(expirationDate: Date)
        case revoked
    }

    init() {
        // Listen for transaction updates (renewals, refunds, etc.)
        transactionListener = listenForTransactions()
        Task { await updatePurchasedProducts() }
    }

    deinit {
        transactionListener?.cancel()
    }

    // MARK: - Load Products

    func loadProducts() async throws {
        let productIDs = ProductID.allCases.map(\.rawValue)
        products = try await Product.products(for: Set(productIDs))
            .sorted { $0.price < $1.price }
    }

    // MARK: - Purchase

    func purchase(_ product: Product) async throws -> Transaction? {
        let result = try await product.purchase()

        switch result {
        case .success(let verification):
            let transaction = try checkVerified(verification)
            await updatePurchasedProducts()
            await transaction.finish()
            return transaction

        case .userCancelled:
            return nil

        case .pending:
            // Transaction is pending (Ask to Buy, SCA, etc.)
            return nil

        @unknown default:
            return nil
        }
    }

    // MARK: - Verification

    private func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified(_, let error):
            throw StoreError.verificationFailed(error)
        case .verified(let item):
            return item
        }
    }

    // MARK: - Update Purchased Products

    func updatePurchasedProducts() async {
        var purchased: Set<String> = []

        // Check all current entitlements
        for await result in Transaction.currentEntitlements {
            guard let transaction = try? checkVerified(result) else { continue }
            purchased.insert(transaction.productID)
        }

        // Check subscription status
        if let proGroup = try? await Product.SubscriptionInfo.status(
            for: "com.app.pro" // Your subscription group ID
        ) {
            for status in proGroup {
                guard let transaction = try? checkVerified(status.transaction) else { continue }
                switch status.state {
                case .subscribed:
                    let renewalInfo = try? checkVerified(status.renewalInfo)
                    subscriptionStatus = .active(
                        expirationDate: transaction.expirationDate ?? Date(),
                        willRenew: renewalInfo?.willAutoRenew ?? false
                    )
                case .inGracePeriod:
                    subscriptionStatus = .inGracePeriod(
                        expirationDate: transaction.expirationDate ?? Date()
                    )
                case .expired:
                    subscriptionStatus = .expired
                case .revoked:
                    subscriptionStatus = .revoked
                default:
                    break
                }
            }
        }

        purchasedProductIDs = purchased
    }

    // MARK: - Transaction Listener

    private func listenForTransactions() -> Task<Void, Error> {
        Task.detached {
            for await result in Transaction.updates {
                guard let transaction = try? self.checkVerified(result) else { continue }
                await self.updatePurchasedProducts()
                await transaction.finish()
            }
        }
    }

    // MARK: - Restore

    func restorePurchases() async throws {
        try await AppStore.sync()
        await updatePurchasedProducts()
    }

    // MARK: - Manage Subscription

    func showManageSubscriptions() async {
        if let scene = UIApplication.shared.connectedScenes
            .first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
            try? await AppStore.showManageSubscriptions(in: scene)
        }
    }
}
```

### Subscription Paywall UI

```swift
struct PaywallView: View {
    @Environment(StoreManager.self) private var store
    @State private var selectedProduct: Product?
    @State private var isPurchasing = false

    var body: some View {
        VStack(spacing: 24) {
            // Value proposition
            VStack(spacing: 8) {
                Text("Upgrade to Pro")
                    .font(.largeTitle.bold())
                Text("Unlock all features and remove limits")
                    .foregroundColor(.secondary)
            }

            // Feature list
            FeatureComparisonList()

            // Plan selection
            ForEach(store.subscriptionProducts, id: \.id) { product in
                PlanCard(
                    product: product,
                    isSelected: selectedProduct?.id == product.id,
                    onSelect: { selectedProduct = product }
                )
            }

            // Purchase button
            Button {
                guard let product = selectedProduct else { return }
                Task {
                    isPurchasing = true
                    defer { isPurchasing = false }
                    try? await store.purchase(product)
                }
            } label: {
                if isPurchasing {
                    ProgressView()
                } else {
                    Text("Subscribe Now")
                }
            }
            .buttonStyle(.borderedProminent)
            .disabled(selectedProduct == nil || isPurchasing)

            // Legal links
            HStack {
                Link("Terms", destination: URL(string: "https://myapp.com/terms")!)
                Text(" | ")
                Link("Privacy", destination: URL(string: "https://myapp.com/privacy")!)
                Text(" | ")
                Button("Restore Purchases") {
                    Task { try? await store.restorePurchases() }
                }
            }
            .font(.caption)
        }
    }
}
```

---

## Google Play Billing

### Billing Library Implementation

```kotlin
class BillingManager(
    private val context: Context,
    private val scope: CoroutineScope
) {
    private val billingClient = BillingClient.newBuilder(context)
        .setListener(::onPurchasesUpdated)
        .enablePendingPurchases()
        .build()

    private val _products = MutableStateFlow<List<ProductDetails>>(emptyList())
    val products: StateFlow<List<ProductDetails>> = _products.asStateFlow()

    private val _purchases = MutableStateFlow<List<Purchase>>(emptyList())
    val purchases: StateFlow<List<Purchase>> = _purchases.asStateFlow()

    fun startConnection() {
        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(result: BillingResult) {
                if (result.responseCode == BillingClient.BillingResponseCode.OK) {
                    scope.launch {
                        queryProducts()
                        queryPurchases()
                    }
                }
            }

            override fun onBillingServiceDisconnected() {
                // Retry connection
                scope.launch {
                    delay(5000)
                    startConnection()
                }
            }
        })
    }

    private suspend fun queryProducts() {
        val subParams = QueryProductDetailsParams.newBuilder()
            .setProductList(listOf(
                QueryProductDetailsParams.Product.newBuilder()
                    .setProductId("pro_monthly")
                    .setProductType(BillingClient.ProductType.SUBS)
                    .build(),
                QueryProductDetailsParams.Product.newBuilder()
                    .setProductId("pro_yearly")
                    .setProductType(BillingClient.ProductType.SUBS)
                    .build()
            ))
            .build()

        val result = billingClient.queryProductDetails(subParams)
        if (result.billingResult.responseCode == BillingClient.BillingResponseCode.OK) {
            _products.value = result.productDetailsList ?: emptyList()
        }
    }

    fun launchPurchaseFlow(activity: Activity, productDetails: ProductDetails) {
        val offerToken = productDetails.subscriptionOfferDetails?.firstOrNull()?.offerToken ?: return

        val flowParams = BillingFlowParams.newBuilder()
            .setProductDetailsParamsList(listOf(
                BillingFlowParams.ProductDetailsParams.newBuilder()
                    .setProductDetails(productDetails)
                    .setOfferToken(offerToken)
                    .build()
            ))
            .build()

        billingClient.launchBillingFlow(activity, flowParams)
    }

    private fun onPurchasesUpdated(result: BillingResult, purchases: List<Purchase>?) {
        when (result.responseCode) {
            BillingClient.BillingResponseCode.OK -> {
                purchases?.forEach { purchase ->
                    scope.launch { handlePurchase(purchase) }
                }
            }
            BillingClient.BillingResponseCode.USER_CANCELED -> { /* No action */ }
            else -> { /* Log error */ }
        }
    }

    private suspend fun handlePurchase(purchase: Purchase) {
        if (purchase.purchaseState == Purchase.PurchaseState.PURCHASED) {
            // Verify purchase with your server
            val verified = verifyWithServer(purchase)

            if (verified && !purchase.isAcknowledged) {
                val ackParams = AcknowledgePurchaseParams.newBuilder()
                    .setPurchaseToken(purchase.purchaseToken)
                    .build()
                billingClient.acknowledgePurchase(ackParams)
            }

            queryPurchases() // Refresh purchase state
        }
    }
}
```

---

## Server-Side Verification

**CRITICAL**: Never trust client-side purchase verification alone for
entitlement decisions. Always verify with Apple/Google servers:

```
Purchase Flow (Secure):
1. Client initiates purchase (StoreKit 2 / Google Billing)
2. Platform processes payment
3. Client receives transaction/purchase
4. Client sends receipt/token to YOUR server
5. YOUR server verifies with Apple/Google
   - Apple: App Store Server API v2
   - Google: Google Play Developer API
6. YOUR server grants entitlement
7. Client receives confirmation
```

---

## App Store Review Compliance

| Rule | Apple | Google |
|------|-------|--------|
| Digital content must use IAP | Mandatory (30% commission) | Mandatory (15-30%) |
| Physical goods/services | NOT through IAP | NOT through IAP |
| Subscriptions must explain terms | Required before purchase | Required |
| Restore purchases button | Required | Required |
| Price displayed before purchase | Required | Required |
| Free trial terms | Must be clear | Must be clear |
| Manage subscription link | Required | Required |
| External payment links | Limited (allowed in some regions) | Allowed with fee |

---

**Monetization is code that processes real money. Test exhaustively. Verify server-side.**
