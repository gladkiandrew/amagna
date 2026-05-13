# Amagna AI — Brand Colors

> Source of truth for color values used in the logo, marketing site, decks, and any client-facing collateral. If you change a value here, update the SVGs in `apps/marketing/public/brand/` and any Tailwind theme tokens to match.

---

## Core palette

| Token | Hex | Use |
|---|---|---|
| Royal Purple | `#5D2E8C` | Primary brand color. "Amagna" wordmark on light backgrounds. Buttons, links, accents. |
| Antique Gold | `#C9A961` | Secondary brand color. "AI" wordmark on light backgrounds. Highlights, dividers, premium accents. |
| Dark Mode Gold | `#D4B873` | Lighter gold reserved for dark backgrounds — antique gold loses contrast on dark, this variant restores legibility. |
| White | `#FFFFFF` | Wordmark and text on dark backgrounds; primary surface on light. |

---

## Usage rules

### Logo color pairings

- **Light backgrounds** → `logo.svg` (purple + antique gold)
- **Dark backgrounds** → `logo-dark.svg` (white + dark mode gold)
- **Single-color reproduction** (print, embroidery, favicon) → `logo-mono-purple.svg` or `logo-mono-white.svg`
- **Stacked layouts** (social avatars, square placements) → `logo-stacked.svg` / `logo-stacked-dark.svg`

### Do

- Use Royal Purple as the dominant brand color in marketing surfaces.
- Pair gold with purple — they are a set.
- Switch to Dark Mode Gold any time the background is darker than ~50% gray.

### Don't

- Don't use Antique Gold on dark backgrounds (use Dark Mode Gold instead).
- Don't introduce new accent colors without updating this file first.
- Don't recolor the logo into off-brand combinations (e.g., gold "Amagna" + purple "AI").

---

## Typography (logo lockup)

| Property | Value |
|---|---|
| Font stack | `-apple-system, 'Helvetica Neue', Arial, sans-serif` |
| Weight | 600 |
| Size (lockup) | 36 |
| Letter-spacing — "Amagna" | -1.2 |
| Letter-spacing — "AI" | -0.4 |

The font stack is intentionally system-native — San Francisco on Apple devices, Helvetica Neue / Arial elsewhere. This keeps the wordmark feeling clean and modern across platforms without shipping a custom font.

---

## Code references

### CSS variables

```css
:root {
  --color-royal-purple: #5D2E8C;
  --color-antique-gold: #C9A961;
  --color-dark-mode-gold: #D4B873;
}
```

### Tailwind config

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'royal-purple': '#5D2E8C',
        'antique-gold': '#C9A961',
        'dark-mode-gold': '#D4B873',
      },
    },
  },
};
```

---

*Last updated: 2026-05-13. Update when the palette changes.*
