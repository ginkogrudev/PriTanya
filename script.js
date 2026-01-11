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

// 2. User Clicks "Accept" (Приемам)
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'granted');
  enableTracking();
  document.getElementById('cookie-banner').classList.add('hidden');
}

// 3. User Clicks "Decline" (Отказвам)
function declineCookies() {
  localStorage.setItem('cookieConsent', 'denied');
  document.getElementById('cookie-banner').classList.add('hidden');
}

// 4. The function that actually tells Google "GO"
function enableTracking() {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
  console.log('Consent Granted - Tracking Enabled');
}
