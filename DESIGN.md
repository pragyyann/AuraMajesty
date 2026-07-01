<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Aura Majesty Studio
description: A premium, minimalist design system for a modern luxury salon.
---

# Design System: Aura Majesty Studio

## 1. Overview

**Creative North Star: "The Silent Gallery"**

Aura Majesty Studio's visual language is built on the concept of an art gallery: a quiet, spacious, and high-contrast environment where the work (the services, stylists, and clients) is the focal point. The design uses generous whitespace, razor-sharp alignment, and high-contrast typography to convey premium luxury. 

It explicitly rejects loud, over-decorated salon templates, sterile/clinical booking forms, and intimidatingly dark or low-contrast interfaces.

**Key Characteristics:**
- **Extreme Spacing:** Generous padding and margins to let elements breathe.
- **Monochromatic Sophistication:** A neutral base that feels warm and inviting, not clinical.
- **Classic Editorial Contrast:** The juxtaposition of an elegant serif display font with a clean, functional sans-serif body.
- **Restrained Motion:** Animations are almost entirely static at rest, appearing only as instant or very fast transitions on user interaction.

## 2. Colors

The palette is restrained, focusing on monochromatic tones with a singular, quiet metallic accent to highlight key actions.

**The 10% Accent Rule.** The primary silver/platinum accent is used on ≤10% of any given screen. Its rarity is the point, drawing focus to critical actions like booking or confirmation.

**The Warm Neutral Rule.** Even in a monochromatic scheme, pure white (#ffffff) and pure black (#000000) are avoided for large surfaces. Backgrounds use a soft, warm ink/charcoal or a warm off-white to maintain welcoming warmth.

- **Primary Accent (Silver/Platinum):** `[to be resolved during implementation]` - Used for primary CTAs and active states.
- **Neutral Background:** `[to be resolved during implementation]` - Warm off-white or soft warm charcoal.
- **Neutral Ink (Text):** `[to be resolved during implementation]` - High-contrast charcoal/off-black or soft white.

## 3. Typography

**Display Font:** Serif Display (e.g., Playfair Display, Cormorant Garamond, or Georgia)
**Body Font:** Sans-serif (e.g., Inter, Outfit, or system-ui)

The typography pairs the organic, high-fashion elegance of a classic serif with the clean, highly legible precision of a modern sans-serif.

**The Display Letter-Spacing Rule.** Large display headings must never have letter-spacing tighter than (-0.03em). Letters must breathe and never touch.

### Hierarchy
- **Display** (Light/Regular, `clamp(2.5rem, 6vw, 4.5rem)`, 1.1): Used for hero headlines and section titles.
- **Headline** (Regular, 2rem, 1.2): Used for major page subsections.
- **Title** (Medium, 1.25rem, 1.3): Used for card titles and service names.
- **Body** (Regular, 1rem, 1.6): Used for descriptions and general copy. Max line length is capped at 65ch.
- **Label** (Medium/Bold, 0.75rem, 1.4, uppercase, letter-spacing: 0.05em): Used for navigation links, buttons, and metadata.

## 4. Elevation

The system is flat-by-default, relying on borders, typography, and whitespace to establish hierarchy rather than heavy drop shadows.

**The Flat-by-Default Rule.** Surfaces are flat at rest. Subtle, low-blur shadows (e.g., `0 4px 12px rgba(0,0,0,0.04)`) or borders are used only to respond to user interaction (hover, focus) or to separate overlay containers.

## 5. Components

`[No components exist yet. Primitives will be documented here once implementation begins.]`

## 6. Do's and Don'ts

### Do:
- **Do** maintain a strict 4.5:1 contrast ratio for all body text against its background.
- **Do** use `text-wrap: balance` on all Display and Headline elements.
- **Do** wrap all interactive elements in clear, high-contrast focus rings.

### Don't:
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe on cards or alerts.
- **Don't** use gradient text or text clips.
- **Don't** use neon, highly saturated colors for buttons or backgrounds.
- **Don't** build sterile, clinical-looking forms; keep inputs elegant with spacious padding and subtle borders.
