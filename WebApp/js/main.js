// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add active class to current navigation item
const setActiveNavItem = () => {
    const navItems = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPath || 
            (currentPath === '/' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
};

window.addEventListener('load', setActiveNavItem); 