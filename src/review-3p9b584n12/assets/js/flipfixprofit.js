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

// Function to load the WebinarJam form
function loadFormIframe() {
  const webinarWrapper = document.querySelector(".wj-embed-wrapper");
  const loadingElement = document.getElementById("form-loading");

  if (!webinarWrapper) return;

  // Check if cookies are accepted
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    // Change text to loading message
    if (loadingElement) {
      const loadingText = loadingElement.querySelector("p");
      if (loadingText) {
        loadingText.textContent = "Loading form. Please wait...";
      }
    }

    // Wait 2 seconds, then hide loading and show webinar form
    setTimeout(() => {
      if (loadingElement) {
        loadingElement.style.display = "none";
      }
      webinarWrapper.style.opacity = "1";
    }, 2000);
  }
}

// Auto-load form if cookies are already accepted
document.addEventListener("DOMContentLoaded", function () {
  const cookieChoice = localStorage.getItem("cookie-consent");

  if (cookieChoice === "accepted") {
    loadFormIframe();
  }
});
