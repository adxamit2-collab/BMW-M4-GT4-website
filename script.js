document.addEventListener("DOMContentLoaded", () => {
    // Basic interaction for the CTA button to add a cinematic slight zoom effect
    const btn = document.getElementById("enter-race-btn");
    
    if(btn) {
        btn.addEventListener('mousemove', (e) => {
            // Optional parallax glow effect based on mouse position within the button
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Can be used to drive custom radial gradient glow in the CSS if needed
            btn.style.setProperty('--mouse-x', `${x}px`);
            btn.style.setProperty('--mouse-y', `${y}px`);
        });

        // Click interaction
        btn.addEventListener('click', () => {
            // Add a cinematic flash animation on click
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                overlay.style.transition = 'background 0.2s ease';
                overlay.style.background = 'rgba(255, 255, 255, 0.2)';
                
                setTimeout(() => {
                    overlay.style.transition = 'background 1.5s ease';
                    overlay.style.background = 'linear-gradient(135deg, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.6) 40%, rgba(5, 5, 5, 0.3) 100%)';
                }, 200);
            }
        });
    }

    // Youtube Iframe un-focus hack
    // Since we pass pointer-events:none to the iframe, it won't steal focus
    // but we can ensure the viewport focuses on the hero on load
    window.focus();

    // Intersection Observer for fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            // close mobile menu if open
            if(navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-based speed/zoom animation
    const videoBg = document.querySelector('.video-background iframe');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if(videoBg) {
            // Calculate scale based on scroll position - adds dramatic zoom like acceleration
            // base scale 1.05 + small increment based on scroll.
            const newScale = 1.05 + (scrollY * 0.0005); 
            videoBg.style.transform = `translate(-50%, -50%) scale(${newScale})`;
        }
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Navbar Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});
