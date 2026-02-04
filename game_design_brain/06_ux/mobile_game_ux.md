# Mobile Game UX

## Designing for Touch, Sessions, and Mobile-First Experiences

Mobile game UX addresses the unique constraints and opportunities of smartphone gaming. Touch input, variable session lengths, notification ecosystems, and monetization UX create a distinct design discipline that serves billions of players worldwide.

---

## 1. Mobile-Specific Design Constraints

### The Mobile Context

Mobile gaming happens in contexts fundamentally different from PC/console:
- **Interstitial time**: Bus stops, waiting rooms, lunch breaks
- **Distracted attention**: Notifications, conversations, environmental noise
- **Variable connection**: WiFi, cellular, offline transitions
- **Battery and thermal**: Extended gameplay drains battery and heats device
- **Physical ergonomics**: One or two hands, portrait or landscape, varying device sizes

### Device Fragmentation

| Dimension | Range | Design Impact |
|-----------|-------|---------------|
| Screen size | 4.7" - 6.9" (phones), 7.9" - 12.9" (tablets) | Layout scaling, touch target sizing |
| Aspect ratio | 16:9, 18:9, 19.5:9, 20:9 | UI element positioning, safe areas |
| Resolution | 720p - 2K+ | Asset quality, text readability |
| Performance | Low-end (2GB RAM) to flagship (12GB+ RAM) | Graphics settings, simulation complexity |
| OS version | iOS 15+ / Android 10+ (typical minimum) | API availability, feature support |

### The Notch and Safe Areas

Modern phones have notches, dynamic islands, and rounded corners that intrude on screen space:
- Define safe inset areas for all interactive elements
- Never place critical UI under notch/dynamic island
- Account for status bar and home indicator zones
- Test on multiple device form factors

---

## 2. Touch Input Design

### Touch Targets

| Element | Minimum Size | Recommended Size | Notes |
|---------|-------------|-----------------|-------|
| Primary button | 44x44 pt (iOS) / 48x48 dp (Android) | 56x56+ pt | Critical actions (attack, confirm) |
| Secondary button | 32x32 pt | 44x44 pt | Settings, navigation |
| Spacing | 8 pt minimum | 12+ pt | Between adjacent touch targets |
| Drag handle | 44 pt width | 56+ pt | Sliders, scrollable elements |

### Touch Gesture Vocabulary

| Gesture | Common Use | Complexity |
|---------|-----------|------------|
| Tap | Select, confirm, attack | Basic |
| Long press | Context menu, charge action | Basic |
| Swipe | Scroll, navigate, dodge | Basic |
| Drag | Move objects, aim | Intermediate |
| Pinch/spread | Zoom in/out | Intermediate |
| Multi-touch | Simultaneous actions | Advanced |
| Joystick (virtual) | Movement control | Intermediate |

### Virtual Joystick Design

Virtual joysticks are the most common movement input for mobile games:

**Fixed joystick**: Always in the same position.
- Pros: Predictable, muscle memory
- Cons: Thumb may not naturally rest there, hand fatigue

**Floating joystick**: Appears wherever the player touches.
- Pros: Comfortable starting position, natural grip
- Cons: Can be disorienting, inconsistent position

**Relative joystick**: Movement relative to initial touch, not screen position.
- Pros: No visual element needed, clean screen
- Cons: Learning curve, less precise

### One-Handed Play Design

Many mobile sessions are one-handed (commuting, eating, holding a child):

**One-handed design principles:**
- Place primary actions within thumb reach zone
- Lower portion of screen is most accessible
- Avoid requiring simultaneous left and right actions
- Support portrait mode for one-handed play
- Swipe gestures from screen edges are reachable

**Thumb Reach Zones (right-handed):**
```
┌─────────────────┐
│  Hard   Hard    │
│  to     to      │
│  reach  reach   │
│                 │
│    Easy         │
│    reach  Easy  │
│           reach │
│  Natural        │
│  rest     Easy  │
└─────────────────┘
```

---

## 3. Portrait vs Landscape

### Orientation Trade-offs

| Factor | Portrait | Landscape |
|--------|----------|-----------|
| One-handed play | Excellent | Poor |
| Screen width | Limited | Full |
| Immersion | Lower | Higher |
| Social context | Discreet | Obvious |
| Casual perception | More casual | More "gaming" |
| Content display | Tall, scrollable | Wide, cinematic |

### When to Use Each

**Portrait**: Casual games, card games, idle games, puzzle games, social games.
- Candy Crush, Wordle, Clash Royale, Pokrmon GO (exploration)

**Landscape**: Action games, racing, shooters, platformers, story-driven games.
- Call of Duty Mobile, PUBG Mobile, Genshin Impact

**Both (responsive)**: Games that support both orientations.
- Requires two UI layouts (significant development investment)
- Best for games with diverse play contexts

---

## 4. Session Design for Mobile

### Session Architecture

Mobile sessions are typically shorter than PC/console:

**Micro-session (1-3 minutes):**
- Single puzzle level
- One battle/match
- Check in on progress
- Collect rewards
- Design: Immediately engaging, complete cycle in under 3 minutes

**Short session (5-15 minutes):**
- Complete daily activities
- Several matches/levels
- Social interactions
- Story chapter
- Design: Satisfying arc with clear stopping point

**Extended session (15-45 minutes):**
- Competitive matches
- Story progression
- Event content
- Design: Opt-in deeper engagement, never forced

### Session Entry and Exit

**Fast entry**: Time from tap to gameplay should be under 15 seconds.
- Minimize splash screens (regulatory only)
- Auto-login (no password entry each session)
- Resume state (return to exactly where player left off)
- Skip to gameplay (not through menus)

**Clean exit**: Support interruption at any point.
- Auto-save continuously
- Graceful handling of calls, notifications, app switching
- Session summary on return (what happened while away)
- No punishment for leaving (no "abandon match" penalty for casual)

---

## 5. Notification Strategy

### Notification Taxonomy for Games

| Type | Purpose | Urgency | Example |
|------|---------|---------|---------|
| Ready state | Resource/timer complete | Medium | "Your crops are ready to harvest!" |
| Social | Friend/guild activity | Low-medium | "Player X just beat your score!" |
| Event | Limited-time content | Medium | "Weekend event starts in 1 hour" |
| Re-engagement | Bring back lapsed player | Low | "New content awaits you" |
| Reward | Available unclaimed reward | Medium | "Your daily reward is ready" |
| Competitive | PvP-related | High | "You're being attacked!" |

### Notification Design Best Practices

**Frequency Management:**
- Maximum 2-3 notifications per day (absolute maximum)
- Batch notifications (combine multiple events into one)
- Time-of-day awareness (respect sleep hours, work hours)
- Progressive reduction (fewer notifications for less active players)

**Content Design:**
- Actionable (player can respond meaningfully)
- Informative (not just "Come play!")
- Personalized (reference player's specific state)
- Value-positive (every notification should make the player's experience better)

**Permission Strategy:**
- Don't ask for notification permission immediately at install
- Ask after the player has experienced value (post-tutorial, post-first session)
- Explain what notifications will contain before asking
- Respect denial; don't repeatedly ask

### Notification Anti-Patterns

- "We miss you!" (desperation; feels manipulative)
- Multiple daily notifications (spam)
- Notifications about events the player doesn't care about
- FOMO-inducing language ("Don't miss out!", "Expiring soon!")
- Notifications at inappropriate times (middle of night)

---

## 6. Loading and Wait States

### Loading UX for Mobile

Loading on mobile feels longer due to shorter session expectations:

**Loading Best Practices:**
- Progress indicators (percentage, bar, animation)
- Useful content during loading (tips, lore, news)
- Interactive loading (mini-games, if technically feasible)
- Background loading (load next content while playing current)
- Skeleton screens (show layout before content loads)

### Wait State Design

Mobile games frequently use real-time wait mechanics (building, growing, crafting):

**Wait State UX:**
- Clear timer display (countdown or completion time)
- Notification option for completion ("Notify me when done")
- Queue system (set up next task before current completes)
- Speed-up option (premium currency or watch ad)
- Visual progress (partially built building, growing plant)

---

## 7. Monetization UX

### Store Design for Mobile

The in-game store is both a monetization tool and a UX surface:

**Store UX Principles:**
1. **Browsable**: Easy to browse categories (currency, items, bundles, offers)
2. **Preview**: Show items in context (character wearing skin, item in inventory)
3. **Clear pricing**: Show real-money cost, not just premium currency
4. **Value communication**: Compare to regular price, show savings percentage
5. **Limited friction**: One-tap purchase flow (Face ID, fingerprint, stored payment)
6. **No confusion**: Clear distinction between free and paid items

### IAP Surfacing Strategy

When and where to show purchase opportunities:

**Positive moments** (preferred):
- After a victory: "Celebrate with a special offer!"
- After earning premium currency: "You have enough for..."
- During customization: "More styles available"
- At natural transitions: "Today's deal" on login

**Negative moments** (use carefully):
- After failure: "Need a boost?" (ethically sensitive)
- At progression walls: "Speed up with..." (can feel exploitative)
- When resources are depleted: "Refill now" (acceptable if not aggressive)

### Purchase Flow Optimization

```
See Offer → Tap Buy → Confirm Price → Authenticate → Success → Receive Item
             (1 tap)    (price visible)  (Face ID/Touch) (celebration)  (instant)
```

**Key principle**: Remove friction from the purchase flow while ensuring the player always sees the real-money price before authenticating.

---

## 8. Social UX on Mobile

### Mobile Social Challenges

- Small screen limits social feature real estate
- Text input is slow on mobile (prefer pre-written messages, emotes)
- Voice chat has device microphone quality variance
- Social features compete with core gameplay for screen space

### Social Feature UX Solutions

**Quick communication:**
- Pre-written message selection (chat wheels, quick responses)
- Emote buttons during gameplay
- One-tap reactions to events (nice shot, well played)
- Sticker systems for chat

**Friend system:**
- In-game friend list with online status
- Friend suggestions (friends of friends, recent opponents)
- Easy invite sharing (deep link, QR code, share sheet)
- Friend activity feed (achievements, milestones)

**Guild/clan UX:**
- Guild discovery and join (browse, search, invite)
- Guild chat with pinned messages
- Member management (simple role system)
- Guild activity dashboard

---

## 9. Performance and Battery UX

### Performance Settings

Mobile games should provide performance options:

| Setting | Options | Impact |
|---------|---------|--------|
| Graphics quality | Low / Medium / High / Ultra | Frame rate, visual quality |
| Frame rate | 30 / 60 / 120 FPS | Smoothness, battery drain |
| Shadow quality | Off / Low / High | Visual quality, performance |
| Anti-aliasing | Off / Low / High | Edge quality, performance |
| Resolution | Native / Reduced | Clarity, performance |
| Battery saver | On / Off | Reduces quality to save battery |

### Battery and Thermal Management

- Display estimated battery drain per quality setting
- Auto-reduce quality when battery is low (<20%)
- Thermal throttling: gracefully reduce quality when device overheats
- Background optimization: minimize power use when app is backgrounded
- Network optimization: batch server calls, minimize polling frequency

---

## 10. Mobile-Specific Testing

### Testing Checklist for Mobile Game UX

- [ ] All touch targets meet minimum size requirements
- [ ] Game is playable one-handed (if applicable)
- [ ] Interruptions handled gracefully (calls, notifications, app switch)
- [ ] Loading times under 5 seconds on target devices
- [ ] Text readable at default device settings
- [ ] Safe areas respected on all device form factors
- [ ] Battery drain within acceptable range (under 15% per hour)
- [ ] Network transitions handled (WiFi to cellular, connection loss)
- [ ] Notification permissions requested at appropriate time
- [ ] Purchase flow shows real-money price before confirmation
- [ ] Tutorial completable in under 3 minutes
- [ ] First core loop engagement within 60 seconds of launch

---

## Summary

Mobile game UX is a specialized discipline that bridges game design, mobile platform expertise, and behavioral economics. The best mobile games feel native to the device --- touch input feels natural, sessions fit into real life, and monetization is seamlessly integrated without being manipulative. Success on mobile requires understanding not just how people play, but when, where, and why they play.

---

*Game Design Brain | Module 06 | UX*
*DropFly OS --- PhD-Level Game Design Knowledge System*
