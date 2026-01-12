// Smooth scroll behavior for older browsers (optional, as Tailwind handles it via CSS)
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

console.log('PriTanya Loaded - Ready for orders.');

// --- COOKIE CONSENT LOGIC ---

// 1. Check logic on page load
window.addEventListener('load', function () {
  const consent = localStorage.getItem('cookieConsent');

  if (!consent) {
    // First time visitor: Show banner
    document.getElementById('cookie-banner').classList.remove('hidden');
  } else if (consent === 'granted') {
    // Returning visitor who accepted: Enable Tracking
    enableTracking();
  }
});

// Function to check if cookies are already accepted
function checkCookies() {
    if (localStorage.getItem("cookiesAccepted") === "true") {
        // If they already accepted previously, update Google immediately
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });
        document.getElementById("cookie-banner").classList.add("hidden");
    } else {
        // Show banner if not accepted
        document.getElementById("cookie-banner").classList.remove("hidden");
    }
}

// User clicked "Приемам" (Accept)
function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    
    // Tell Google Analytics: "Start tracking now!"
    gtag('consent', 'update', {
        'ad_storage': 'granted',
        'analytics_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });
    
    document.getElementById("cookie-banner").classList.add("hidden");
}

// User clicked "Отказвам" (Decline)
function declineCookies() {
    localStorage.setItem("cookiesAccepted", "false");
    document.getElementById("cookie-banner").classList.add("hidden");
    // We do NOT update consent, so it stays 'denied' (default)
}

// Run check on load
window.onload = checkCookies;