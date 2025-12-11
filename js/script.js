// IIFE (Immediately Invoked Function Expression) to avoid polluting global scope
(function () {
  "use strict";

  // --- Set Current Year ---
  function setYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --- Typing Effect for Greeting ---
  function initTypingEffect() {
    const greetingEl = document.getElementById("greeting");
    if (!greetingEl) return;

    const h = new Date().getHours();
    const savedName = localStorage.getItem("visitorName") || "";
    const timeGreeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    const fullText = savedName ? `${timeGreeting}, ${savedName}!` : `${timeGreeting}!`;
    
    let index = 0;
    greetingEl.textContent = "";
    
    function typeChar() {
      if (index < fullText.length) {
        greetingEl.textContent += fullText.charAt(index);
        index++;
        setTimeout(typeChar, 60);
      }
    }
    
    // Start typing after a short delay
    setTimeout(typeChar, 500);
  }

  // --- Update Greeting (for when name is saved) ---
  function updateGreeting(name) {
    const h = new Date().getHours();
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
      const base = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
      greetingEl.textContent = name ? `${base}, ${name}!` : `${base}!`;
    }
  }

  // --- Scroll Progress Indicator ---
  function initScrollProgress() {
    const progressBar = document.getElementById("scrollProgress");
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  // --- Scroll Reveal Animation ---
  function initScrollReveal() {
    const sections = document.querySelectorAll(".section");
    
    const observerOptions = {
      root: null,
      rootMargin: "-50px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.add("reveal");
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      section.classList.add("reveal");
      observer.observe(section);
    });
  }

  // --- Theme Toggle (persisted) ---
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
        const currentTheme = root.classList.contains("light") ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);
        
        // Update theme-color meta tag
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
          metaThemeColor.content = currentTheme === "light" ? "#f4f6fa" : "#0a0d12";
        }
      });
    }
  }

  // --- Mobile Navigation Toggle ---
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

      // Close nav when clicking outside
      document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && nav.classList.contains("open")) {
          nav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  // --- Smooth Scrolling ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1) {
          const el = document.querySelector(id);
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, "", id);
          }
        }
      });
    });
  }

  // --- Enhanced Contact Form Validation ---
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
        const errorEl = label?.querySelector(".error-message");
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

      if (name.value.trim().length < 2) {
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

      if (message.value.trim().length < 10) {
        showError(message, "Message must be at least 10 characters.");
        isValid = false;
      }

      if (isValid) {
        if (formNote) {
          formNote.hidden = false;
          form.reset();
          setTimeout(() => (formNote.hidden = true), 4000);
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
      updateGreeting(trimmed);
      if (status) status.textContent = `Saved! Hello, ${trimmed}!`;
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
      loginStatus.textContent = isLoggedIn ? "Logged in (demo)" : "Logged out";
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

  // --- Projects Data ---
  const projectsData = [
    {
      title: "Hakeem",
      imageUrl: "assets/images/hakeem.png",
      description:
        "Recipe and meal-planning startup app for KSA market. Flutter frontend, Spring Boot API, with planned AI-powered meal suggestions.",
      tags: ["Flutter", "Spring Boot", "Startup"],
      year: 2025,
      isPrivate: true,
      link: null,
    },
    {
      title: "Algorithmic Trading Bot",
      imageUrl: "assets/images/trading-bot.png",
      description:
        "Automated trading service with risk management and strategy modules. Built with Java/Spring for data ingestion and order routing.",
      tags: ["Java", "Spring", "Finance"],
      year: 2024,
      isPrivate: true,
      link: null,
    },
    {
      title: "Reservation System",
      imageUrl: "assets/images/reservation-system.png",
      description:
        "Full-stack reservation platform focusing on requirements engineering and system design. Spring Boot backend with React frontend.",
      tags: ["Spring Boot", "React", "SWE-206"],
      year: 2023,
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/ReservationSystem",
    },
    {
      title: "Tournament Management",
      imageUrl: "assets/images/tournament-management.png",
      description:
        "Database-driven tournament management system. PostgreSQL with Spring Boot API and Flutter mobile app.",
      tags: ["Flutter", "Spring Boot", "ICS-321"],
      year: 2022,
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/tournament",
    },
  ];

  let currentFilter = "All";
  let currentSort = "Newest";

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

    const filteredProjects = projectsData.filter((project) => {
      if (filter === "All") return true;
      return project.tags.includes(filter);
    });

    const sortedProjects = sortProjects(filteredProjects, sort);

    if (filteredProjects.length === 0) {
      container.innerHTML = `<p class="muted" style="grid-column: 1 / -1; text-align: center; padding: 40px;">No projects found for "${filter}".</p>`;
      return;
    }

    const html = sortedProjects
      .map((project, index) => {
        const linkHtml = project.isPrivate
          ? `<p class="lock">🔒 Private project</p>`
          : `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="link" aria-label="View ${project.title} on GitHub">
              View on GitHub →
            </a>`;

        return `
          <article class="card project-card" style="animation-delay: ${index * 0.1}s">
            <img src="${project.imageUrl}" alt="${project.title} preview" loading="lazy" width="400" height="180" />
            <h3>${project.title}</h3>
            <p class="description">${project.description}</p>
            <p class="muted small">${project.year}</p>
            ${linkHtml}
          </article>
        `;
      })
      .join("");

    container.innerHTML = html;
  }

  function initProjectFilters() {
    const filtersContainer = document.getElementById("project-filters");
    if (!filtersContainer) return;

    filtersContainer.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON" || !e.target.classList.contains("chip")) {
        return;
      }

      const currentActive = filtersContainer.querySelector(".active");
      if (currentActive) {
        currentActive.classList.remove("active");
      }

      e.target.classList.add("active");
      const filterValue = e.target.dataset.filter;
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

  // --- Experience Guide ---
  function initExperienceGuide() {
    const levelButtons = document.querySelectorAll("#experience .chip[data-level]");
    const levelTitle = document.getElementById("levelTitle");
    const levelBody = document.getElementById("levelBody");
    if (!levelButtons.length || !levelTitle || !levelBody) return;

    const levelCopy = {
      Beginner:
        "Start with React basics and Java fundamentals. Build small UI components, practice Git flows, and deploy a simple static site.",
      Intermediate:
        "Focus on Spring Boot APIs and Flutter UI patterns. Add tests, pagination, and authentication to existing projects.",
      Advanced:
        "Optimize performance, add CI/CD pipelines, and design scalable services. Experiment with trading algorithms and observability.",
    };

    levelButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.dataset.level;
        if (!selected) return;

        levelButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        levelTitle.textContent = `${selected} Focus`;
        levelBody.textContent = levelCopy[selected] || "";
      });
    });
  }

  // --- Inspirational Quotes ---
  function initQuotes() {
    const quoteText = document.getElementById("quoteText");
    const quoteAuthor = document.getElementById("quoteAuthor");
    const quoteError = document.getElementById("quoteError");
    const refreshBtn = document.getElementById("quoteRefresh");

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
      quoteAuthor.textContent = `— ${author}`;
    };

    const apiUrl = "https://dummyjson.com/quotes/random";

    const localQuotes = [
      { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
      { text: "Fix the cause, not the symptom.", author: "Steve Maguire" },
      { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
      { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
      { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
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
        console.warn("Quote API unavailable, using local fallback:", err);
        const randomLocal = localQuotes[Math.floor(Math.random() * localQuotes.length)];
        showQuote(randomLocal.text, randomLocal.author);

        if (quoteError) {
          quoteError.textContent = "Showing offline quotes";
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

  // --- Initialize All Features ---
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initTypingEffect();
    initScrollProgress();
    initScrollReveal();
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initContactForm();
    loadProjectsFromData();
    initProjectFilters();
    initProjectSort();
    initExperienceGuide();
    initNameMemory();
    initLoginState();
    initProjectVisibilityToggle();
    initQuotes();
  });
})();
