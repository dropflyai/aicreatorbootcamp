# i18n Design — Authoritative Module

Internationalization design ensures that visual layouts, icons, images,
formatting, and user interface patterns work correctly across all target
locales. It bridges engineering (i18n) and content (l10n) by establishing
design principles that accommodate linguistic and cultural variation.

---

## 1. FLEXIBLE LAYOUTS

### Design for Text Expansion

English is among the most compact European languages. Translations expand.

**Expansion by Source Length:**
| Source Length | Typical Expansion |
|-------------|------------------|
| 1–10 characters | +100–200% (very short strings expand most) |
| 11–20 characters | +80–100% |
| 21–50 characters | +40–60% |
| 51–100 characters | +20–40% |
| 100+ characters | +10–20% |

**Button "Save" example:**
| Language | Translation | Chars | Expansion |
|----------|------------|-------|-----------|
| English | Save | 4 | — |
| German | Speichern | 9 | +125% |
| French | Enregistrer | 11 | +175% |
| Portuguese | Salvar | 6 | +50% |
| Japanese | 保存 | 2 | -50% |

### Layout Design Rules

1. **Never fix text container width to English content length.** Use
   min-width + max-width + flexible grow.
2. **Design for the longest expected language.** German and Finnish are
   good benchmarks for European expansion.
3. **Allow text wrapping.** Single-line constraints should be rare.
4. **Use responsive truncation with tooltip.** When space is genuinely
   constrained, truncate with ellipsis and provide full text on hover.
5. **Test with pseudo-localization.** Simulate 30–50% expansion during
   design review.

### Grid and Flexbox for i18n

```css
/* Good: flexible layout */
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.button {
  min-width: 80px;
  padding-inline: var(--spacing-md);
  /* Text determines width */
}

/* Bad: fixed layout */
.button {
  width: 120px; /* Will break in German */
}
```

---

## 2. ICON AND IMAGE LOCALIZATION

### Icon Categories for i18n

| Category | Example | i18n Action |
|----------|---------|-------------|
| Universal | Play, pause, volume, search (magnifier) | No change needed |
| Directional | Forward arrow, progress bar, reply | Mirror for RTL |
| Cultural | Mailbox (US style), thumbs up | Evaluate per market |
| Text-containing | Icons with embedded text | Replace per locale or make text-free |
| Symbolic | Religious, political, body parts | Review for cultural sensitivity |

### Directional Icon Mirroring (RTL)

| Icon | LTR | RTL | Mirror? |
|------|-----|-----|---------|
| Back/forward arrows | ← / → | → / ← | Yes |
| Reply | ↩ | ↪ | Yes |
| Progress bar | Left to right | Right to left | Yes |
| List indent | → | ← | Yes |
| Checkmark | ✓ | ✓ | No |
| Search | 🔍 | 🔍 | No |
| Download | ↓ | ↓ | No |
| Volume | Speaker left, waves right | Mirror | Yes |

### Image Localization

| Image Type | Strategy |
|-----------|----------|
| Photos with text overlay | Separate text layer, localize independently |
| Screenshots | Capture per locale (or use key-locale representative) |
| Illustrations with text | Create text-free versions + overlay system |
| Marketing banners | Recreate per locale (transcreation) |
| Icons with labels | Labels externalized, icon remains |
| Product images | Usually locale-independent |

---

## 3. DATE AND TIME FORMATTING

### Date Format Variation by Locale

| Locale | Short Date | Long Date |
|--------|-----------|-----------|
| en-US | 2/3/2026 | February 3, 2026 |
| en-GB | 03/02/2026 | 3 February 2026 |
| de-DE | 03.02.2026 | 3. Februar 2026 |
| ja-JP | 2026/02/03 | 2026年2月3日 |
| zh-CN | 2026/2/3 | 2026年2月3日 |
| ar-SA | ٣/٢/٢٠٢٦ | ٣ فبراير ٢٠٢٦ |
| ko-KR | 2026. 2. 3. | 2026년 2월 3일 |
| fr-FR | 03/02/2026 | 3 fevrier 2026 |

### Time Format Variation

| Locale | 12-hour | 24-hour | Separator |
|--------|---------|---------|-----------|
| en-US | 2:30 PM | 14:30 | : |
| de-DE | — | 14:30 | : (or 14.30) |
| ja-JP | 午後2:30 | 14:30 | : |
| fr-FR | — | 14 h 30 | h (space) |

### Implementation Rule

**NEVER format dates or times manually.** Always use:
- `Intl.DateTimeFormat` (JavaScript)
- `java.time.format.DateTimeFormatter` (Java)
- ICU DateFormat
- CLDR-based library for your platform

```javascript
// Correct
new Intl.DateTimeFormat('de-DE', {
  year: 'numeric', month: 'long', day: 'numeric'
}).format(date);

// Wrong
`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
```

---

## 4. NUMBER AND CURRENCY FORMATTING

### Number Format Variation

| Locale | 1,234,567.89 Format | Decimal | Grouping |
|--------|---------------------|---------|----------|
| en-US | 1,234,567.89 | . | , |
| de-DE | 1.234.567,89 | , | . |
| fr-FR | 1 234 567,89 | , | (space) |
| hi-IN | 12,34,567.89 | . | , (Indian grouping) |
| ja-JP | 1,234,567.89 | . | , |
| ar-SA | ١٬٢٣٤٬٥٦٧٫٨٩ | ٫ | ٬ |

### Currency Display Variation

| Locale | Amount | Display |
|--------|--------|---------|
| en-US | $1,234.56 | $1,234.56 |
| de-DE | EUR 1234.56 | 1.234,56 EUR |
| ja-JP | JPY 1234 | ¥1,234 (no decimals) |
| en-GB | GBP 1234.56 | £1,234.56 |
| ar-SA | SAR 1234.56 | ١٬٢٣٤٫٥٦ ر.س. |

### Implementation

```javascript
// Correct
new Intl.NumberFormat('de-DE', {
  style: 'currency', currency: 'EUR'
}).format(1234.56); // "1.234,56 €"

// Wrong
'$' + number.toFixed(2)
```

---

## 5. NAME AND ADDRESS FORMATS

### Name Format Variation

| Culture | Format | Example |
|---------|--------|---------|
| Western | Given + Family | John Smith |
| Japanese | Family + Given | 田中 太郎 (Tanaka Taro) |
| Chinese | Family + Given | 王 小明 (Wang Xiaoming) |
| Hungarian | Family + Given | Kovacs Janos |
| Icelandic | Given + Patronymic | Bjork Gudmundsdottir |
| Mononym | Single name | Some Indonesian names |
| Arabic | Given + Father + Grandfather + Family | Complex structure |

### Design Rules for Names

1. **Never assume first name + last name** — Use "given name" and "family name"
2. **Allow single name field** as alternative to split fields
3. **Do not validate name length** — Some names are 1 character, some are 50+
4. **Support Unicode** — Names contain accents, CJK, Arabic, etc.
5. **Avoid "Mr./Mrs."** — Honorific systems vary dramatically

### Address Format Variation

| Country | Format |
|---------|--------|
| US | Street, City, State ZIP |
| UK | Street, City, Postcode |
| Japan | Postal code, Prefecture, City, Street |
| Germany | Street, PLZ City |
| China | Province, City, District, Street |

### Design Rules for Addresses

1. **Use Google's Address Data** (libaddressinput) for format per country
2. **Dynamic form fields** based on selected country
3. **Never assume ZIP code format** — varies by country
4. **Allow free-text** option as fallback

---

## 6. COLLATION (SORT ORDER)

### Sorting Varies by Locale

| Locale | Sort Order | Notes |
|--------|-----------|-------|
| English | A-Z | Standard ASCII sort mostly works |
| Swedish | A-Z, then Å, Ä, Ö | Å, Ä, Ö are separate letters at end |
| German | A-Z (Ä=Ae, Ö=Oe, Ü=Ue) | Umlauts sort as two-character equivalents |
| Spanish | A-Z (ñ after n) | ñ is a separate letter |
| Czech | A-Z (č after c, ř after r) | Háčky create separate letters |
| Japanese | Multiple sort orders | Kanji by reading, kana by syllable |
| Chinese | Pinyin, stroke count, radical | Multiple valid sort orders |

### Implementation

**Always use locale-aware sorting:**
```javascript
// Correct
['Über', 'Ufer', 'Übel'].sort(
  new Intl.Collator('de').compare
);

// Wrong
['Über', 'Ufer', 'Übel'].sort()  // ASCII sort ignores locale
```

---

## 7. CALENDAR AND MEASUREMENT SYSTEMS

### Calendar Systems

| Calendar | Regions | Implementation |
|----------|---------|---------------|
| Gregorian | Most of the world | Default in Intl API |
| Islamic (Hijri) | Middle East, parts of Asia | Intl with calendar option |
| Japanese | Japan (era-based) | Intl with 'japanese' calendar |
| Buddhist | Thailand, Cambodia | Intl with 'buddhist' calendar |
| Hebrew | Israel | Intl with 'hebrew' calendar |

### Week Start Day

| Start Day | Regions |
|-----------|---------|
| Sunday | US, Canada, Japan, Israel |
| Monday | Most of Europe, Australia |
| Saturday | Parts of Middle East, North Africa |

### Measurement Systems

| System | Countries | Units |
|--------|-----------|-------|
| Metric | Most of the world | kg, km, °C, liters |
| Imperial/US Customary | US, Liberia, Myanmar | lb, mi, °F, gallons |
| UK hybrid | United Kingdom | Miles + kg, pints + liters |

---

## 8. DESIGN SYSTEM I18N CHECKLIST

### Typography
- [ ] Font supports all target scripts (Latin, CJK, Arabic, Cyrillic)
- [ ] Font fallback chain defined per script family
- [ ] Line height accommodates tallest script (CJK, Arabic with diacritics)
- [ ] Font size allows for expansion without layout break

### Layout
- [ ] Flexbox/grid used for text containers
- [ ] No fixed widths on text elements
- [ ] RTL support via CSS logical properties
- [ ] Tested with 40% text expansion simulation

### Components
- [ ] Buttons auto-size to content
- [ ] Tables handle variable column widths
- [ ] Forms handle variable label lengths
- [ ] Navigation wraps gracefully on expansion
- [ ] Tooltips accommodate longer text
- [ ] Error messages have space for verbose translations

### Visual
- [ ] Icons reviewed for cultural sensitivity
- [ ] Directional icons have RTL variants
- [ ] Images with text have localization workflow
- [ ] Color meaning verified across cultures

---

## 9. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Fixed-width buttons | Buttons sized for English text | Flexible width, min-width |
| Manual date formatting | `MM/DD/YYYY` hardcoded | Intl.DateTimeFormat |
| Name field assumptions | First/Last name only | Given/Family + single name option |
| ASCII sorting | Default sort for all locales | Intl.Collator |
| Hard-coded units | "$" and "miles" in UI | Locale-aware formatting |
| Western calendar assumption | Gregorian only | Support alternative calendars |

---

**i18n design is the visual counterpart to i18n engineering. While
engineering ensures the code can handle multiple locales, design ensures
the user interface accommodates them gracefully. The two must work in
concert: engineering without design produces functionally correct but
visually broken experiences; design without engineering produces beautiful
mockups that cannot be implemented.**
