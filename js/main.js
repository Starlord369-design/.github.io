// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Glatte Scroll-Animation für Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Schließe Mobile Menu nach Klick
            navMenu.classList.remove('active');
        }
    });
});

// Einfache Animation beim Scrollen
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.about-content, .service-card, .testimonial').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Conversion Rate Optimierungen

// Floating CTA Button
window.addEventListener('scroll', () => {
    const floatingCta = document.querySelector('.floating-cta');
    if (window.scrollY > 300) {
        floatingCta.classList.add('visible');
    } else {
        floatingCta.classList.remove('visible');
    }
});

// Sticky Header
window.addEventListener('scroll', () => {
    const stickyHeader = document.querySelector('.sticky-header');
    if (window.scrollY > 200) {
        stickyHeader.classList.add('visible');
    } else {
        stickyHeader.classList.remove('visible');
    }
});

// Popup nach Zeitverzögerung
setTimeout(() => {
    const popup = document.querySelector('.popup-overlay');
    if (popup) {
        popup.classList.add('active');
    }
}, 30000); // 30 Sekunden

// Popup schließen
document.querySelector('.popup-close')?.addEventListener('click', () => {
    document.querySelector('.popup-overlay').classList.remove('active');
});

// Countdown Timer
function startCountdown() {
    const countdownElement = document.querySelector('.countdown-timer');
    if (!countdownElement) return;
    
    let minutes = 15;
    let seconds = 0;
    
    const interval = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(interval);
                countdownElement.textContent = "Angebot abgelaufen!";
                return;
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        
        const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        
        countdownElement.textContent = `Sonderangebot endet in: ${minutesDisplay}:${secondsDisplay}`;
    }, 1000);
}

// Formular-Validierung
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            markInvalid(nameInput, 'Bitte gib deinen Namen ein');
            isValid = false;
        } else {
            markValid(nameInput);
        }
        
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            markInvalid(emailInput, 'Bitte gib eine gültige E-Mail-Adresse ein');
            isValid = false;
        } else {
            markValid(emailInput);
        }
        
        if (!messageInput.value.trim()) {
            markInvalid(messageInput, 'Bitte hinterlasse eine Nachricht');
            isValid = false;
        } else {
            markValid(messageInput);
        }
        
        if (isValid) {
            // Hier würde normalerweise der Formularversand erfolgen
            showFormSuccess();
        }
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function markInvalid(element, message) {
    element.classList.add('invalid');
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        element.parentElement.removeChild(existingError);
    }
    
    element.parentElement.appendChild(errorElement);
}

function markValid(element) {
    element.classList.remove('invalid');
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) {
        element.parentElement.removeChild(existingError);
    }
}

function showFormSuccess() {
    const form = document.getElementById('contact-form');
    form.innerHTML = `
        <div class="success-message">
            <h3>Vielen Dank!</h3>
            <p>Deine Anfrage wurde erfolgreich gesendet. Ich werde mich in Kürze bei dir melden.</p>
        </div>
    `;
}

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
    });
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    animateProgressBars();
});
