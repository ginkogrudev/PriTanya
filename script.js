console.log('PriTanya Loaded - Ready for orders.');

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

// --- 2. FORM SUBMISSION LOGIC (THE MISSING PIECE) ---
// This watches for the form to send data to Google Sheets
// and then swaps the Form for the "Success Message"

var submitted = false; // Flag to track if we actually clicked submit

document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("hidden_iframe");
    const formContent = document.querySelector(".form-content");
    const successMessage = document.querySelector(".success-message");
    const form = document.querySelector("form");

    // A. Listen for the submit button click
    if (form) {
        form.addEventListener("submit", function () {
            submitted = true;
        });
    }

    // B. Listen for the invisible iframe to "load" (meaning data was sent)
    if (iframe) {
        iframe.addEventListener("load", function () {
            if (submitted) {
                // 1. Hide the form
                if (formContent) formContent.classList.add("hidden");
                
                // 2. Show the success message
                if (successMessage) {
                    successMessage.classList.remove("hidden");
                    
                    // 3. Scroll user to the message so they see it
                    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
                }
                
                // Reset flag
                submitted = false; 
            }
        });
    }
});


// --- 3. COOKIE CONSENT LOGIC (FIXED) ---
// Unified to use "cookiesAccepted" everywhere so it doesn't break.

// Run check on page load
window.addEventListener('load', checkCookies);

function checkCookies() {
    // Check the 'cookiesAccepted' key in storage
    if (localStorage.getItem("cookiesAccepted") === "true") {
        // If accepted, enable Google Analytics
        updateGtagConsent('granted');
        document.getElementById("cookie-banner").classList.add("hidden");
    } else {
        // If not found or denied, show banner
        document.getElementById("cookie-banner").classList.remove("hidden");
        // Ensure default is denied
        updateGtagConsent('denied');
    }
}

// User clicked "Приемам" (Accept)
function acceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    updateGtagConsent('granted');
    document.getElementById("cookie-banner").classList.add("hidden");
}

// User clicked "Отказвам" (Decline)
function declineCookies() {
    localStorage.setItem("cookiesAccepted", "false");
    document.getElementById("cookie-banner").classList.add("hidden");
}

// Helper function to update Google Analytics
function updateGtagConsent(status) {
    if (typeof gtag === 'function') {
        gtag('consent', 'update', {
            'ad_storage': status,
            'analytics_storage': status,
            'ad_user_data': status,
            'ad_personalization': status
        });
    }
}