// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Menu category tabs
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuGrids = document.querySelectorAll('.menu-grid');
    
    if (menuCategories.length && menuGrids.length) {
        menuCategories.forEach(category => {
            category.addEventListener('click', function() {
                // Remove active class from all categories
                menuCategories.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked category
                this.classList.add('active');
                
                // Hide all menu grids
                menuGrids.forEach(grid => {
                    grid.classList.remove('active');
                });
                
                // Show the selected menu grid
                const selectedGrid = document.getElementById(this.getAttribute('data-category'));
                if (selectedGrid) {
                    selectedGrid.classList.add('active');
                }
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu when a link is clicked
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            // Update active link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Gallery image lightbox (simple version)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // This is where you would implement a lightbox
            // For a simple lightbox:
            const imgSrc = this.querySelector('img').getAttribute('src');
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="Gallery Image">
                </div>
            `;
            
            // Add lightbox to body
            document.body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Add lightbox styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    display: block;
                    margin: 0 auto;
                }
                
                .close-lightbox {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    font-size: 30px;
                    color: white;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
            
            // Close lightbox functionality
            const closeLightbox = document.querySelector('.close-lightbox');
            closeLightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            // Close on click outside of image
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Here you would typically send the data to a server
            // For demonstration, we'll just show a success message
            
            // Create a success message element
            const successMsg = document.createElement('div');
            successMsg.classList.add('form-success');
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Your submission has been received. We'll get back to you soon!</p>
            `;
            
            // Insert after the form
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Hide the form
            this.style.display = 'none';
            
            // Add success message styles
            const style = document.createElement('style');
            style.textContent = `
                .form-success {
                    background-color: rgba(40, 167, 69, 0.1);
                    border: 1px solid rgba(40, 167, 69, 0.2);
                    border-radius: 4px;
                    padding: 20px;
                    text-align: center;
                    margin-top: 20px;
                }
                
                .form-success i {
                    color: #28a745;
                    font-size: 3rem;
                    margin-bottom: 15px;
                }
                
                .form-success p {
                    color: #ddd;
                }
            `;
            document.head.appendChild(style);
        });
    });
    
    // Add active class to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        const header = document.querySelector('header');
        
        // Check if we're at the top (header)
        if (scrollPosition < header.offsetHeight - 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[0].classList.add('active'); // Home link
            return;
        }
        
        // Check each section's position
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const sectionId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Animation on scroll (simple version)
    function revealOnScroll() {
        const elements = document.querySelectorAll('.about-content, .menu-item, .gallery-item, .order-option, .contact-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .menu-item, .gallery-item, .order-option, .contact-content');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Run animation check on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
    
    // Fixed header on scroll
    function handleFixedHeader() {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const logo = document.querySelector('.logo');
        
        if (window.scrollY > 100) {
            // Add fixed navigation styles dynamically
            const style = document.createElement('style');
            style.id = 'fixed-header-style';
            style.textContent = `
                .fixed-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background-color: rgba(10, 10, 10, 0.95);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                    padding: 15px 50px;
                    z-index: 1000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .fixed-nav .logo {
                    position: static;
                }
                
                .fixed-nav nav {
                    position: static;
                }
            `;
            
            // Only add if not already added
            if (!document.getElementById('fixed-header-style')) {
                document.head.appendChild(style);
            }
            
            // Create fixed header if not already created
            if (!document.querySelector('.fixed-nav')) {
                const fixedNav = document.createElement('div');
                fixedNav.classList.add('fixed-nav');
                
                // Clone logo and nav
                const logoClone = logo.cloneNode(true);
                const navClone = nav.cloneNode(true);
                
                fixedNav.appendChild(logoClone);
                fixedNav.appendChild(navClone);
                
                document.body.appendChild(fixedNav);
                
                // Add event listeners to the cloned nav links
                const clonedNavLinks = fixedNav.querySelectorAll('nav ul li a');
                clonedNavLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        // Update active link
                        clonedNavLinks.forEach(navLink => {
                            navLink.classList.remove('active');
                        });
                        this.classList.add('active');
                    });
                });
            }
        } else {
            // Remove fixed nav when scrolled back to top
            const fixedNav = document.querySelector('.fixed-nav');
            if (fixedNav) {
                document.body.removeChild(fixedNav);
            }
        }
    }
    
    window.addEventListener('scroll', handleFixedHeader);
});
