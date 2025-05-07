// Mobile menu toggle functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    
    // Change icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';// Mobile menu toggle functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navbar = document.getElementById('navbar');
mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    
    // Change icon
    const icon = mobileMenuBtn.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
    
    // Prevent scrolling when menu is open
    document.body.classList.toggle('no-scroll', navbar.classList.contains('active'));
    
    // Add transition effect
    navbar.style.transition = 'transform 0.3s ease-in-out';
    
    // Add accessibility attributes
    const expanded = navbar.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', expanded);
    
    // Optional: Close menu when clicking outside
    if (expanded) {
        document.addEventListener('click', closeMenuOutside);
    } else {
        document.removeEventListener('click', closeMenuOutside);
    }
});

// Function to close menu when clicking outside
function closeMenuOutside(event) {
    if (!navbar.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        navbar.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        document.body.classList.remove('no-scroll');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeMenuOutside);
    }
}

// Close menu on ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        document.body.classList.remove('no-scroll');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeMenuOutside);
    }
});

// Optional: Close menu on window resize (if desktop view is triggered)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) { // Adjust this breakpoint to match your CSS
        navbar.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        document.body.classList.remove('no-scroll');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', closeMenuOutside);
    }
});
