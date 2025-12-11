# Assignment 2 - AI Usage Report

This document details the use of AI in completing Assignment 2.

## Tools Used

- **Gemini**: Used for high-level strategy, code generation, and debugging.
- **ChatGPT**: Used for alternative code suggestions and documentation drafting.
- **Cursor AI Editor**: Used for inline code completions and refactoring.

## Use Cases

### 1. Initial Feature: Dynamic Project Section (Attempted)

- **Task**: Implement Requirements 1 (Dynamic Content), 2 (Data Handling), 3 (Animation), and 4 (Error Handling) by replacing the static project section from A1.
- **Prompt (Conceptual)**: "Based on my Assignment 1 code, update my portfolio to fetch my repositories from the GitHub API. This needs to include loading states, error handling, and simple animations."
- **AI-Generated Output**: Gemini provided complete code for `index.html`, `css/styles.css`, and `js/script.js` to fetch from the GitHub API, including loading spinners and error states.
- **Result**: This feature **failed during testing**. The API request was unreliable, and it conflicted with old static HTML, causing a confusing UI.

### 2. Pivot: Refactoring to a Local Data Array

- **Task**: After the API failure, I needed a more reliable way to meet the "Data Handling" requirement.
- **Prompt (Conceptual)**: "Forget the API, it's not working. Can I just use a local array to store my projects? Please refactor the code to do this."
- **AI-Generated Output**: The AI confirmed this was a valid approach and generated a new, simplified solution.
  - **Gemini** created a `projectsData` array in `js/script.js` to act as a local "database".
  - It wrote a `loadProjectsFromData` function to read this array and dynamically generate the HTML.
  - It provided simplified `index.html` and `css/styles.css` files, removing the now-unused loading/error states.

### 3. Feature: Enhanced Form Validation & Debugging

- **Task**: Implement Requirement 4 (Error Handling) for the contact form and fix a styling bug.
- **Prompt (Conceptual)**: "Update my contact form to use inline JavaScript error messages." and later "My skills chips and form are stuck in dark mode, even on light theme."
- **AI-Generated Output**:
  - **ChatGPT** refactored the `initContactForm` function to include `showError` and `clearErrors` helpers.
  - **Gemini** debugged the CSS and found I had used hard-coded dark-mode colors instead of CSS variables. It provided the corrected CSS.

### 4. Feature: Interactive Project Filtering

- **Task**: Fully satisfy Requirement 2 (Dynamic Content) by making the project list interactive.
- **Prompt (Conceptual)**: "Let's add project filtering based on the `projectsData` array. I need buttons and the JavaScript logic to filter the list."
- **AI-Generated Output**: AI tools (Gemini and Cursor) provided all the necessary code:
  1.  The filter button HTML for `index.html`.
  2.  CSS styles for the `.filter-chips` and `.chip.active` states.
  3.  A new `initProjectFilters` function in `js/script.js` to handle click events.
  4.  An update to `loadProjectsFromData` to accept a filter and show an "empty state" message.

## Benefits

- **Strategic Pivoting**: The AI was most useful as a "pair programmer" when the initial API plan failed. It instantly provided a valid, working alternative and all the code to implement it.
- **Rapid Development**: Features that would have taken hours to research and build (like the filter logic) were prototyped in minutes.
- **Debugging**: The AI was extremely fast at finding the CSS light-mode bug, saving time on troubleshooting.

## Challenges

- **External APIs**: The primary challenge was the unreliability of the GitHub API during testing, which forced a change in strategy.
- **Over-reliance**: The initial AI code for the API was complex. Pivoting to a simpler solution was a better design choice.
- **Context Management**: I had to re-explain the project's state to the AI (especially in Cursor) after making manual changes.

## Learning Outcomes

- I learned that relying on external APIs can be unreliable and that a simpler, local data solution is often more robust for a personal portfolio.
- I gained a strong understanding of how to separate data (the `projectsData` array) from presentation (HTML) and use JavaScript (`.map()`, `.filter()`) to build a dynamic UI.
- I learned how to implement interactive features by handling user events (clicks) to update the DOM.
- I reinforced the importance of using CSS variables for all styling to ensure themes work correctly.

---

# Assignment 3 - AI Usage Report (this submission)

## Tools Used
- **ChatGPT (Codex CLI)**: Pair programming, code generation, and documentation help for new requirements.

## Use Cases

1) **Quotes API integration and resilience**
- Prompt: “Fetch and display inspirational quotes; add graceful error handling.”
- Output: Generated `initQuotes` using DummyJSON API, loading states, fallback notice.
- Edits: Simplified messaging and ensured CORS-friendly endpoint.

2) **Complex logic expansion**
- Prompt: “Add sorting to projects and conditional guidance by level.”
- Output: Sorting options (Newest/Oldest/Title A–Z/Z–A) and Beginner/Intermediate/Advanced copy swap.
- Edits: Added project years, preserved existing filters, and wired UI labels.

3) **State management features**
- Prompt: “Persist visitor name, login toggle, and show/hide projects.”
- Output: LocalStorage-backed name greeting, simulated login toggle, project visibility toggle, and UI controls.
- Edits: Integrated with existing greeting function and added `hidden` utility class.

4) **Performance tweaks**
- Prompt: “Optimize images and loading.”
- Output: Added `loading=\"lazy\"` and explicit dimensions on images.
- Edits: Kept markup minimal; no other assets changed.

## Benefits
- Faster delivery of multi-feature updates (sorting, state persistence, API handling) with consistent patterns.
- Reduced trial-and-error on CORS/API selection by leveraging AI suggestions.

## Challenges
- Sandbox network limits blocked live API fetches; had to choose a CORS-friendly endpoint and keep fallbacks.
- Keeping new features consistent with prior code (filters, theme toggle) required manual integration.

## Learning Outcomes
- Reinforced managing UI state with `localStorage` and idempotent render functions.
- Practiced combining filtering, sorting, and conditional copy updates without breaking existing logic.
- Improved approach to graceful degradation when APIs are blocked (clear messaging, fallbacks).
