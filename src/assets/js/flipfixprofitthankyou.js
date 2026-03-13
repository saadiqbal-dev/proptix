// Delayed content loading functionality
document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const DELAY_TIME = 2.5 * 60 * 1000; // 2.5 minutes in milliseconds
  const VIDEO_MARK_TIME = 120; // 2 minutes (120 seconds) - check if video reached this point
  let contentLoaded = false;
  let vimeoPlayer = null;

  // Elements to hide initially (everything except hero)
  const delayedElements = [
    // Join Now section
    ...document.querySelectorAll(".join-now-section"),
    // Who Is Flip180 For section
    ...document.querySelectorAll(".flip180-for-who"),
    // What You Get section
    ...document.querySelectorAll(".what-you-get-section"),
    // Pricing section
    ...document.querySelectorAll(".pricing-section"),
  ];

  // Hero elements (always visible)
  const heroElements = [
    ...document.querySelectorAll(
      ".flip180-hero h1, .flip180-hero p, .flip180-hero .hero-inner-video"
    ),
  ];

  // Initialize page state
  function initializePage() {
    // Hide all delayed content initially
    delayedElements.forEach((element) => {
      if (element) {
        element.style.display = "none";
        element.style.opacity = "0";
      }
    });

    // Show hero elements immediately
    heroElements.forEach((element, index) => {
      if (element) {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
          "opacity 0.8s ease-out, transform 0.8s ease-out";

        // Animate hero on load
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, 300 + index * 200);
      }
    });
  }

  // Load delayed content with animation
  function loadDelayedContent() {
    if (contentLoaded) return;
    contentLoaded = true;

    console.log("Loading delayed content");

    // Show all delayed sections
    delayedElements.forEach((element, index) => {
      if (element) {
        element.style.display = "block";
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
          "opacity 0.8s ease-out, transform 0.8s ease-out";

        // Staggered animation for each section
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, index * 300);
      }
    });

    // Setup scroll animations for individual elements within each section
    setupScrollAnimations();

    // Add smooth scroll animation for internal links
    setupSmoothScroll();
  }

  // Setup scroll-triggered animations for individual elements
  function setupScrollAnimations() {
    // Elements to animate within each section
    const animateElements = [
      // Join Now section
      ...document.querySelectorAll(".join-now-section .btn"),
      // Who Is Flip180 For section
      ...document.querySelectorAll(
        ".flip180-for-who h2, .flip180-for-who .comparison-table, .flip180-for-who .btn"
      ),
      // What You Get section
      ...document.querySelectorAll(
        ".what-you-get-section h2, .what-you-get-section .feature-card, .what-you-get-section .btn"
      ),
      // Pricing section
      ...document.querySelectorAll(".pricing-section .pricing-card"),
    ];

    // Set initial state for scroll animation elements
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
  }

  // Vimeo video tracking functionality
  function startVimeoTracking() {
    // Wait for Vimeo Player API to load
    if (typeof Vimeo === "undefined") {
      console.log("Vimeo Player API not loaded yet, retrying...");
      setTimeout(startVimeoTracking, 500);
      return;
    }

    const vimeoIframe = document.querySelector(
      'iframe[src*="player.vimeo.com"]'
    );

    if (!vimeoIframe) {
      console.log("Vimeo iframe not found");
      return;
    }

    vimeoPlayer = new Vimeo.Player(vimeoIframe);
    console.log("Vimeo player initialized");

    // Track timeupdate events to check if 2-minute mark is reached
    vimeoPlayer.on("timeupdate", (data) => {
      const currentTime = data.seconds;
      
      // Check if video has reached or passed the 2-minute mark (120 seconds)
      if (currentTime >= VIDEO_MARK_TIME && !contentLoaded) {
        console.log(`Video reached ${VIDEO_MARK_TIME} seconds (2 minutes) - loading content`);
        loadDelayedContent();
      }
    });

    // Also check immediately in case video is already past 2 minutes (e.g., user skipped ahead)
    vimeoPlayer.getCurrentTime().then((currentTime) => {
      if (currentTime >= VIDEO_MARK_TIME && !contentLoaded) {
        console.log(`Video already at ${currentTime} seconds (past 2 minutes) - loading content`);
        loadDelayedContent();
      }
    });
  }

  // Setup smooth scroll for internal links
  function setupSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  // Initialize everything
  initializePage();

  // Start Vimeo tracking after a short delay to ensure iframe is loaded
  setTimeout(() => {
    startVimeoTracking();
  }, 1000);

  // Start the 2.5 minute timer as fallback
  setTimeout(() => {
    console.log("2.5 minutes elapsed - loading content");
    loadDelayedContent();
  }, DELAY_TIME);

  // Optional: Add a manual trigger for testing (remove in production)
  window.loadContentNow = function () {
    console.log("Manually triggering content load");
    loadDelayedContent();
  };
});

// Hover animations for cards
document.addEventListener("DOMContentLoaded", function () {
  // Pricing cards hover animation
  const pricingCards = document.querySelectorAll(".pricing-card");
  pricingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
      this.style.transition = "transform 0.3s ease-out";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.transition = "transform 0.3s ease-out";
    });
  });

  // Feature cards hover animation
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
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
  // Secondary buttons
  const secondaryButtons = document.querySelectorAll(".btn-secondary");
  secondaryButtons.forEach((button) => {
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

  // Primary buttons
  const primaryButtons = document.querySelectorAll(".btn-primary");
  primaryButtons.forEach((button) => {
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

  // Service buttons (used in pricing cards)
  const serviceButtons = document.querySelectorAll(".btn-service");
  serviceButtons.forEach((button) => {
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
