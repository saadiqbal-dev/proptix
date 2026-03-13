// Smooth fade-in animations for revealing elements
document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate for Flip180 page
  const animateElements = [
    // Hero section
    ...document.querySelectorAll(
      ".flip180-hero h1, .flip180-hero p, .flip180-hero .btn, .hero-inner-video"
    ),
    // Who Is Flip180 For section
    ...document.querySelectorAll(
      ".flip180-for-who h2, .flip180-for-who .comparison-table, .flip180-for-who .btn"
    ),
    // Property Smarter section
    ...document.querySelectorAll(
      ".property-smarter-section p, .property-smarter-section .btn"
    ),
    // What You Get section
    ...document.querySelectorAll(
      ".what-you-get-section h2, .what-you-get-section .feature-card, .what-you-get-section .btn"
    ),
    // Pricing section
    ...document.querySelectorAll(".pricing-section .pricing-card"),
    // Proptix way section
    ...document.querySelectorAll(
      ".proptix-way-section h2, .proptix-way-section .comparison-table,.proptix-way-section .btn-primary"
    ),
  ];

  // Set initial state - all elements start hidden (except hero elements)
  animateElements.forEach((element) => {
    if (element) {
      // Don't hide hero elements initially - they'll be animated on load
      const isHeroElement =
        element.closest(".flip180-hero") ||
        element.classList.contains("hero-inner-video");

      if (!isHeroElement) {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
          "opacity 0.8s ease-out, transform 0.8s ease-out";
      }
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

  // Simple reveal animation for hero section on load
  const heroElements = [
    ...document.querySelectorAll(
      ".flip180-hero h1, .flip180-hero p, .flip180-hero .btn"
    ),
    ...document.querySelectorAll(".flip180-hero .hero-inner-video"),
  ];

  // Set initial state for hero elements and animate on load
  heroElements.forEach((element, index) => {
    if (element) {
      // Set initial hidden state
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity 0.8s ease-out, transform 0.8s ease-out";

      // Animate on load
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 300 + index * 200); // Staggered animation
    }
  });
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

// Video modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const videoThumbnail = document.getElementById("video-thumbnail");
  const videoModal = document.getElementById("video-modal");
  const modalClose = document.querySelector(".video-modal-close");
  const modalOverlay = document.querySelector(".video-modal-overlay");
  const vimeoIframe = document.getElementById("vimeo-iframe");
  const loadingSpinner = document.getElementById("video-loading");

  if (!videoThumbnail || !videoModal || !vimeoIframe) return;

  let vimeoPlayer = null;

  // Open modal and load video
  function openVideoModal() {
    // Show loading spinner
    if (loadingSpinner) {
      loadingSpinner.classList.remove("hidden");
    }

    // Load iframe src from data-src
    const videoSrc = vimeoIframe.getAttribute("data-src");
    if (videoSrc && !vimeoIframe.getAttribute("src")) {
      vimeoIframe.setAttribute("src", videoSrc);

      // Initialize Vimeo player and listen for ready event
      setTimeout(() => {
        if (typeof Vimeo !== "undefined") {
          vimeoPlayer = new Vimeo.Player(vimeoIframe);

          vimeoPlayer.on("loaded", () => {
            // Hide spinner and show iframe when video is loaded
            if (loadingSpinner) {
              loadingSpinner.classList.add("hidden");
            }
            vimeoIframe.style.opacity = "1";
          });
        } else {
          // Fallback: hide spinner after 2 seconds if Vimeo API not available
          setTimeout(() => {
            if (loadingSpinner) {
              loadingSpinner.classList.add("hidden");
            }
            vimeoIframe.style.opacity = "1";
          }, 2000);
        }
      }, 100);
    } else {
      // Video already loaded, hide spinner immediately
      if (loadingSpinner) {
        loadingSpinner.classList.add("hidden");
      }
      vimeoIframe.style.opacity = "1";
    }

    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Close modal and stop video
  function closeVideoModal() {
    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Reset iframe opacity and show spinner for next time
    vimeoIframe.style.opacity = "0";
    if (loadingSpinner) {
      loadingSpinner.classList.remove("hidden");
    }

    // Stop video by removing and re-adding iframe src
    const currentSrc = vimeoIframe.getAttribute("src");
    vimeoIframe.setAttribute("src", "");
    setTimeout(() => {
      vimeoIframe.setAttribute("data-src", currentSrc);
    }, 300);
  }

  // Event listeners
  videoThumbnail.addEventListener("click", openVideoModal);
  modalClose.addEventListener("click", closeVideoModal);
  modalOverlay.addEventListener("click", closeVideoModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.classList.contains("active")) {
      closeVideoModal();
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
