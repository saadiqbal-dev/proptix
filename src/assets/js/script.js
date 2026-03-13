// Scroll-triggered step animations for Meet Sage section
document.addEventListener("DOMContentLoaded", function () {
  const sageSteps = document.querySelectorAll(".sage-step");
  const stepsContainer = document.querySelector(".sage-steps-container");
  const stepsWrapper = document.querySelector(".sage-steps-wrapper");

  if (!sageSteps.length || !stepsContainer || !stepsWrapper) return;

  let currentStep = 0;
  const totalSteps = sageSteps.length;
  const stepHeight = 400;
  const containerHeight = 4000; // Increased from 2900 to 4000 for longer scroll duration

  // Set initial state - first step visible, others hidden
  sageSteps.forEach((step, index) => {
    step.style.opacity = index === 0 ? "1" : "0";
    step.style.position = "absolute";
    step.style.top = "0";
    step.style.left = "0";
    step.style.width = "100%";
    step.style.height = "100%";
  });

  // Function to update step visibility based on scroll position
  function updateStepVisibility() {
    // Only apply scroll animations on desktop (>992px)
    if (window.innerWidth <= 992) return;

    const scrollTop = window.pageYOffset;
    const containerTop = stepsContainer.offsetTop;
    const relativeScroll = scrollTop - containerTop;

    // Calculate which step should be visible
    const stepIndex = Math.floor(relativeScroll / stepHeight);
    const clampedStepIndex = Math.max(0, Math.min(stepIndex, totalSteps - 1));

    if (clampedStepIndex !== currentStep) {
      currentStep = clampedStepIndex;

      sageSteps.forEach((step, index) => {
        if (index === clampedStepIndex) {
          step.style.opacity = "1";
        } else {
          step.style.opacity = "0";
        }
      });
    }
  }

  // Function to reset steps for mobile view
  function resetStepsForMobile() {
    if (window.innerWidth <= 992) {
      sageSteps.forEach((step, index) => {
        step.style.opacity = "1";
        step.style.position = "relative";
        step.style.top = "auto";
        step.style.left = "auto";
        step.style.width = "auto";
        step.style.height = "auto";
      });
    } else {
      // Restore desktop behavior
      sageSteps.forEach((step, index) => {
        step.style.opacity = index === 0 ? "1" : "0";
        step.style.position = "absolute";
        step.style.top = "0";
        step.style.left = "0";
        step.style.width = "100%";
        step.style.height = "100%";
      });
    }
  }

  // Add scroll event listener
  window.addEventListener("scroll", updateStepVisibility);

  // Initial call
  updateStepVisibility();
  resetStepsForMobile();

  // Add smooth transitions
  sageSteps.forEach((step) => {
    step.style.transition = "opacity 0.6s ease-in-out";
  });

  // Handle window resize for steps
  window.addEventListener("resize", function () {
    resetStepsForMobile();
    updateStepVisibility();
  });
});

// Smooth fade-in animations for revealing elements
document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate (excluding sage-step elements)
  const animateElements = [
    // Hero section
    ...document.querySelectorAll(".hero h1, .hero p, .hero .hero-cta"),
    // About section
    ...document.querySelectorAll(".about-section h2, .about-section .btn"),
    // Meet Sage section - only heading and intro
    ...document.querySelectorAll(".meet-sage-heading, .meet-sage-intro"),
    // Video sections
    ...document.querySelectorAll(
      ".video-section p, .video-section h2, .video-section .btn"
    ),
    // Case studies section
    ...document.querySelectorAll(
      ".case-studies-section h2, .case-study-card, .case-studies-cta"
    ),
    // Value proposition section
    ...document.querySelectorAll(
      ".value-proposition-section h2, .value-proposition-section .btn"
    ),
    // Proptix way section
    ...document.querySelectorAll(".proptix-way-section h2, .comparison-table"),
    // Plans section
    ...document.querySelectorAll(".plans-section h2, .plan-card"),
    // Questions section
    ...document.querySelectorAll(
      ".questions-section h2, .questions-section p, .questions-cta"
    ),
  ];

  // Add sage-step elements for mobile only
  if (window.innerWidth <= 768) {
    const sageStepElements = document.querySelectorAll(".sage-step");
    animateElements.push(...sageStepElements);
  }

  // Set initial state - all elements start hidden
  animateElements.forEach((element) => {
    if (element) {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity 0.8s ease-out, transform 0.8s ease-out";
    }
  });

  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe all elements
  animateElements.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });

  // Simple reveal animation for hero and first video section on load
  const heroAndFirstVideoElements = [
    ...document.querySelectorAll(".hero h1, .hero p, .hero .hero-cta"),
    ...document.querySelectorAll(
      ".first-video-section .video-background-container"
    ),
  ];

  // Animate hero and first video elements on load
  heroAndFirstVideoElements.forEach((element, index) => {
    if (element) {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 300 + index * 200); // Staggered animation
    }
  });

  // Handle window resize for mobile sage-step elements
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      // Add sage-step elements if not already included
      const sageStepElements = document.querySelectorAll(".sage-step");
      sageStepElements.forEach((element) => {
        if (!animateElements.includes(element)) {
          animateElements.push(element);
          element.style.opacity = "0";
          element.style.transform = "translateY(30px)";
          element.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
          observer.observe(element);
        }
      });
    }
  });
});

// Hover animations for cards
document.addEventListener("DOMContentLoaded", function () {
  // Plan cards hover animation
  const planCards = document.querySelectorAll(".plan-card");
  planCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.transition = "transform 0.3s ease-out";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });

  // Case study cards hover animation
  const caseStudyCards = document.querySelectorAll(".case-study-card");
  caseStudyCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.transition = "transform 0.3s ease-out";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });
});

// Button hover animations
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn-secondary");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.opacity = "0.9";
      this.style.transition = "transform 0.3s ease-out";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });
});

// Dropdown functionality - hover for desktop, always visible on mobile
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Function to check if device is mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }

  dropdownToggles.forEach((toggle) => {
    const dropdown = toggle.closest(".dropdown");

    // Handle hover events (desktop only)
    dropdown.addEventListener("mouseenter", function () {
      if (!isMobile()) {
        // Close all other dropdowns
        document.querySelectorAll(".dropdown").forEach((otherDropdown) => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove("active");
          }
        });

        // Show current dropdown
        dropdown.classList.add("active");
      }
    });

    dropdown.addEventListener("mouseleave", function () {
      if (!isMobile()) {
        // Hide dropdown when mouse leaves
        dropdown.classList.remove("active");
      }
    });

    // Handle click events - always allow normal navigation
    toggle.addEventListener("click", function (e) {
      // Always allow normal navigation to services section
      if (
        toggle.getAttribute("href") === "/#services" ||
        toggle.getAttribute("href") === "#services"
      ) {
        return; // Allow normal navigation
      }
      e.preventDefault();
    });
  });

  // Close dropdowns when clicking outside (desktop only)
  document.addEventListener("click", function (e) {
    if (!isMobile() && !e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Close dropdowns when pressing Escape (desktop only)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !isMobile()) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });
});

// Mobile navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const closeMenu = document.querySelector(".close-menu");
  const nav = document.querySelector(".nav");

  if (!hamburgerMenu || !closeMenu || !nav) return;

  // Open mobile menu
  hamburgerMenu.addEventListener("click", function () {
    nav.classList.add("active");
    hamburgerMenu.style.display = "none";
    closeMenu.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scroll
  });

  // Close mobile menu
  closeMenu.addEventListener("click", function () {
    nav.classList.remove("active");
    hamburgerMenu.style.display = "block";
    closeMenu.style.display = "none";
    document.body.style.overflow = ""; // Restore scroll
  });

  // Close menu when clicking on navigation links
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");

      // Only show hamburger on mobile
      if (window.innerWidth <= 768) {
        hamburgerMenu.style.display = "block";
        closeMenu.style.display = "none";
      } else {
        hamburgerMenu.style.display = "none";
        closeMenu.style.display = "none";
      }

      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  nav.addEventListener("click", function (e) {
    if (e.target === nav) {
      nav.classList.remove("active");
      hamburgerMenu.style.display = "block";
      closeMenu.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 768;

    // Temporarily disable transitions during resize
    nav.style.transition = "none";

    if (!isMobile) {
      // Desktop behavior - always hide hamburger and close menu
      nav.classList.remove("active");
      hamburgerMenu.style.display = "none";
      closeMenu.style.display = "none";
      document.body.style.overflow = "";
    } else if (isMobile && !nav.classList.contains("active")) {
      // Mobile behavior - show hamburger only if menu is closed
      hamburgerMenu.style.display = "block";
      closeMenu.style.display = "none";
    }

    // Re-enable transitions after a short delay
    setTimeout(() => {
      nav.style.transition = "";
    }, 50);
  });
});

// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const modalTriggers = document.querySelectorAll(
    '[data-modal-trigger="try-free"]'
  );

  if (!modalOverlay || !modalClose) return;

  // Open modal
  function openModal() {
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Trigger iframe loading
    setTimeout(() => {
      const iframe = document.querySelector("#inline-o1BMyrgvIR7zUg4daTCg");
      const iframePlaceholder = document.getElementById("iframe-placeholder");
      const cookieConsentMessage = document.getElementById(
        "cookie-consent-message"
      );
      const modalLoading = document.getElementById("modal-loading");
      let iframeLoaded = false;
      let thirdPartyScriptLoaded = false;

      if (!iframe || !iframePlaceholder) return;

      // Reset modal state first
      if (iframePlaceholder) {
        iframePlaceholder.classList.remove("hidden");
      }
      if (cookieConsentMessage) {
        cookieConsentMessage.style.display = "none";
      }
      if (modalLoading) {
        modalLoading.style.display = "none";
      }
      if (iframe) {
        iframe.style.opacity = "0";
      }

      // Check cookie consent
      const cookieChoice = localStorage.getItem("cookie-consent");
      if (cookieChoice === "accepted") {
        // Cookies accepted - show loading animation
        if (modalLoading) {
          modalLoading.style.display = "flex";
        }

        // Load iframe
        const dataSrc = iframe.getAttribute("data-src");
        if (dataSrc && !iframeLoaded) {
          iframe.setAttribute("src", dataSrc);
          iframeLoaded = true;
        }

        // Load third-party script only when needed
        if (!thirdPartyScriptLoaded) {
          const script = document.createElement("script");
          script.src = "https://link.msgsndr.com/js/form_embed.js";
          script.async = true;
          document.head.appendChild(script);
          thirdPartyScriptLoaded = true;
        }

        // Wait 2 seconds, then hide loading and show iframe
        setTimeout(() => {
          if (modalLoading) {
            modalLoading.style.display = "none";
          }
          if (iframePlaceholder) {
            iframePlaceholder.classList.add("hidden");
          }
          // Fade in the iframe
          iframe.style.opacity = "1";
        }, 2000);
      } else {
        // Cookies not accepted - show cookie consent message
        console.log("Cookies not accepted, showing consent message");
        if (cookieConsentMessage) {
          cookieConsentMessage.style.display = "block";
        }
      }
    }, 100);
  }

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
  }

  // Event listeners for opening modal
  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  // Event listener for closing modal
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});

// Cookie consent functionality
document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookies = document.getElementById("accept-cookies");
  const declineCookies = document.getElementById("decline-cookies");

  if (!cookieConsent || !acceptCookies || !declineCookies) return;

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (!cookieChoice || cookieChoice === "declined") {
    // Show cookie banner after a short delay
    setTimeout(() => {
      cookieConsent.classList.add("show");
      cookieConsent.setAttribute("aria-hidden", "false");
    }, 1000);
  }

  // Handle accept cookies
  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "accepted");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });

  // Handle decline cookies
  declineCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "declined");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });
});

// Iframe form cookie consent handling
function loadIframeForm() {
  console.log("loadIframeForm called");

  const iframe = document.querySelector("#inline-o1BMyrgvIR7zUg4daTCg");
  const iframePlaceholder = document.getElementById("iframe-placeholder");
  const cookieConsentMessage = document.getElementById(
    "cookie-consent-message"
  );
  const modalLoading = document.getElementById("modal-loading");
  const mainCookieBanner = document.getElementById("cookie-consent");

  if (!iframe || !iframePlaceholder) {
    console.log("Missing iframe or iframePlaceholder");
    return;
  }

  console.log("Setting cookie consent to accepted");
  // Set cookie consent for LeadConnector and main site
  localStorage.setItem("leadconnector-cookies-accepted", "true");
  localStorage.setItem("cookie-consent", "accepted");

  // Check if main cookie banner has 'show' class and remove it
  if (mainCookieBanner && mainCookieBanner.classList.contains("show")) {
    console.log("Removing show class from main cookie banner");
    mainCookieBanner.classList.remove("show");
    mainCookieBanner.setAttribute("aria-hidden", "true");
  }

  // Hide cookie consent message and show loading
  if (cookieConsentMessage) {
    cookieConsentMessage.style.display = "none";
  }
  if (modalLoading) {
    modalLoading.style.display = "flex";
  }

  // Load iframe
  const dataSrc = iframe.getAttribute("data-src");
  if (dataSrc) {
    iframe.setAttribute("src", dataSrc);
  }

  // Load third-party script
  const script = document.createElement("script");
  script.src = "https://link.msgsndr.com/js/form_embed.js";
  script.async = true;
  document.head.appendChild(script);

  // Wait 2 seconds, then hide loading and show iframe
  setTimeout(() => {
    if (modalLoading) {
      modalLoading.style.display = "none";
    }
    if (iframePlaceholder) {
      iframePlaceholder.classList.add("hidden");
    }
    // Fade in the iframe
    iframe.style.opacity = "1";
  }, 2000);
}

function hideIframePlaceholder() {
  console.log("hideIframePlaceholder called");

  const iframePlaceholder = document.getElementById("iframe-placeholder");
  const modalOverlay = document.getElementById("modal-overlay");
  const mainCookieBanner = document.getElementById("cookie-consent");

  if (iframePlaceholder) {
    iframePlaceholder.classList.add("hidden");
  }

  // Check if main cookie banner doesn't have 'show' class and add it
  if (mainCookieBanner && !mainCookieBanner.classList.contains("show")) {
    console.log("Adding show class to main cookie banner");
    mainCookieBanner.classList.add("show");
    mainCookieBanner.setAttribute("aria-hidden", "false");
  }

  // Close the modal when user declines
  if (modalOverlay) {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
  }
}
