console.log('PriTanya Loaded - Call Only Mode.');

// --- 1. SMOOTH SCROLLING ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});

// --- 2. COOKIE CONSENT LOGIC ---
// Checks if user has already decided. If not, shows banner.

window.addEventListener('load', checkCookies);

function checkCookies() {
    // Check local storage
    const status = localStorage.getItem("cookiesAccepted");

    if (status === "true") {
        // User previously accepted
        hideBanner();
        activateAnalytics('granted');
    } else if (status === "false") {
        // User previously declined
        hideBanner();
        activateAnalytics('denied');
    } else {
        // New visitor: Show banner
        document.getElementById("cookie-banner").classList.remove("hidden");
        // Optional: Default to denied until click
        activateAnalytics('denied');
    }
}

function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    hideBanner();
    activateAnalytics('granted');
}

function declineCookies() {
    localStorage.setItem("cookiesAccepted", "false");
    hideBanner();
    activateAnalytics('denied');
}

function hideBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.classList.add("hidden");
}

// Helper to update GTM/Gtag consent
function activateAnalytics(status) {
    // Push the consent status to the Data Layer for GTM to read
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'cookie_consent_update',
        'consent_status': status
    });
    
    console.log("GTM Consent Status updated to:", status);
}