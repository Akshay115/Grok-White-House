# White House Sochi Design System
## Zaha Hadid–Inspired Parametric Architecture

**Philosophy**  
Light, airy, flowing. Organic parametric curves meet serene minimalism. The UI should feel like walking through a contemporary white villa: generous volumes of light, seamless transitions between spaces, subtle depth created by architecture rather than decoration.  

Everything is bright. Dominant pure white and warm cream. Soft sea teal as the primary accent (evoking the Black Sea and sky). Subtle sage for nature. Warm grays for text. Refined warm gold as a secondary luxury accent only.

**Core Principles**
- Light palette only (no dark theme).
- Generous architectural breathing room.
- Fluid, 60 fps micro-interactions that feel like touching high-end materials.
- Parametric decorative elements are extremely refined — never busy.
- Perfect Cyrillic legibility and elegance.
- Accessibility (WCAG AA+): high contrast on light backgrounds, generous targets, focus states.

---

## 1. Color Tokens (Light Palette Only)

Defined as CSS custom properties in `:root` (see `styles/globals.css`).

| Token                | Hex / Value                  | Usage |
|----------------------|------------------------------|-------|
| `--white`            | `#ffffff`                    | Pure surfaces, text on dark accents |
| `--cream`            | `#f8f5f0`                    | Primary background, cards |
| `--pearl`            | `#f4f1eb`                    | Secondary background, subtle cards |
| `--off-white`        | `#f1ede6`                    | Layered backgrounds |
| `--warm-stone`       | `#e9e4db`                    | Warm neutral surfaces, dividers |
| `--charcoal`         | `#3f3b36`                    | Primary text (warm dark) |
| `--warm-gray`        | `#4f4a45`                    | Body text |
| `--warm-gray-light`  | `#6c6761`                    | Secondary / muted text |
| `--deep-navy`        | `#2a2824`                    | Subtle depth / very low-contrast accents only |
| `--sea-teal`         | `#5ba3b8`                    | **Primary accent** — CTAs, links, icons, parametric strokes |
| `--sea-teal-light`   | `#a8d5e5`                    | Hover states, subtle fills, light accents |
| `--sage`             | `#8a9588`                    | Nature / secondary organic accents |
| `--gold`             | `#c5a77d`                    | Secondary luxury accent (used sparingly) |
| `--gold-light`       | `#d9c7a3`                    | Gold hover / highlights |
| `--gold-soft`        | `#c8b18a`                    | Very subtle gold |
| `--glass`            | `rgba(255,255,255,0.82)`     | Glassmorphism panels |
| `--glass-dark`       | `rgba(63,59,54,0.04)`        | Subtle overlays |

**Semantic aliases (recommended in components)**
- `text-primary` → `--charcoal`
- `text-muted` → `--warm-gray-light`
- `bg-base` → `--cream`
- `bg-elevated` → `--white`
- `border-subtle` → `rgba(79,74,69,0.12)`
- `accent` → `--sea-teal`
- `accent-hover` → `--sea-teal-light`

**Gradients (architectural)**
- Soft linear for depth: `linear-gradient(180deg, var(--cream) 0%, var(--pearl) 100%)`
- Parametric accent: `linear-gradient(to right, transparent, var(--sea-teal), transparent)` at very low opacity.

---

## 2. Typography Scale (Beautiful Cyrillic Support)

**Font Stack**
- Display / Headlines: `Cormorant Garamond` (light 300, italic) — elegant, refined, excellent Cyrillic.
- Body / UI: `Inter` (400–700) — highly legible, beautiful Cyrillic, modern sans.

**Scale (CSS vars + Tailwind)**

| Token / Class     | Size (clamp for fluid)          | Line Height | Letter Spacing     | Weight     | Style     | Usage |
|-------------------|---------------------------------|-------------|--------------------|------------|-----------|-------|
| `--text-hero` / `text-hero` | `clamp(3.5rem, 9vw, 8rem)`     | 0.9–0.95   | -0.02em           | 300        | italic    | Hero headline |
| `--text-h1` / `text-h1`     | `clamp(2.5rem, 5vw, 4.5rem)`   | 1.0–1.05   | -0.015em          | 300        | italic    | Section H1 |
| `--text-h2` / `text-h2`     | `clamp(1.8rem, 3vw, 2.8rem)`   | 1.1        | -0.01em           | 300/400    | italic    | Section H2 |
| `--text-h3` / `text-h3`     | `clamp(1.2rem, 2vw, 1.8rem)`   | 1.2        | 0                  | 300/400    | italic    | Subheadings |
| `--text-body` / `text-body` | `1rem` (16px)                  | 1.7        | 0                  | 400/500    | normal    | Body, long text |
| `text-[0.95rem]`            | 0.95rem                        | 1.65       | 0                  | 400        | normal    | Large body |
| `--text-small`              | 0.875rem                       | 1.5        | 0.01em            | 400/500    | normal    | Captions, meta |
| `text-[0.75rem]`            | 0.75rem                        | 1.4        | 0.08–0.12em       | 400/500    | uppercase | Eyebrows, labels |
| `text-[0.65rem]`            | 0.65rem                        | 1.3        | 0.3em             | 400        | uppercase | Micro labels |

**Cyrillic Best Practices**
- Always use `font-display` for headlines (the italic light weight gives a sculptural, architectural feeling).
- Inter handles Cyrillic beautifully at all weights — no additional font-feature-settings required beyond what the font provides.
- Generous line-height (1.65–1.8) for Russian text readability.
- Tracking: Headlines use slight negative tracking; body is neutral or very slightly positive for all-caps labels.

**Utility**
- `.font-display` forces the elegant italic light display style.
- `.zaha-text` (optional): `font-feature-settings: "tnum" 1;` for tabular numbers.

---

## 3. Spacing Scale (Generous, Architectural)

8-point base grid with large leaps for breathing room.

| Token       | Value   | Tailwind     | Architectural Use |
|-------------|---------|--------------|-------------------|
| `--space-xs`| 0.5rem  | `xs`         | Tight gaps inside cards |
| `--space-sm`| 1rem    | `sm`         | Icon-to-text, small padding |
| `--space-md`| 2rem    | `md`         | Default component padding, card gaps |
| `--space-lg`| 4rem    | `lg`         | Section internal rhythm |
| `--space-xl`| 8rem    | `xl`         | Major vertical breathing (between major sections) |
| `--space-2xl`| 12rem | `2xl`        | Hero / landmark spacing |
| (extra)     | 6rem    | `6rem` (arbitrary or add) | Large terrace-like margins |
| (extra)     | 10rem   | —            | Hero bottom padding, footer separation |

**Usage Rules**
- Section padding: `py-[5rem] md:py-[10rem]` (feels like walking between rooms).
- Container: `max-w-content` (1280px) + generous horizontal padding.
- Never crowd elements. White space is the primary design material.

---

## 4. Border Radius & Curve System

**Radii (large & organic)**

| Token / Class          | Value          | Feel |
|------------------------|----------------|------|
| `rounded-sm` / `--radius-sm` | 4px       | Subtle |
| `rounded` / `--radius-md`    | 8px       | Default cards |
| `rounded-lg` / `--radius-lg` | 16px / 1rem | Comfortable |
| `rounded-xl` / `--radius-xl` | 24px / 1.5rem | Generous villa feel |
| `rounded-2xl`                | 32px / 2rem | Large architectural |
| `rounded-3xl`                | 48px / 3rem | Very organic (used on hero CTAs or feature cards) |
| `rounded-full`               | 999px     | Pills, magnetic buttons |

**Organic Curves (clip-path system)**
Use subtle polygonal / flowing clip-paths instead of (or in addition to) border-radius for a hand-sculpted parametric feeling.

Pre-defined classes (in globals.css):
- `.room-clip-image`, `.about-clip-*`, `.gallery-clip-a/b/c/d`, `.booking-contact-clip`, `.amenity-pool-clip`, `.rooms-banner-clip`

**How to create new organic clips**
```css
.clip-organic-lg {
  clip-path: polygon(0 4%, 96% 0, 100% 94%, 6% 100%);
}
.clip-organic-soft {
  clip-path: polygon(2% 0, 100% 3%, 98% 100%, 0 97%);
}
```

Prefer these on hero images, featured cards, and section transitions.

---

## 5. Shadow System (Architectural Depth)

Shadows emulate light falling on white plaster and stone volumes — soft, directional, never harsh.

| Class / Token             | Value (example)                                      | Purpose |
|---------------------------|------------------------------------------------------|---------|
| `shadow-sm` (Tailwind)    | 0 1px 2px rgb(0 0 0 / 0.05)                          | Very subtle lift |
| `shadow`                  | 0 4px 12px -2px rgb(0 0 0 / 0.06)                    | Standard card |
| `shadow-md`               | 0 10px 30px -8px rgb(0 0 0 / 0.08)                   | Elevated surface |
| `.sculptural-card` hover  | `0 40px 90px -20px rgba(31,31,31,0.12)` + subtle ring | Major architectural depth |
| `shadow-glow` (custom)    | `0 0 40px rgba(91,163,184,0.12)` (sea-teal)          | Soft parametric glow on accent elements |
| `shadow-inner-soft`       | `inset 0 2px 4px rgba(0,0,0,0.03)`                   | Recessed feeling (used sparingly) |

**Guidelines**
- Use multiple layered shadows for volume (base + long soft).
- On pure white/cream backgrounds, shadows are very low opacity.
- Hover states increase both vertical offset and softness (fluid lift).

---

## 6. Button Styles

**Base**
All buttons use `font-body`, `uppercase tracking-[0.1em]`, smooth cubic-bezier(0.23,1,0.32,1) transitions, generous padding.

**Variants**

1. **Primary Elegant** (`.btn-primary` or `.hero-cta-primary`)
   - Background: `--sea-teal`
   - Text: white
   - Large rounded (2rem–3rem or full)
   - Subtle shadow
   - Hover: `--sea-teal-light` background, text becomes `--charcoal`, gentle lift + scale(1.01)
   - Magnetic feel: add a radial highlight that follows cursor (see fluid-button or Framer magnetic wrapper)

2. **Secondary Subtle** (`.btn-secondary`)
   - Transparent or `--glass`
   - Border: subtle `--warm-gray` or `--sea-teal` at low opacity
   - Text: `--warm-gray` or `--charcoal`
   - Hover: light background wash, border strengthens to `--sea-teal`

3. **Magnetic Hover**
   - Use on primary CTAs.
   - Techniques:
     - CSS: `.fluid-button` (expanding radial glow)
     - Better: Framer Motion `whileHover={{ scale: 1.015 }}` + spring + cursor-following highlight div (magnetic).
     - GSAP for more complex (e.g. the existing nav-cta).

**Sizes**
- Default: `py-3.5 px-7` or similar generous
- Compact: for nav

**Icon + Text**: 0.5rem gap, icon size consistent (lucide stroke 1.75–2).

---

## 7. Card Styles with Fluid Hover States

**Base Card**
```css
.card {
  background: var(--white);
  border: 1px solid rgba(79, 74, 69, 0.1);
  border-radius: 1rem; /* or organic clip */
  transition: transform 0.6s cubic-bezier(0.23,1,0.32,1),
              box-shadow 0.6s cubic-bezier(0.23,1,0.32,1),
              border-color 0.4s ease;
}
```

**Fluid Hover (architectural lift)**
- Translate Y negative (–8px to –14px)
- Soften and lengthen shadow dramatically
- Subtle border color shift toward `--sea-teal` or `--gold`
- Optional 3D tilt via Framer `useMotionValue` + `rotateX/Y` (already used in About collage and RoomCard)

**Variants**
- `.card-fluid` — the main one used for rooms/experiences.
- `.sculptural-card` — stronger architectural version.
- Glass variant for overlays.

Add inner subtle parametric line or gradient on hover for extra Zaha feeling.

---

## 8. Parametric Decorative Elements

**Philosophy**: Extremely refined. 5–15% opacity. Never compete with content. Evoke flowing concrete, light on water, or distant mountain ridges.

**Core Implementation**
- Re-use and extend the existing `lib/hadid-paths.ts` (beautiful bezier sets already tuned for morphing: Aliyev, MAXXI, Aquatics, Galaxy).
- `components/ui/HadidFlow.tsx` — the current powerful engine (hero layers, background fragments, section dividers, footer sweeps). Use with very low `opacity` (0.03–0.08) and `color="sea-teal"` or `"gold"` (subtle).

**New Recommended Lightweight Primitives**
- `.parametric-line` — single flowing bezier stroke, very thin (0.5–1px), low opacity.
- `<ParametricAccent />` (to be created) — a thin animated SVG line or group that can sit behind text or as a section divider. Slow morph or drift.
- Subtle drifting fragments behind large text blocks or full-bleed images.

**Usage Examples**
```tsx
<HadidFlow 
  variant="background" 
  color="sea-teal" 
  opacity={0.035} 
  animate 
/>
```
Place behind light sections. Use `drift` and intersection-triggered play/pause.

Keep stroke-linecap/join round. Morph very slowly (8–15s cycles).

Avoid on text-heavy areas unless opacity < 4%.

---

## 9. Icon Style

**Base**
- Use `lucide-react` exclusively (already the project standard).
- Stroke width: 1.5–1.75 for most, 2 for emphasis.
- Size: 18–24px in UI, 28–40px for feature icons.
- Color: `--sea-teal`, `--warm-gray`, or `--charcoal`.

**Wrapper Component** (`components/ui/Icon.tsx`)
```tsx
<Icon icon={Mountain} className="text-sea-teal" animateOnHover />
```
- On hover: gentle scale (1.05–1.1) + very subtle rotation or stroke-dash animation (using Framer Motion on the SVG path if needed).
- Keep it minimal — the animation should feel like a gentle breath, not a bounce.

**Do not** add heavy fills or complex icon illustrations. Line only.

---

## Implementation Notes

- All tokens live in CSS custom properties first (source of truth).
- Tailwind config maps them.
- `lib/design-tokens.ts` exports a typed object for JS usage (colors as strings, spacing numbers, etc.).
- Prefer the semantic component classes (`.btn-primary`, `.card-fluid`) over raw Tailwind when possible for consistency.
- Parametric elements should be wrapped in `pointer-events-none` and `aria-hidden`.
- Always test Cyrillic rendering and reduced-motion.

**Files to maintain**
- `styles/globals.css` — tokens + component + utility layers
- `tailwind.config.ts` — extensions
- `lib/design-tokens.ts` — runtime tokens
- `lib/hadid-paths.ts` + `components/ui/HadidFlow.tsx` — parametric engine (refine, don’t replace)
- New: `components/ui/Button.tsx`, `Card.tsx`, `Icon.tsx`, `ParametricAccent.tsx`

This system should feel expensive, calm, and sculptural — exactly like a Zaha Hadid villa on the Black Sea.

---

*Maintained for the White House Sochi project. Update this document whenever tokens evolve.*
