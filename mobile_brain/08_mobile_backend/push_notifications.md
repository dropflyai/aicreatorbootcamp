# Push Notifications

## Foundational Reference

Push notifications are the primary mechanism for re-engaging mobile users
outside the app. They are also the feature most likely to cause users to
uninstall your app if misused. This module codifies both the technical
implementation (APNs, FCM) and the strategic framework for notification
systems that users value rather than resent.

References: Apple Push Notification Service documentation, Firebase Cloud
Messaging documentation, Apple HIG notification guidelines, Material Design
notification guidelines, Braze notification strategy research.

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                PUSH NOTIFICATION ARCHITECTURE                 │
│                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────────────────┐  │
│  │  Event    │───►│  Your    │───►│  Platform Service    │  │
│  │  Source   │    │  Server  │    │                      │  │
│  │          │    │          │    │  APNs (iOS)          │  │
│  │ - User   │    │ - Decide │    │  FCM (Android/both)  │  │
│  │   action │    │   to send│    │                      │  │
│  │ - Timer  │    │ - Build  │    │  Routes to device    │  │
│  │ - System │    │   payload│    │  Handles delivery    │  │
│  │   event  │    │ - Target │    │  Manages tokens      │  │
│  └──────────┘    └──────────┘    └────────┬─────────────┘  │
│                                           │                  │
│                                           ▼                  │
│                                  ┌──────────────┐           │
│                                  │   Device     │           │
│                                  │              │           │
│                                  │  Display in  │           │
│                                  │  notification│           │
│                                  │  center      │           │
│                                  │              │           │
│                                  │  App handles │           │
│                                  │  on tap      │           │
│                                  └──────────────┘           │
└──────────────────────────────────────────────────────────────┘
```

---

## Apple Push Notification Service (APNs)

### Server-Side Implementation

```python
# Python example using HTTP/2 to APNs
import jwt
import httpx
import time
import json

class APNsClient:
    PRODUCTION_URL = "https://api.push.apple.com"
    SANDBOX_URL = "https://api.sandbox.push.apple.com"

    def __init__(self, key_id: str, team_id: str, key_path: str, sandbox: bool = False):
        self.key_id = key_id
        self.team_id = team_id
        self.base_url = self.SANDBOX_URL if sandbox else self.PRODUCTION_URL
        with open(key_path, "r") as f:
            self.private_key = f.read()

    def _generate_token(self) -> str:
        payload = {
            "iss": self.team_id,
            "iat": int(time.time())
        }
        return jwt.encode(
            payload, self.private_key,
            algorithm="ES256",
            headers={"kid": self.key_id}
        )

    async def send(
        self,
        device_token: str,
        title: str,
        body: str,
        data: dict = None,
        badge: int = None,
        sound: str = "default",
        category: str = None,
        thread_id: str = None,
        priority: int = 10,
        collapse_id: str = None
    ):
        url = f"{self.base_url}/3/device/{device_token}"

        payload = {
            "aps": {
                "alert": {"title": title, "body": body},
                "sound": sound,
                "mutable-content": 1,  # Enable notification service extension
            }
        }

        if badge is not None:
            payload["aps"]["badge"] = badge
        if category:
            payload["aps"]["category"] = category
        if thread_id:
            payload["aps"]["thread-id"] = thread_id
        if data:
            payload.update(data)

        headers = {
            "authorization": f"bearer {self._generate_token()}",
            "apns-push-type": "alert",
            "apns-priority": str(priority),
            "apns-topic": "com.yourapp.bundle",
        }
        if collapse_id:
            headers["apns-collapse-id"] = collapse_id

        async with httpx.AsyncClient(http2=True) as client:
            response = await client.post(
                url,
                json=payload,
                headers=headers
            )
            return response.status_code == 200
```

---

## Firebase Cloud Messaging (FCM)

FCM supports both iOS and Android. Many teams use FCM as a unified
notification service for both platforms:

```python
# Server-side FCM using Firebase Admin SDK
import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("firebase-credentials.json")
firebase_admin.initialize_app(cred)

async def send_notification(
    token: str,
    title: str,
    body: str,
    data: dict = None,
    image_url: str = None,
    channel_id: str = None  # Android notification channel
):
    notification = messaging.Notification(
        title=title,
        body=body,
        image=image_url
    )

    android_config = messaging.AndroidConfig(
        priority="high",
        notification=messaging.AndroidNotification(
            channel_id=channel_id or "default",
            click_action="OPEN_TASK",
            icon="ic_notification",
            color="#007AFF"
        )
    )

    apns_config = messaging.APNSConfig(
        payload=messaging.APNSPayload(
            aps=messaging.Aps(
                sound="default",
                badge=1,
                mutable_content=True,
                category="TASK_REMINDER"
            )
        )
    )

    message = messaging.Message(
        notification=notification,
        android=android_config,
        apns=apns_config,
        token=token,
        data=data or {}
    )

    response = messaging.send(message)
    return response
```

### Topic-Based Messaging

```python
# Subscribe user to topics
messaging.subscribe_to_topic([device_token], "daily-digest")
messaging.subscribe_to_topic([device_token], "breaking-news")

# Send to all subscribers of a topic
topic_message = messaging.Message(
    notification=messaging.Notification(
        title="Daily Digest",
        body="You have 5 tasks due today"
    ),
    topic="daily-digest"
)
messaging.send(topic_message)
```

---

## Rich Notifications

### iOS Rich Notifications (Notification Service Extension)

Rich notifications can include images, GIFs, audio, and video:

```
Standard notification:        Rich notification:
┌─────────────────────┐      ┌─────────────────────┐
│ App Name            │      │ App Name            │
│ Notification title  │      │ ┌─────────────────┐ │
│ Notification body   │      │ │    [Image]       │ │
│                     │      │ └─────────────────┘ │
└─────────────────────┘      │ Notification title  │
                             │ Notification body   │
                             │                     │
                             │ [Action 1] [Action 2]│
                             └─────────────────────┘
```

### Android Notification Channels

Android 8.0+ requires notification channels. Users control notifications
at the channel level:

```kotlin
class NotificationChannelManager(private val context: Context) {
    fun createChannels() {
        val manager = context.getSystemService<NotificationManager>() ?: return

        val channels = listOf(
            NotificationChannel(
                "task_reminders",
                "Task Reminders",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Reminders for upcoming and overdue tasks"
                enableVibration(true)
                enableLights(true)
                lightColor = Color.BLUE
            },

            NotificationChannel(
                "collaboration",
                "Collaboration",
                NotificationManager.IMPORTANCE_DEFAULT
            ).apply {
                description = "Updates from team members"
            },

            NotificationChannel(
                "weekly_digest",
                "Weekly Digest",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Weekly summary of your productivity"
            }
        )

        manager.createNotificationChannels(channels)
    }
}
```

---

## Notification Strategy

### Permission Request Timing

```
NEVER request permission on first launch.

Instead:
1. User experiences the app's core value
2. User encounters a feature that benefits from notifications
3. Show a pre-permission screen explaining the value
   "Get reminders for your tasks so you never miss a deadline"
4. If user agrees, THEN request system permission

This approach yields 40-60% opt-in rates vs. 30-40% for
immediate permission requests.
```

### Notification Types and Frequency

| Type | Example | Frequency | User Value |
|------|---------|-----------|-----------|
| Transactional | "Order shipped" | Event-driven | Very High |
| Reminder | "Task due in 1 hour" | User-configured | High |
| Social | "Alice commented on your task" | Event-driven | Medium-High |
| Achievement | "You completed 10 tasks!" | Milestone-driven | Medium |
| Re-engagement | "You haven't logged in for 3 days" | Timer-driven | Low |
| Promotional | "New feature available!" | Manual | Very Low |

**Rules:**
1. Transactional and reminder notifications: always send (if permitted).
2. Social notifications: send with intelligent batching (group by thread).
3. Achievement notifications: send sparingly (1-2 per week max).
4. Re-engagement: extreme caution. Users who are gone may stay gone.
5. Promotional: minimize. Each promotional push risks an uninstall.

### Notification Fatigue Prevention

```
Implement server-side rate limiting:

Per-user limits:
- Max 5 notifications per day (excluding user-configured reminders)
- Max 1 notification per hour for non-urgent types
- Never send between 10 PM and 8 AM local time (unless urgent)

Intelligent suppression:
- If user dismissed last 3 notifications → reduce frequency
- If user has the app open → show in-app UI instead of push
- If notification is duplicate of one sent <4 hours ago → suppress
- Batch social notifications: "3 people commented" not 3 separate pushes
```

---

## Deep Linking from Notifications

Every notification should deep link to the relevant content:

```typescript
// React Native notification handler
import * as Notifications from 'expo-notifications';

// Handle notification tap (app was in background/killed)
const lastNotificationResponse = Notifications.useLastNotificationResponse();

useEffect(() => {
  if (lastNotificationResponse) {
    const data = lastNotificationResponse.notification.request.content.data;
    switch (data.type) {
      case 'task_reminder':
        router.push(`/task/${data.taskId}`);
        break;
      case 'comment':
        router.push(`/task/${data.taskId}?comment=${data.commentId}`);
        break;
      case 'weekly_digest':
        router.push('/analytics');
        break;
    }
  }
}, [lastNotificationResponse]);
```

---

## Notification Analytics

Track these metrics for every notification type:

| Metric | Definition | Target |
|--------|-----------|--------|
| Delivery rate | Delivered / Sent | >95% |
| Open rate | Opened / Delivered | >5% |
| Dismiss rate | Dismissed / Delivered | <80% |
| Disable rate | Disabled after / Delivered | <0.5% |
| Conversion rate | Action taken / Opened | Varies by type |

---

**Notifications are a privilege, not a right. Earn each one. Measure the cost.**
