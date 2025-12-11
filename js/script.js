// IIFE (Immediately Invoked Function Expression) to avoid polluting global scope
(function () {
  "use strict";

  // --- A1: Set Current Year ---
  function setYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --- A1: Set Time-based Greeting ---
  function setGreeting(nameFromStorage) {
    const h = new Date().getHours();
    const greetingEl = document.getElementById("greeting");
    const savedName =
      nameFromStorage || localStorage.getItem("visitorName") || "";
    if (greetingEl) {
      const base =
        h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
      greetingEl.textContent = savedName
        ? `${base}, ${savedName}.`
        : `${base}.`;
    }
  }

  // --- A1: Theme Toggle (persisted) ---
  function initThemeToggle() {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      root.classList.add("light");
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        root.classList.toggle("light");
        const currentTheme = root.classList.contains("light")
          ? "light"
          : "dark";
        localStorage.setItem("theme", currentTheme);
      });
    }
  }

  // --- A1: Mobile Navigation Toggle ---
  function initMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const nav = document.querySelector(".nav");
    if (navToggle && nav) {
      navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
      });

      // Close nav when a link is clicked
      nav.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
          if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
          }
        });
      });
    }
  }

  // --- A1: Smooth Scrolling ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1) {
          // Only process if it's not just "#"
          const el = document.querySelector(id);
          if (el) {
            history.pushState(null, "", id);
          }
        }
      });
    });
  }

  // --- A2: Enhanced Contact Form Validation ---
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
    if (!form) return;

    const showError = (input, message) => {
      const label = input.closest("label");
      const errorEl = label.querySelector(".error-message");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = "block";
      }
      input.setAttribute("aria-invalid", "true");
    };

    const clearErrors = () => {
      form.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "none";
      });
      form.querySelectorAll("[aria-invalid]").forEach((input) => {
        input.setAttribute("aria-invalid", "false");
      });
    };

    form.addEventListener("input", (e) => {
      if (e.target.hasAttribute("aria-invalid")) {
        const label = e.target.closest("label");
        const errorEl = label.querySelector(".error-message");
        if (errorEl) {
          errorEl.textContent = "";
          errorEl.style.display = "none";
        }
        e.target.setAttribute("aria-invalid", "false");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;
      const name = form.elements.name;
      const email = form.elements.email;
      const message = form.elements.message;

      if (name.value.length < 2) {
        showError(name, "Name must be at least 2 characters.");
        isValid = false;
      }

      if (!email.validity.valid) {
        if (email.value.length === 0) {
          showError(email, "Email is required.");
        } else {
          showError(email, "Please enter a valid email address.");
        }
        isValid = false;
      }

      if (message.value.length < 10) {
        showError(message, "Message must be at least 10 characters.");
        isValid = false;
      }

      if (isValid) {
        if (formNote) {
          formNote.hidden = false;
          form.reset();
          setTimeout(() => (formNote.hidden = true), 3000);
        }
      } else {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  // --- State: Remember visitor name ---
  function initNameMemory() {
    const nameInput = document.getElementById("nameInput");
    const saveBtn = document.getElementById("saveName");
    const status = document.getElementById("nameStatus");
    if (!nameInput || !saveBtn) return;

    const saved = localStorage.getItem("visitorName") || "";
    if (saved) {
      nameInput.value = saved;
      setGreeting(saved);
      if (status) {
        status.textContent = `Welcome back, ${saved}!`;
      }
    }

    const saveName = () => {
      const trimmed = nameInput.value.trim();
      if (trimmed.length < 2) {
        if (status) status.textContent = "Please enter at least 2 characters.";
        return;
      }
      localStorage.setItem("visitorName", trimmed);
      setGreeting(trimmed);
      if (status) status.textContent = `Saved. Hello, ${trimmed}!`;
    };

    saveBtn.addEventListener("click", saveName);
    nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveName();
      }
    });
  }

  // --- State: Simulated login toggle ---
  function initLoginState() {
    const loginBtn = document.getElementById("loginToggle");
    const loginStatus = document.getElementById("loginStatus");
    if (!loginBtn || !loginStatus) return;

    const stored = localStorage.getItem("isLoggedIn") === "true";

    const render = (isLoggedIn) => {
      loginBtn.textContent = isLoggedIn ? "Log Out" : "Log In";
      loginStatus.textContent = isLoggedIn
        ? "Logged in (simulated)."
        : "Logged out.";
      localStorage.setItem("isLoggedIn", String(isLoggedIn));
    };

    render(stored);

    loginBtn.addEventListener("click", () => {
      const next = !(localStorage.getItem("isLoggedIn") === "true");
      render(next);
    });
  }

  // --- State: Show/Hide projects section ---
  function initProjectVisibilityToggle() {
    const toggleBtn = document.getElementById("projectToggle");
    const projectsSection = document.getElementById("projects");
    if (!toggleBtn || !projectsSection) return;

    const storedHidden = localStorage.getItem("projectsHidden") === "true";

    const render = (hidden) => {
      projectsSection.classList.toggle("hidden", hidden);
      toggleBtn.textContent = hidden ? "Show Projects" : "Hide Projects";
      localStorage.setItem("projectsHidden", String(hidden));
    };

    render(storedHidden);

    toggleBtn.addEventListener("click", () => {
      const nextHidden = !projectsSection.classList.contains("hidden");
      render(nextHidden);
    });
  }

  // --- A2: Load Projects from Local Data Array ---

  const projectsData = [
    {
      title: "Hakeem (startup app)",
      imageUrl: "assets/images/hakeem.png",
      description:
        "Recipe and meal-planning app targeting KSA. Flutter front end, Spring Boot API, and planned AI meal suggestions.",
      tags: ["Flutter", "Spring Boot", "Startup"],
      year: 2025,
      isPrivate: true,
      link: null,
    },
    {
      title: "Algorithmic Trading Bot",
      imageUrl: "assets/images/trading-bot.png",
      description:
        "Java/Spring service with risk controls and basic strategies. Modular design for data ingestion and order routing.",
      tags: ["Java", "Spring", "Finance"],
      year: 2024,
      isPrivate: true,
      link: null,
    },
    {
      title: "Reservation system",
      imageUrl: "assets/images/reservation-system.png",
      description:
        "A course project focused on requirements engineering and system design. Built with Spring Boot, MySQL, and React.",
      tags: ["Spring Boot", "React", "SWE-206"],
      year: 2023,
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/ReservationSystem",
    },
    {
      title: "Tournament Management",
      imageUrl: "assets/images/tournament-management.png",
      description:
        "A database-focused project for managing tournaments. Implemented with PostgreSQL, a Spring Boot backend, and a Flutter front end.",
      tags: ["Flutter", "Spring Boot", "ICS-321"],
      year: 2022,
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/tournament",
    },
  ];
  let currentFilter = "All";
  let currentSort = "Newest";

  // *** UPDATED: Function now accepts a filter ***
  function sortProjects(projects, sort) {
    const sorted = [...projects];
    switch (sort) {
      case "Newest":
        return sorted.sort((a, b) => b.year - a.year);
      case "Oldest":
        return sorted.sort((a, b) => a.year - b.year);
      case "TitleAZ":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "TitleZA":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  }

  function loadProjectsFromData(filter = currentFilter, sort = currentSort) {
    currentFilter = filter;
    currentSort = sort;
    const container = document.getElementById("project-cards");
    if (!container) return;

    // 1. Filter the data
    const filteredProjects = projectsData.filter((project) => {
      if (filter === "All") return true;
      return project.tags.includes(filter);
    });

    const sortedProjects = sortProjects(filteredProjects, sort);

    // 2. Generate the HTML
    const html = sortedProjects
      .map((project) => {
        const linkHtml = project.isPrivate
          ? `<p class="lock">🔒 Private access</p>`
          : `<a 
            href="${project.link}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="link"
            aria-label="View ${project.title} on GitHub"
          >
            Click here to go to the repository
          </a>`;

        return `
        <article class="card project-card">
          <img src="${project.imageUrl}" alt="${project.title} preview" loading="lazy" />
          <h3>${project.title}</h3>
          <p class="description">${project.description}</p>
          <p class="muted small">${project.year}</p>
          ${linkHtml}
        </article>
      `;
      })
      .join("");

    // 3. Set the HTML
    // A2: Handle "empty state" if no projects match
    if (filteredProjects.length === 0) {
      container.innerHTML = `<p class="muted" style="grid-column: 1 / -1; text-align: center;">No projects found for the filter "${filter}".</p>`;
    } else {
      container.innerHTML = html;
    }
  }

  // *** NEW: Function to initialize the filter buttons ***
  function initProjectFilters() {
    const filtersContainer = document.getElementById("project-filters");
    if (!filtersContainer) return;

    filtersContainer.addEventListener("click", (e) => {
      // Only act if a button chip was clicked
      if (
        e.target.tagName !== "BUTTON" ||
        !e.target.classList.contains("chip")
      ) {
        return;
      }

      // Remove 'active' from the currently active button
      const currentActive = filtersContainer.querySelector(".active");
      if (currentActive) {
        currentActive.classList.remove("active");
      }

      // Add 'active' to the clicked button
      e.target.classList.add("active");

      // Get the filter value from the data-filter attribute
      const filterValue = e.target.dataset.filter;

      // Reload the projects with the new filter
      loadProjectsFromData(filterValue, currentSort);
    });
  }

  function initProjectSort() {
    const sortSelect = document.getElementById("projectSort");
    if (!sortSelect) return;

    sortSelect.addEventListener("change", () => {
      loadProjectsFromData(currentFilter, sortSelect.value);
    });
  }

  function initExperienceGuide() {
    const levelButtons = document.querySelectorAll(
      "#experience .chip[data-level]"
    );
    const levelTitle = document.getElementById("levelTitle");
    const levelBody = document.getElementById("levelBody");
    if (!levelButtons.length || !levelTitle || !levelBody) return;

    const levelCopy = {
      Beginner:
        "Start with React basics and Java fundamentals. Build small UI components, practice Git flows, and deploy a simple static site.",
      Intermediate:
        "Focus on Spring Boot APIs and Flutter UI patterns. Add tests, pagination, and authentication to existing projects.",
      Advanced:
        "Optimize performance, add CI checks, and design scalable services. Experiment with trading bot strategies and observability.",
    };

    levelButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.dataset.level;
        if (!selected) return;

        levelButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        levelTitle.textContent = `${selected} focus`;
        levelBody.textContent = levelCopy[selected] || "";
      });
    });
  }

  // --- A1: Inspirational Quotes (Fixed) ---
  function initQuotes() {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const quoteError = document.getElementById("quoteError");
    const refreshBtn = document.getElementById("quoteRefresh");
    // Safety check
    if (!quoteText || !quoteAuthor) return;

    const setLoadingState = () => {
      quoteText.style.opacity = "0.5";
      quoteText.textContent = "Loading wisdom...";
      quoteAuthor.textContent = "";
      if (quoteError) quoteError.style.display = "none";
    };

    const setButtonState = (isLoading) => {
      if (!refreshBtn) return;
      refreshBtn.disabled = isLoading;
      refreshBtn.textContent = isLoading ? "Loading..." : "New Quote";
    };

    const showQuote = (content, author) => {
      quoteText.style.opacity = "1";
      quoteText.textContent = `"${content}"`;
      quoteAuthor.textContent = `- ${author}`;
    };

    // 1. The reliable API source
    const apiUrl = "https://dummyjson.com/quotes/random";

    // 2. The local fallback to guarantee the section never breaks
    const localQuotes = [
      {
        text: "Code is like humor. When you have to explain it, it’s bad.",
        author: "Cory House",
      },
      {
        text: "Fix the cause, not the symptom.",
        author: "Steve Maguire",
      },
      {
        text: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman",
      },
      {
        text: "Make it work, make it right, make it fast.",
        author: "Kent Beck",
      },
    ];

    async function fetchQuote() {
      setLoadingState();
      setButtonState(true);

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("API failed");

        const data = await response.json();
        showQuote(data.quote, data.author);
      } catch (err) {
        console.warn("API failed, switching to local fallback:", err);
        const randomLocal =
          localQuotes[Math.floor(Math.random() * localQuotes.length)];
        showQuote(randomLocal.text, randomLocal.author);

        if (quoteError) {
          quoteError.textContent = "Offline mode: Showing local quotes.";
          quoteError.style.display = "block";
        }
      } finally {
        setButtonState(false);
      }
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", fetchQuote);
    }

    fetchQuote();
  }

  // --- Run all initializers on DOMContentLoaded ---
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    setGreeting();
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
    loadProjectsFromData(); // <-- Load all projects initially
    initProjectFilters(); // <-- Add event listeners to filter buttons
    initProjectSort(); // <-- Enable sorting
    initExperienceGuide(); // <-- Conditional guidance by level
    initNameMemory(); // <-- Persist visitor name
    initLoginState(); // <-- Simulated login state
    initProjectVisibilityToggle(); // <-- Persist project section visibility
    initQuotes(); // <-- Fetch and show inspirational quote from API
  });
})(); // End of IIFE
