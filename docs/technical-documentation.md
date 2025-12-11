# Technical Documentation

## Tech Stack

- **HTML5**: Semantic structure with accessibility features (ARIA attributes, landmarks)
- **CSS3**: Custom properties, Flexbox, Grid, animations, media queries, print styles
- **JavaScript (ES6+)**: DOM manipulation, Intersection Observer API, Fetch API, localStorage
- **Google Fonts**: Inter typeface for premium typography

---

## Architecture Overview

```
assignment-4/
├── index.html          # Main HTML with semantic structure
├── css/
│   └── styles.css      # All styles with CSS variables for theming
├── js/
│   └── script.js       # IIFE-wrapped JavaScript modules
├── assets/
│   ├── images/         # Project screenshots and avatar
│   └── certifications/ # PDF certificates
└── docs/
    ├── technical-documentation.md
    └── ai-usage-report.md
```

---

## Components & Features

### 1. Scroll Progress Indicator
- **Element**: `#scrollProgress` - Fixed bar at top of viewport
- **Logic**: `initScrollProgress()` calculates scroll percentage and updates bar width
- **Performance**: Uses passive scroll listener for smooth updates

### 2. Hero Section
- **Typing Effect**: `initTypingEffect()` animates greeting character by character
- **Gradient Text**: CSS `background-clip: text` for colorful "Software Engineer" text
- **Social Links**: SVG icons for GitHub/LinkedIn with hover effects
- **Collapsible Settings**: `<details>` element contains state controls (name, login, visibility)

### 3. Projects Section (Dynamic & Interactive)

**Data Source**: Local `projectsData` array in `js/script.js` with structure:
```javascript
{
  title: string,
  imageUrl: string,
  description: string,
  tags: string[],
  year: number,
  isPrivate: boolean,
  link: string | null
}
```

**Filtering (`initProjectFilters`)**:
1. Event delegation on `#project-filters` container
2. Updates `.active` class on clicked chip
3. Calls `loadProjectsFromData(filter, sort)`

**Sorting (`initProjectSort`)**:
- Options: Newest, Oldest, Title A–Z, Title Z–A
- `sortProjects()` returns sorted array without mutating original

**Rendering (`loadProjectsFromData`)**:
1. Filters by tag if not "All"
2. Sorts by selected criteria
3. Generates HTML with `.map()` and staggered animation delays
4. Handles empty state gracefully

### 4. Skills Section
- **Layout**: 2-column CSS Grid with 4 skill categories
- **Progress Bars**: CSS `--progress` custom property drives width
- **Animation**: `@keyframes skillLoad` animates from `scaleX(0)` to `scaleX(1)`

### 5. Inspirational Quotes
- **API**: `https://dummyjson.com/quotes/random`
- **Fallback**: Local array of 5 quotes if API fails
- **States**: Loading, success, error (with graceful messaging)
- **Refresh**: Button to fetch new quote

### 6. Contact Form Validation
- **Validation**: Custom JS validation with specific error messages
- **Fields**: Name (min 2 chars), Email (valid format), Message (min 10 chars)
- **UX**: Errors clear as user types, focus moves to first invalid field
- **Feedback**: Success note shown for 4 seconds

### 7. State Persistence (localStorage)
| Key | Purpose |
|-----|---------|
| `theme` | "light" or "dark" theme preference |
| `visitorName` | Remembered visitor name for greeting |
| `isLoggedIn` | Simulated login state (demo) |
| `projectsHidden` | Whether projects section is hidden |

---

## CSS Architecture

### Theme System
```css
:root {
  --bg: #0a0d12;           /* Background */
  --panel: rgba(22,30,44,0.8); /* Card backgrounds */
  --text: #e6eaf0;         /* Primary text */
  --muted: #8b95a5;        /* Secondary text */
  --brand: #4f8cff;        /* Primary accent (blue) */
  --accent: #2dd4bf;       /* Secondary accent (teal) */
}

:root.light { /* Light theme overrides */ }
```

### Key CSS Features
- **Glassmorphism**: `backdrop-filter: blur()` on panels
- **Gradients**: `linear-gradient()` for buttons, text, progress bars
- **Animations**: `fadeIn`, `skillLoad`, scroll reveal transitions
- **Print Styles**: Hides interactive elements for clean printing

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| **900px** | 2-column → 1-column layouts, project bar stacks vertically |
| **600px** | Mobile nav toggle, condensed hero, smaller headings |

---

## Accessibility Features

- **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- **ARIA Attributes**:
  - `aria-label` on icon links and buttons
  - `aria-live="polite"` on dynamic content (quotes, form errors)
  - `aria-expanded` on mobile nav toggle
  - `aria-invalid` on form fields with errors
- **Keyboard Navigation**: All interactive elements focusable
- **Color Contrast**: Tested for WCAG AA compliance

---

## Performance Optimizations

- **Lazy Loading**: `loading="lazy"` on project images
- **Font Loading**: `font-display: swap` via Google Fonts
- **Passive Listeners**: Scroll events use `{ passive: true }`
- **Deferred JS**: Script at end of body
- **CSS Variables**: Single source of truth for theming

---

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

---

## Known Limitations

1. **No Backend**: Contact form is client-side only (no actual email sending)
2. **Image Size**: Project images are large (~1.3MB each) - should be compressed for production
3. **No PWA**: Could add service worker for offline support
4. **Static Hosting**: No server-side rendering
