---
name: design-to-react
description: Guidelines for converting a design image into high-quality React components styled with SCSS, following responsive, custom CSS, SEO, and visual fidelity standards. Use when the user provides an image or design mock-up and asks to code it.
---

# Convert Design to React + SCSS — Project Skill

This skill documents the exact rules and best practices for converting design images or mockups into clean, production-ready, pixel-perfect, responsive React components styled with custom SCSS.

---

## 1. Core Principles

1. **High Visual Fidelity ("Chuẩn Thiết Kế")**: 
   - Replicate the layout, alignment, typography, spacing, and colors exactly from the design image.
   - Use premium aesthetics: smooth transitions, micro-animations on interactive elements, elegant hover effects, sleek gradients, and subtle shadows.
   
2. **Custom SCSS under FLOCSS & BEM ("Chuẩn FLOCSS & BEM")**:
   - Write hand-crafted modular SCSS. Do NOT use Tailwind CSS or heavy CSS utility libraries unless explicitly requested.
   - Structure the styling layers using **FLOCSS (Foundation, Layout, Object)**.
   - Name all classes using **BEM (Block Element Modifier)** naming conventions.
   - Use CSS/SCSS Custom Properties (Variables) for color palettes, spacing tokens, and font families to maintain consistency.

3. **Strict Responsive ("Chuẩn Responsive")**:
   - Follow a **Mobile-First** coding strategy.
   - Use dynamic units (`rem`, `em`, `vh`, `vw`, `%`) instead of fixed pixel sizes where suitable to support fluid resizing.
   - Utilize SCSS Mixins for media queries with standardized breakpoints:
     - Mobile/Portrait: `<= 576px`
     - Tablet: `768px` to `992px`
     - Desktop: `>= 1024px`
     - Wide Desktop: `>= 1440px`

4. **SEO & Accessibility ("Chuẩn SEO & A11y")**:
   - Use **Semantic HTML5** tags appropriately (`<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<nav>`).
   - Maintain a logical heading hierarchy (`h1` -> `h2` -> `h3`). Ensure there is strictly **only one `<h1>`** per page view.
   - Add descriptive `alt` tags to all images, appropriate title attributes to non-descriptive links, and `aria-*` tags for interactive components.
   - Ensure all interactive elements have unique, descriptive `id` attributes.

5. **Modern React (React 19)**:
   - Use clean, functional components with TypeScript interfaces for all props.
   - Leverage React Compiler standards: do NOT manually add `useMemo` or `useCallback` unless specifically required.
   - Implement component lazy loading for new pages using `React.lazy()` + `<SuspenseWrapper>` in routing.

---

## 2. FLOCSS Architecture

FLOCSS is a CSS architecture model that divides CSS styles into 3 main layers: **Foundation**, **Layout**, and **Object**. Object is further split into **Component**, **Project**, and **Utility**.

| Layer | Prefix | Description | Example |
| :--- | :--- | :--- | :--- |
| **Foundation** | *None* | Global reset, box-sizing, typography default styles, color variables. | `html`, `body`, `a`, `$color-primary` |
| **Layout** | `l-` | Page structural grids or containers that define layout regions. | `.l-container`, `.l-grid`, `.l-header-layout` |
| **Object: Component** | `c-` | Highly abstract, reusable UI components that can be used anywhere. They are independent of context. | `.c-btn`, `.c-card`, `.c-badge`, `.c-input` |
| **Object: Project** | `p-` | Specific, domain/page-level UI blocks (often composed of Components). | `.p-header`, `.p-hero`, `.p-job-list`, `.p-job-card` |
| **Object: Utility** | `u-` | Small, single-purpose helper classes that override styles. | `.u-text-center`, `.u-mb-20`, `.u-flex-center` |

---

## 3. BEM Naming Conventions

BEM (Block, Element, Modifier) makes CSS class names self-documenting and easy to maintain. When combined with FLOCSS, the prefix goes at the beginning of the Block.

### Naming Syntax:
- **Block**: `[prefix]-[block-name]`
- **Element**: `[prefix]-[block-name]__[element-name]` (separated by `__` double underscores)
- **Modifier**: `[prefix]-[block-name]--[modifier-name]` or `[prefix]-[block-name]__[element-name]--[modifier-name]` (separated by `--` double hyphens)

### Concrete Examples:
```scss
/* Component Layer (c-) */
.c-btn { ... }                          /* Block */
.c-btn__icon { ... }                    /* Element */
.c-btn--primary { ... }                 /* Block Modifier */
.c-btn__icon--large { ... }             /* Element Modifier */

/* Project Layer (p-) */
.p-hero { ... }                         /* Block */
.p-hero__title { ... }                  /* Element */
.p-hero__form { ... }                   /* Element */
.p-hero--dark { ... }                   /* Block Modifier */
.p-hero__title--highlight { ... }       /* Element Modifier */
```

### SCSS Nesting Rules for BEM:
Use the SCSS parent selector `&` to write clean BEM. Never over-nest selectors to maintain flat CSS specificity.

```scss
// GOOD (Generates flat, fast CSS selectors)
.p-job-card {
  display: flex;
  background: #fff;

  &__title {
    font-size: 1.2rem;
    color: #333;

    &--active {
      color: var(--jobes-teal);
    }
  }

  &__meta {
    display: flex;
    gap: 8px;
  }

  &--featured {
    border: 2px solid var(--jobes-teal);
  }
}

// BAD (Generates heavy nested selectors like .p-job-card .p-job-card__title - unnecessary specificity)
.p-job-card {
  .p-job-card__title {
    color: #333;
  }
}
```

---

## 4. SCSS Directory Structure

For custom SCSS, organize styling files according to FLOCSS principles:

```
src/
├── styles/
│   ├── foundation/
│   │   ├── _variables.scss    # Custom properties, colors, typography, spaces
│   │   ├── _mixins.scss       # Breakpoints, utilities, animations
│   │   └── _base.scss         # Reset and global elements style
│   ├── layout/
│   │   └── _layout.scss       # .l-container and grid system
│   └── globals.scss           # Entrypoint importing foundation and layouts
│
├── features/
│   └── <domain>/
│       └── components/
│           └── <Component>/
│               ├── <Component>.tsx
│               └── <Component>.module.scss   # CSS Module containing c-* or p-* classes
```

### Mobile-First Breakpoint Mixin:
Define responsiveness in `src/styles/foundation/_mixins.scss`:
```scss
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: 576px) { @content; }
  } @else if $breakpoint == 'md' {
    @media (min-width: 768px) { @content; }
  } @else if $breakpoint == 'lg' {
    @media (min-width: 992px) { @content; }
  } @else if $breakpoint == 'xl' {
    @media (min-width: 1200px) { @content; }
  } @else if $breakpoint == 'xxl' {
    @media (min-width: 1400px) { @content; }
  }
}
```

---

## 5. React CSS Module Integration

When using SCSS Modules with BEM and FLOCSS classes in React, reference class names using string brackets to support special characters (`-`, `_`):

```tsx
import styles from './JobesCard.module.scss';

export function JobesCard({ isFeatured }: { isFeatured?: boolean }) {
  return (
    <article className={`${styles['p-job-card']} ${isFeatured ? styles['p-job-card--featured'] : ''}`}>
      <h3 className={styles['p-job-card__title']}>
        Software Engineer
      </h3>
      <div className={styles['p-job-card__meta']}>
        <span className={`${styles['p-job-card__tag']} ${styles['p-job-card__tag--fulltime']}`}>
          Full Time
        </span>
      </div>
    </article>
  );
}
```

---

## 6. Step-by-Step Implementation Workflow

When given a design image to code:

### Step 1: Analyze & Plan
1. **Deconstruct the layout**: Identify the main blocks, layouts (Flexbox, Grid), and typography requirements.
2. **Classify Elements (FLOCSS)**: Decide what elements are Layout (`l-`), reusable Components (`c-`), and domain/page-specific Projects (`p-`).
3. **Plan SEO hierarchy**: Draft which tags will represent the headings (`h1` - `h6`), navigation, and body sections.

### Step 2: Establish the Styling Foundation
1. Use existing custom variables in `foundation/_variables.scss` for the color palette, typography scales, and shadows.
2. If new tokens are needed, add them to `_variables.scss` first, rather than hardcoding in modules.

### Step 3: Implement the HTML Structure (Semantic)
1. Write the clean React component markup using standard HTML5 tags.
2. Ensure interactive elements (`button`, `a`, custom selectors) have descriptive classes and accessibility attributes.

### Step 4: Write the Responsive SCSS (Mobile-First + FLOCSS + BEM)
1. Write mobile-first styles without media queries first.
2. Use `@include respond-to('md')` and `@include respond-to('xl')` to adapt layouts progressively for larger screen dimensions.
3. Keep layout behaviors responsive by preferring CSS Grid or Flexbox with wrap configurations over static widths.

### Step 5: Add Visual Polish & Interactions
1. Implement elegant hover/focus states with smooth transitions (`transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`).
2. Add subtle micro-animations (e.g., scale-ups on hover, fading load elements) to elevate user experience.

### Step 6: Verify
1. Run `npm run lint` and `npm run build` to verify there are no TypeScript or compilation errors.
2. Inspect visually across viewport simulations (mobile, tablet, desktop) to ensure responsiveness.
