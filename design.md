---
name: Reliable Logistics Interface
colors:
  surface: '#faf8ff'
  surface-dim: '#d8d9e6'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#ecedfa'
  surface-container-high: '#e6e7f4'
  surface-container-highest: '#e1e2ee'
  on-surface: '#191b24'
  on-surface-variant: '#424656'
  inverse-surface: '#2e303a'
  inverse-on-surface: '#eff0fd'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d6'
  primary: '#0050cb'
  on-primary: '#ffffff'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#a33200'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4204'
  on-tertiary-container: '#fff6f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59d'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832600'
  background: '#faf8ff'
  on-background: '#191b24'
  surface-variant: '#e1e2ee'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
---

## Brand & Style

This design system is built on a **Corporate Modern** aesthetic tailored for the high-stakes environment of food delivery logistics. The brand personality is rooted in reliability, efficiency, and clarity. The target audience—operations managers and administrative staff—requires an interface that minimizes cognitive load while managing complex, real-time data.

The visual direction follows a **Flat Design** philosophy enhanced by subtle depth. By prioritizing whitespace and structural alignment, the UI evokes a sense of organized precision. The emotional response is one of "calm control," ensuring that even during peak delivery hours, the system remains legible and intuitive. The use of Korean as the primary language necessitates generous line heights and balanced stroke weights to maintain high legibility in dense data views.

## Colors

The color strategy focuses on **Functional Contrast**. The Primary Blue (#0066FF) is reserved strictly for interactive elements and primary brand touchpoints, signaling "action" and "trust."

The neutral grayscale palette is expansive to accommodate complex data-heavy layouts. Light grays (50-200) are utilized for background layering and border definitions, while darker grays (700-900) ensure high-contrast text for Korean characters. Semantic colors follow industry standards to provide immediate feedback on order statuses and system alerts, ensuring operational issues are identified at a glance.

## Typography

The choice of **Inter** provides a highly functional, systematic font family that excels in UI environments. For Korean text, the design system utilizes a fallback to system-native sans-serifs (like Apple SD Gothic Neo or Pretendard) that share Inter's x-height and geometric clarity.

To ensure legibility in data-dense tables, the line height for body text is set slightly higher than standard (1.6) to prevent Korean characters from appearing cramped. Headings use a tighter line height for a more professional, editorial feel. Labels and status text utilize semi-bold weights to remain distinct even at smaller scales (12px).

## Layout & Spacing

The design system employs a **Fixed Grid** approach for the main dashboard content to ensure consistency across various monitor sizes. A 12-column system provides the flexibility needed to organize disparate data types, such as order tracking maps, driver performance metrics, and inventory lists.

The spacing rhythm is strictly based on an 8px (0.5rem) base unit. This ensures all components—from input fields to cards—align perfectly on a grid. Standardized gutters of 24px prevent information density from becoming overwhelming, providing clear visual separation between distinct functional modules.

## Elevation & Depth

To maintain a "Professional and Clean" look, this design system avoids heavy shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Tier 0 (Background):** Gray-50 or Gray-100 for the main application canvas.
- **Surface Tier 1 (Cards/Panels):** White (#FFFFFF) with a 1px border of Gray-200.
- **Elevation Layer:** For active states or dropdowns, a very subtle ambient shadow is used: `0px 4px 12px rgba(0, 0, 0, 0.05)`.

This approach ensures that depth is used only to indicate interactivity or hierarchy, keeping the overall interface flat and modern.

## Shapes

The design system uses a consistent **8px (0.5rem)** corner radius across all standard UI components. This specific radius strikes a balance between the authority of sharp corners and the friendliness of fully rounded shapes.

- **Standard Components:** 8px (Buttons, Inputs, Cards).
- **Small Elements:** 4px (Checkboxes, Status Badges).
- **Extreme Elements:** Full pill-shape (only for specific 'New' tags or floating action buttons).

## Components

### Buttons

- **Primary:** Filled Primary Blue (#0066FF) with white text. High-contrast, 8px radius.
- **Secondary:** White background with Gray-200 border and Gray-700 text.
- **States:** Hover states should be 10% darker than the base color. Focus states utilize a 2px Primary Blue ring with a 2px white offset.

### Data Tables

- Header rows use Gray-50 background with Gray-600 Bold text.
- Row heights are fixed at 56px for readability.
- 1px Gray-100 horizontal dividers only; vertical borders are omitted to emphasize flow.

### Status Badges

- Used for order status (배송 중, 완료, 취소 등).
- Soft background tints (10% opacity of the semantic color) with high-contrast text of the same hue.
- Example: "Processing" uses a light blue background with a dark blue text.

### Form Inputs

- 40px standard height.
- Labels are positioned above the input field in `label-bold` style.
- Default border is Gray-300; active border is Primary Blue.

### Cards

- White background, 1px Gray-200 border, and 24px internal padding.
- Used to group related data like "Today's Revenue" or "Active Drivers."
