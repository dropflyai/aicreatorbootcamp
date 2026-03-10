# AI Creator Bootcamp — Design System

## The Vision

**"Their Space, Not Your School"**

This platform should feel like a Discord server meets TikTok meets Notion — a space high schoolers have made their own, not an LMS they're forced to use. Every design decision rejects corporate/institutional aesthetics in favor of raw authenticity.

---

## Design Philosophy

### The Three Pillars

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   1. AUTHENTIC — Raw over polished. Imperfect is perfect.      │
│   2. OWNED — Their space, their customization, their voice.    │
│   3. ALIVE — Social, reactive, always something happening.     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### What We're NOT Building

| Avoid | Why |
|-------|-----|
| Canvas/Schoology vibes | Feels like homework |
| Corporate gradients | "Hello fellow kids" energy |
| Stock photos of students | Cringe, fake |
| White backgrounds | Dated, institutional |
| Confetti celebrations | Feels patronizing |
| "Welcome, Student!" | Robotic, impersonal |
| Hamburger menus | Hidden = forgotten |
| Progress bars that look like loading screens | School system energy |

---

## Color System

### Primary Palette (Dark Mode First)

```css
/* Base - The Foundation */
--bg-void: #0A0A0A;        /* True dark for immersion */
--bg-primary: #0D0D0D;      /* Main background */
--bg-secondary: #161616;    /* Cards, elevated surfaces */
--bg-elevated: #1F1F1F;     /* Modals, dropdowns */
--bg-glass: rgba(255, 255, 255, 0.03);  /* Glassmorphism */

/* Accent - The Energy */
--accent-primary: #BFFF00;   /* Cyber Lime - achievements, CTAs */
--accent-secondary: #A855F7; /* Electric Purple - social, community */
--accent-tertiary: #FF6B9D;  /* Hot Pink - notifications, alerts */
--accent-blue: #3B82F6;      /* Electric Blue - links, info */

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A3A3A3;
--text-muted: #525252;
--text-accent: var(--accent-primary);

/* Feedback States */
--success: #22C55E;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;

/* Gradients (Use Sparingly) */
--gradient-cyber: linear-gradient(135deg, #BFFF00 0%, #00FF88 100%);
--gradient-purple: linear-gradient(135deg, #A855F7 0%, #6366F1 100%);
--gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
```

### Light Mode (Optional, Not Default)

```css
--bg-primary: #FAFAFA;
--bg-secondary: #FFFFFF;
--bg-elevated: #FFFFFF;
--text-primary: #171717;
--text-secondary: #525252;
/* Accents remain the same */
```

### Color Usage Rules

1. **Dark mode is default** — 70%+ of Gen Z prefer it
2. **Cyber Lime sparingly** — For achievements, XP, success moments
3. **Purple for social** — Community features, collaboration, profiles
4. **Pink for attention** — Notifications, streaks, urgent
5. **No corporate blue** — Avoid LinkedIn/Facebook energy
6. **High contrast always** — WCAG AA minimum

---

## Typography

### Font Stack

```css
/* Display / Headings - Personality */
--font-display: 'Space Grotesk', 'Clash Display', system-ui, sans-serif;

/* Body - Readable but not boring */
--font-body: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif;

/* Mono / Code - Technical moments */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Achievement / Gaming - Nostalgia */
--font-pixel: 'Press Start 2P', monospace;
```

### Type Scale

```css
/* Responsive scale using clamp() */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
--text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem);

/* Line heights */
--leading-tight: 1.1;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Letter spacing */
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.05em;
```

### Typography Rules

1. **Headings use Space Grotesk** — Variable weight, personality
2. **Body uses Inter** — Clean, not corporate
3. **Pixel font for achievements ONLY** — Badges, XP displays, level-ups
4. **No serif fonts** — Feel too institutional
5. **Bold over size for emphasis** — Dense information environment

---

## Spacing & Layout

### Spacing Scale

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

### Container Widths

```css
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Responsive Breakpoints

```css
/* Mobile-first breakpoints */
--breakpoint-xs: 320px;   /* Small phones */
--breakpoint-sm: 384px;   /* Large phones */
--breakpoint-md: 768px;   /* iPad portrait, Chromebook */
--breakpoint-lg: 1024px;  /* iPad landscape, laptop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

---

## Components

### Buttons

```css
/* Base Button */
.btn {
  @apply font-semibold rounded-xl px-6 py-3;
  @apply transition-all duration-200 ease-out;
  @apply min-h-[48px] min-w-[48px]; /* Touch target */
  @apply active:scale-95;
}

/* Primary - Cyber Lime */
.btn-primary {
  @apply bg-[#BFFF00] text-black;
  @apply hover:bg-[#D4FF4D] hover:shadow-[0_0_20px_rgba(191,255,0,0.3)];
}

/* Secondary - Glass */
.btn-secondary {
  @apply bg-white/5 text-white border border-white/10;
  @apply hover:bg-white/10 hover:border-white/20;
}

/* Ghost */
.btn-ghost {
  @apply bg-transparent text-white/70;
  @apply hover:text-white hover:bg-white/5;
}

/* Destructive */
.btn-destructive {
  @apply bg-red-500/10 text-red-400 border border-red-500/20;
  @apply hover:bg-red-500/20;
}
```

### Cards

```css
/* Base Card */
.card {
  @apply bg-[#161616] rounded-2xl;
  @apply border border-white/5;
  @apply p-6;
}

/* Glass Card */
.card-glass {
  @apply bg-white/[0.03] backdrop-blur-xl;
  @apply border border-white/10;
  @apply rounded-2xl p-6;
}

/* Interactive Card */
.card-interactive {
  @apply card cursor-pointer;
  @apply transition-all duration-200;
  @apply hover:border-white/20 hover:bg-[#1A1A1A];
  @apply hover:-translate-y-1;
}

/* Featured Card (for highlighted content) */
.card-featured {
  @apply card;
  @apply border-[#BFFF00]/20;
  @apply shadow-[0_0_30px_rgba(191,255,0,0.1)];
}
```

### Inputs

```css
/* Base Input */
.input {
  @apply bg-white/5 border border-white/10;
  @apply rounded-xl px-4 py-3;
  @apply text-white placeholder:text-white/30;
  @apply focus:outline-none focus:ring-2 focus:ring-[#BFFF00]/50;
  @apply focus:border-[#BFFF00]/50;
  @apply transition-all duration-200;
  @apply min-h-[48px]; /* Touch target */
}

/* Textarea */
.textarea {
  @apply input resize-none;
  @apply min-h-[120px];
}

/* Select */
.select {
  @apply input appearance-none;
  @apply bg-[url('data:image/svg+xml,...')] bg-no-repeat bg-right;
}
```

### Badges & Tags

```css
/* XP Badge */
.badge-xp {
  @apply inline-flex items-center gap-1;
  @apply bg-[#BFFF00]/10 text-[#BFFF00];
  @apply px-3 py-1 rounded-full;
  @apply font-pixel text-xs;
}

/* Level Badge */
.badge-level {
  @apply inline-flex items-center gap-2;
  @apply bg-gradient-to-r from-purple-500/20 to-blue-500/20;
  @apply text-white px-4 py-2 rounded-xl;
  @apply border border-purple-500/30;
}

/* Streak Badge */
.badge-streak {
  @apply inline-flex items-center gap-2;
  @apply bg-orange-500/10 text-orange-400;
  @apply px-3 py-1 rounded-full;
  @apply border border-orange-500/20;
}

/* Skill Tag */
.tag {
  @apply inline-flex items-center;
  @apply bg-white/5 text-white/70;
  @apply px-3 py-1 rounded-lg text-sm;
  @apply border border-white/5;
}
```

### Progress Indicators

```css
/* XP Progress Bar */
.progress-xp {
  @apply h-2 bg-white/5 rounded-full overflow-hidden;
}

.progress-xp-fill {
  @apply h-full bg-gradient-to-r from-[#BFFF00] to-[#00FF88];
  @apply transition-all duration-500 ease-out;
}

/* Streak Ring */
.streak-ring {
  @apply relative w-16 h-16;
  /* SVG-based circular progress */
}

/* Weekly Progress */
.week-progress {
  @apply flex gap-1;
}

.week-dot {
  @apply w-3 h-3 rounded-full bg-white/10;
}

.week-dot-active {
  @apply bg-[#BFFF00];
}
```

---

## Navigation

### Bottom Navigation (Mobile)

```
┌────────────────────────────────────────────────────┐
│                    CONTENT                         │
│                                                    │
├────────────────────────────────────────────────────┤
│                                                    │
│    🏠         📚         ✨         👤            │
│   Home      Learn      Create    Profile          │
│                                                    │
│    ●                                               │
│                                                    │
└────────────────────────────────────────────────────┘
```

```css
.nav-bottom {
  @apply fixed bottom-0 left-0 right-0;
  @apply bg-[#0D0D0D]/90 backdrop-blur-xl;
  @apply border-t border-white/5;
  @apply px-6 py-2 pb-safe; /* Safe area for notch phones */
}

.nav-item {
  @apply flex flex-col items-center gap-1;
  @apply text-white/50 py-2 px-4;
  @apply transition-colors duration-200;
}

.nav-item-active {
  @apply text-[#BFFF00];
}
```

### Sidebar Navigation (Desktop)

```css
.nav-sidebar {
  @apply fixed left-0 top-0 bottom-0;
  @apply w-64 bg-[#0D0D0D];
  @apply border-r border-white/5;
  @apply flex flex-col;
}

/* Collapsible on medium screens */
@media (max-width: 1024px) {
  .nav-sidebar {
    @apply w-16;
  }
  .nav-label {
    @apply hidden;
  }
}
```

---

## Animations & Motion

### Core Principles

1. **Purposeful** — Every animation communicates something
2. **Fast** — Under 300ms for interactions
3. **Subtle** — Enhance, don't distract
4. **Performant** — Transform and opacity only

### Animation Tokens

```css
/* Timing */
--duration-instant: 75ms;
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;

/* Easing */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Key Animations

```css
/* Level Up Celebration */
@keyframes levelUp {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); filter: brightness(1.5); }
  100% { transform: scale(1); }
}

/* XP Gain */
@keyframes xpGain {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-30px); opacity: 0; }
}

/* Pulse Glow (for active elements) */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(191, 255, 0, 0.4); }
  50% { box-shadow: 0 0 20px 5px rgba(191, 255, 0, 0.2); }
}

/* Streak Fire */
@keyframes streakFire {
  0%, 100% { transform: scale(1) rotate(-3deg); }
  50% { transform: scale(1.1) rotate(3deg); }
}

/* Slide In From Bottom (mobile sheets) */
@keyframes slideInFromBottom {
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
}

/* Fade In */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Iconography

### Icon Style

- **Lucide Icons** as primary set (clean, consistent)
- **Phosphor Icons** for variety
- **Custom pixel icons** for achievements only

### Icon Sizes

```css
--icon-xs: 14px;
--icon-sm: 16px;
--icon-md: 20px;
--icon-lg: 24px;
--icon-xl: 32px;
--icon-2xl: 48px;
```

### Achievement Icons (Pixel Style)

Custom pixel art badges for:
- Skill achievements
- Level milestones
- Streak achievements
- Community recognition

---

## Shadows & Effects

### Shadows

```css
/* Subtle elevation */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 25px 50px rgba(0, 0, 0, 0.5);

/* Glow effects */
--glow-lime: 0 0 20px rgba(191, 255, 0, 0.3);
--glow-purple: 0 0 20px rgba(168, 85, 247, 0.3);
--glow-pink: 0 0 20px rgba(255, 107, 157, 0.3);
```

### Glassmorphism

```css
.glass {
  @apply bg-white/[0.03];
  @apply backdrop-blur-xl;
  @apply border border-white/10;
}

.glass-strong {
  @apply bg-white/[0.08];
  @apply backdrop-blur-2xl;
  @apply border border-white/20;
}
```

---

## Responsive Behavior

### Mobile First (320px - 767px)

- Bottom navigation always visible
- Full-width cards
- Stack layouts
- Touch targets minimum 48px
- Swipe gestures enabled

### Tablet (768px - 1023px)

- Bottom navigation OR collapsed sidebar
- 2-column layouts where appropriate
- Split view support (iPad)
- Keyboard navigation added

### Desktop (1024px+)

- Full sidebar navigation
- Multi-column layouts
- Hover states active
- Keyboard shortcuts available

### Container Query Example

```css
/* Component responds to container, not viewport */
.project-card {
  @container (min-width: 400px) {
    @apply flex-row;
  }

  @container (min-width: 600px) {
    @apply grid grid-cols-3;
  }
}
```

---

## Accessibility

### Core Requirements

- **WCAG 2.1 AA** minimum
- **Keyboard navigation** for all interactions
- **Screen reader support** with proper ARIA
- **Focus indicators** clearly visible
- **Color not sole indicator** of state

### Focus Styles

```css
:focus-visible {
  @apply outline-none ring-2 ring-[#BFFF00] ring-offset-2 ring-offset-[#0D0D0D];
}
```

### Touch Targets

- Minimum 48x48px for all interactive elements
- Adequate spacing between touch targets (8px minimum)

---

## Voice & Tone in UI

### Personality Traits

- **Encouraging** without being patronizing
- **Direct** without being cold
- **Fun** without being cringe
- **Smart** without being condescending

### Copy Examples

| Situation | Bad | Good |
|-----------|-----|------|
| Empty state | "No content to display" | "Your first project is waiting" |
| Error | "Error 404" | "This page bounced. Let's get you back." |
| Loading | "Please wait..." | "Loading..." or just spinner |
| Achievement | "Congratulations! You earned a badge!" | "New badge unlocked: Lighting Pro" |
| Streak warning | "Don't lose your streak!" | "Your streak's at 7. Keep it alive?" |
| CTA | "Click here to continue" | "Let's go" or "Start creating" |

### What to Avoid

- Exclamation points everywhere!!!
- "Awesome!" "Amazing!" "Great job!" (overuse)
- Corporate speak ("leverage", "synergy")
- Talking down ("Good try!")
- Forced slang (whatever is trending)

---

## Implementation Notes

### Tech Stack

```
Next.js 15 (App Router)
├── React 19
├── Tailwind CSS v4
├── Shadcn/ui (customized)
├── Framer Motion (animations)
├── Lucide Icons
├── next-pwa (offline support)
└── Supabase (backend)
```

### File Structure

```
/app
  /components
    /ui          # Base components (buttons, inputs, cards)
    /features    # Feature components (gallery, progress, etc.)
    /layout      # Navigation, headers, footers
  /lib
    /utils       # Helper functions
    /hooks       # Custom hooks
  /styles
    globals.css  # Tailwind + custom CSS
    tokens.css   # Design tokens
```

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3s
- **Memory footprint**: < 200MB (Chromebook friendly)

---

## Design Files

These design specs should be implemented in:
- Figma design system file
- Storybook component library
- Documentation site

---

**Created by**: prototype_x1000 brain system
**Research sources**: 50+ articles on Gen Z design, edtech UX, gamification psychology
**Last updated**: March 2026
