# Abdulmalik Alsafadi | Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and certifications as a Software Engineering student at KFUPM.

## ✨ Features

### Core Functionality
- **Dynamic Projects** - Filter by technology, sort by date/title, with year badges
- **Interactive Skills Visualization** - Categorized skills with animated progress bars
- **Theme Toggle** - Dark/Light mode with localStorage persistence
- **API Integration** - Live inspirational quotes from DummyJSON API with fallback
- **Contact Form** - Client-side validation with inline error messages

### Premium Design
- **Animated Hero Section** - Typing effect greeting with gradient text
- **Scroll Progress Indicator** - Visual progress bar at top of page
- **Reveal Animations** - Sections fade in as you scroll
- **Glassmorphism Cards** - Modern translucent design with blur effects
- **Premium Typography** - Inter font from Google Fonts

### State Persistence
- Remembered visitor name
- Theme preference
- Project visibility toggle
- Simulated login state

## 🛠️ Tech Stack

- **HTML5** - Semantic structure with accessibility features
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - ES6+ with Intersection Observer, Fetch API
- **Google Fonts** - Inter typeface

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Mlk-KFUPM/assignment-4.git
   cd assignment-4
   ```

2. Install dependencies and start dev server:
   ```bash
   npm install
   npm run dev
   ```

3. Or simply open `index.html` in your browser.

## 📦 Deployment

### GitHub Pages
1. Push to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main → / (root)
4. Your site will be live at `https://[username].github.io/assignment-4/`

### Other Options
- **Vercel**: `npx vercel`
- **Netlify**: Drag and drop the folder

## 🎨 Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --brand: #4f8cff;    /* Primary blue */
  --accent: #2dd4bf;   /* Teal accent */
  --accent-pink: #f471b5; /* Pink gradient */
}
```

### Projects
Update the `projectsData` array in `js/script.js` to add your own projects.

## 📱 Responsive Breakpoints

- **900px** - 2-column to 1-column layouts
- **600px** - Mobile navigation, condensed sections

## 🤖 AI Usage

See [docs/ai-usage-report.md](docs/ai-usage-report.md) for details on AI assistance during development.

## 📜 License

MIT
