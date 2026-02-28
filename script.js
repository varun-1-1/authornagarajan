// Set current year in footer
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#') && targetId.length > 1) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Sticky mobile button logic
const stickyBtn = document.getElementById('stickyBtn');
const heroSection = document.getElementById('hero');

if (stickyBtn && heroSection) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Show sticky button when hero section is mostly out of view
            if (!entry.isIntersecting) {
                stickyBtn.classList.add('visible');
            } else {
                stickyBtn.classList.remove('visible');
            }
        });
    }, observerOptions);

    observer.observe(heroSection);
}

// Lightbox Modal logic
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-modal");

// Track the element that opened the modal to restore focus
let lastFocusedElement = null;

window.openModal = function(src) {
    if (!modal || !modalImg) return;
    
    lastFocusedElement = document.activeElement;
    
    modal.style.display = "block";
    // We add a tiny delay to ensure display:block is applied before transition
    setTimeout(() => {
        modal.style.opacity = "1";
    }, 10);
    
    modalImg.src = src;
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    
    // Focus close button for accessibility
    if (closeBtn) closeBtn.focus();
}

function closeModal() {
    if (!modal) return;
    
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    
    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

// Close modal event listeners
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', function(e) {
        // Close if clicking the background, but not the image itself
        if (e.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.style.display === "block") {
        closeModal();
    }
});