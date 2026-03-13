// Cookie consent functionality for form page
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

    // Load the form iframe after accepting cookies
    loadFormIframe();
  });

  // Handle decline cookies
  declineCookies.addEventListener("click", function () {
    localStorage.setItem("cookie-consent", "declined");
    cookieConsent.classList.remove("show");
    cookieConsent.setAttribute("aria-hidden", "true");
  });
});

// Function to load the form iframe
function loadFormIframe() {
  const iframe = document.querySelector("#inline-Kfr2GGGO1qgskPpIePm9");
  const loadingElement = document.getElementById("contact-loading");

  if (!iframe) return;

  // Check if cookies are accepted
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    // Set cookie consent for LeadConnector
    localStorage.setItem("leadconnector-cookies-accepted", "true");

    // Change text to loading message
    if (loadingElement) {
      const loadingText = loadingElement.querySelector("p");
      if (loadingText) {
        loadingText.textContent = "Loading contact form. Please wait...";
      }
    }

    // Load third-party script if not already loaded
    if (
      !document.querySelector(
        'script[src="https://link.msgsndr.com/js/form_embed.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://link.msgsndr.com/js/form_embed.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // Wait 2 seconds, then fade in the iframe and hide loading
    setTimeout(() => {
      if (loadingElement) {
        loadingElement.style.display = "none";
      }
      iframe.style.opacity = "1";
    }, 2000);
  }
}

// Auto-load form if cookies are already accepted
document.addEventListener("DOMContentLoaded", function () {
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    loadFormIframe();
  } else if (cookieChoice === "declined") {
    // Show cookie consent message in loading placeholder for declined users
    loadFormIframe();
  }
});
