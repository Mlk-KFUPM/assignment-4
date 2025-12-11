# Technical Documentation

## Tech Stack

- **HTML5**: Semantic structure for content
- **CSS3**: Variables, Flexbox, Grid, media queries, animations
- **JavaScript (ES6+)**: DOM manipulation, Array methods (`.map()`, `.filter()`)

## Components & Features

### Header & Navigation

- Sticky header with brand name
- Mobile nav toggle (accessible `aria-expanded` attributes)
- Theme toggle persisted in `localStorage`

### Hero Section

- Time-based greeting (morning/afternoon/evening)

### Projects Section (Dynamic & Interactive)

- **Data Source**: A local JavaScript array named `projectsData` in `js/script.js`. This stores the title, description, image, link, and an array of `tags` (e.g., "Flutter", "Spring Boot") for each project.
- **Interactive Filters (`js/initProjectFilters`)**:
  1.  Click-event listeners are added to the filter buttons in the `#project-filters` container.
  2.  When a button is clicked, its `data-filter` value (e.g., "Flutter") is retrieved.
  3.  The `active` class is moved to the clicked button.
  4.  The `loadProjectsFromData` function is called with the new filter value.
- **Dynamic Content (`js/loadProjectsFromData`)**:
  1.  This function receives a `filter` (defaulting to "All").
  2.  It filters the `projectsData` array. If the filter is "All", it returns all projects. Otherwise, it returns only projects where the `tags` array includes the filter.
  3.  It generates the HTML for the filtered projects using `.map()`.
- **Empty State**: If the `filteredProjects` array is empty, it displays a "No projects found..." message.

### Skills & Certifications

- Static sections with responsive card and chip layouts.

### Contact Section (Enhanced Validation)

- **Logic (`js/initContactForm`)**:
  1.  The default `submit` event is prevented.
  2.  If a field is invalid, a specific, inline error message is shown in the corresponding `.error-message` span.
  3.  An `input` listener clears errors as the user types.
- **Feedback**: A "Message sent" note is shown on successful submission.

### Footer

- Dynamic year rendering
- Back-to-top link

## Responsiveness

- **900px** → About, Projects, and Certifications adjust to 2 columns
- **600px** → Nav collapses into a toggle menu, cards stack to 1 column

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<footer>`
- Form labels bound to inputs.
- `aria-live="polite"` on inline form error messages.
- `aria-expanded` on mobile navigation toggle.
- `aria-label` on project links for better context.

## Known Limitations

- No backend integration (contact form is client-only).
- Private projects not linked to source code.
