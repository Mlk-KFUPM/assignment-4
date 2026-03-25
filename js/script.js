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
    const timeGreeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
    const fullText = `${timeGreeting}!`;

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

  // --- Scroll Spy for Navigation ---
  function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    const sections = [];

    navLinks.forEach(link => {
      const id = link.getAttribute("href");
      if (id && id.length > 1) {
        const section = document.querySelector(id);
        if (section) {
          sections.push({ el: section, link: link });
        }
      }
    });

    if (sections.length === 0) return;

    function updateActiveLink() {
      const scrollPos = window.scrollY + 120;

      let currentSection = sections[0];
      for (const section of sections) {
        if (section.el.offsetTop <= scrollPos) {
          currentSection = section;
        }
      }

      navLinks.forEach(link => link.classList.remove("active"));
      if (currentSection) {
        currentSection.link.classList.add("active");
      }
    }

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
  }

  // --- Back to Top Button ---
  function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 400) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
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
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.textContent = "Sending...";
          submitBtn.disabled = true;
        }

        const formData = new FormData(form);
        formData.append('_subject', 'New message from abdalmalek.dev!');
        formData.append('_captcha', 'false');

        fetch("https://formsubmit.co/ajax/abdalmalekfs@gmail.com", {
          method: "POST",
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            if (formNote) {
              formNote.hidden = false;
              formNote.textContent = "Message sent effectively! I'll get back to you soon.";
              formNote.style.color = "var(--brand)";
              form.reset();
              setTimeout(() => (formNote.hidden = true), 5000);
            }
          })
          .catch(error => {
            if (formNote) {
              formNote.hidden = false;
              formNote.textContent = "Oops! Problem sending message. Please use the email link directly.";
              formNote.style.color = "#ff4a4a";
              setTimeout(() => (formNote.hidden = true), 5000);
            }
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.textContent = "Send Message";
              submitBtn.disabled = false;
            }
          });
      } else {
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  }

  // --- Projects Data ---
  const projectsData = [
    {
      title: "FORGE KFUPM",
      imageUrl: "assets/images/placeholder.png",
      description:
        "Bilingual full-stack conference platform with role-based admin portal. Built with React, TypeScript, and Node.js for FORGE @ KFUPM.",
      tags: ["React", "Node.js", "TypeScript"],
      year: 2026,
      type: "Student Club",
      isPrivate: true,
      link: null,
      liveUrl: "https://forge-kfupm.org",
    },
    {
      title: "Hakeem",
      imageUrl: "assets/images/hakeem.png",
      description:
        "Recipe and meal-planning startup app for KSA market. Flutter frontend, Spring Boot API on AWS, with AI-powered meal suggestions.",
      tags: ["Flutter", "Spring Boot"],
      year: 2025,
      type: "Startup",
      isPrivate: true,
      link: null,
      appStoreUrl: "https://apps.apple.com/sa/app/hakeem-smart-cooking/id6757360931",
    },
    {
      title: "TellerRecipes",
      imageUrl: "assets/images/tellerecipes.png",
      description:
        "Full-stack recipe sharing platform with role-based access (User, Chef, Admin). Vite + React frontend with Node.js/MongoDB backend.",
      tags: ["React", "Node.js", "MongoDB"],
      year: 2025,
      type: "KFUPM",
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/TellerRecipes",
    },
    {
      title: "Portfolio Website",
      imageUrl: "assets/images/portfolio.png",
      description:
        "Modern responsive portfolio with dynamic projects, theme toggle, scroll animations, and API integration. Built with vanilla HTML, CSS, and JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      year: 2025,
      type: "Personal",
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/assignment-4",
      liveUrl: "https://abdalmalek.dev",
    },
    {
      title: "Algorithmic Trading Bot",
      imageUrl: "assets/images/trading-bot.png",
      description:
        "End-to-end autonomous trading system with custom backtesting engine and live PostgreSQL-driven performance dashboard.",
      tags: ["Spring Boot", "React"],
      year: 2025,
      type: "Personal",
      isPrivate: true,
      link: null,
    },
    {
      title: "Reservation System",
      imageUrl: "assets/images/reservation-system.png",
      description:
        "Full-stack reservation platform focusing on requirements engineering and system design. Spring Boot backend with React frontend.",
      tags: ["Spring Boot", "React"],
      year: 2023,
      type: "KFUPM",
      isPrivate: false,
      link: "https://github.com/Mlk-KFUPM/ReservationSystem",
    },
    {
      title: "Tournament Management",
      imageUrl: "assets/images/tournament-management.png",
      description:
        "Database-driven tournament management system. PostgreSQL with Spring Boot API and React frontend.",
      tags: ["React", "Spring Boot"],
      year: 2022,
      type: "KFUPM",
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
        let typeBadge = '';
        if (project.type === 'Startup') {
          typeBadge = `<span style="background: rgba(46, 204, 113, 0.1); color: #2ecc71; padding: 4px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(46, 204, 113, 0.2); margin-left: auto;">Startup</span>`;
        } else if (project.type === 'KFUPM') {
          typeBadge = `<span style="background: rgba(79, 140, 255, 0.1); color: var(--brand); padding: 4px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(79, 140, 255, 0.2); margin-left: auto;">KFUPM</span>`;
        } else if (project.type === 'Personal') {
          typeBadge = `<span style="background: rgba(168, 85, 247, 0.1); color: #a855f7; padding: 4px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(168, 85, 247, 0.2); margin-left: auto;">Personal</span>`;
        } else if (project.type === 'Student Club') {
          typeBadge = `<span style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; padding: 4px 8px; border-radius: 6px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border: 1px solid rgba(245, 158, 11, 0.2); margin-left: auto;">Student Club</span>`;
        }

        const links = [];
        if (project.liveUrl) {
          links.push(`<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-small" aria-label="View ${project.title} live website">View Website</a>`);
        }
        if (project.appStoreUrl) {
          links.push(`<a href="${project.appStoreUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-small" aria-label="Download ${project.title} on App Store">App Store</a>`);
        }

        if (project.link) {
          links.push(`<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="link" aria-label="View ${project.title} on GitHub" style="margin-left: auto;">GitHub →</a>`);
        } else if (project.isPrivate) {
          links.push(`<span class="muted small" style="margin-left: auto; display: flex; align-items: center;">🔒 Private Repo</span>`);
        }

        const linkHtml = `<div class="project-links" style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-top: auto; padding-top: 16px;">${links.join('')}</div>`;

        return `
          <article class="card project-card" style="animation-delay: ${index * 0.1}s; display: flex; flex-direction: column; height: 100%;">
            <h3 style="display: flex; align-items: center; margin-bottom: 12px; margin-top: 0;">${project.title} ${typeBadge}</h3>
            <p class="description" style="margin-bottom: 12px;">${project.description}</p>
            <p class="muted small" style="margin-bottom: 0;">${project.year} • ${project.tags.join(', ')}</p>
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

  // --- Initialize All Features ---
  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initTypingEffect();
    initScrollProgress();
    initScrollReveal();
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initScrollSpy();
    initBackToTop();
    initContactForm();
    loadProjectsFromData();
    initProjectFilters();
    initProjectSort();
  });
})();
