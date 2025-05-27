/**
 * KVS Spices & Traders - Main JavaScript File - White Theme Compatible
 * Handles common functionality across the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all common components
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFaqAccordion();
    initTabSwitcher();
    initGalleryLightbox(); // Enable lightbox functionality
    initStickyHeader(); // Enable sticky header
    initBackToTopButton(); // Enable back to top button
    initThemeSpecificFeatures(); // White theme specific features
});

/**
 * Mobile Navigation Toggle
 * Handles responsive navigation menu for mobile devices
 */
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Update toggle icon for white theme
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking a nav link
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                // Reset toggle icon
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Reset toggle icon
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 * Provides smooth animation when clicking on anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only process links to existing elements
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Account for fixed header height in white theme
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll to element
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Animations
 * Adds animation effects when scrolling down the page
 */
function initScrollAnimations() {
    // Animate elements when they enter the viewport
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element enters the viewport
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run on initial load and on scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Add scroll animation to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll');
    });
}

/**
 * FAQ Accordion
 * Handles expanding/collapsing of FAQ items
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', () => {
                    // Toggle active state on the clicked item
                    item.classList.toggle('active');
                    
                    // Optional: Close other open items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                });
            }
        });
    }
}

/**
 * Tab Switcher
 * Handles switching between tabs in tabbed interfaces
 */
function initTabSwitcher() {
    // Product tabs on Anachal page
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                // Show the corresponding tab content with animation
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.opacity = '0';
                });
                
                const targetTab = document.getElementById(`${tabId}-tab`);
                if (targetTab) {
                    targetTab.classList.add('active');
                    setTimeout(() => {
                        targetTab.style.opacity = '1';
                    }, 50);
                }
            });
        });
    }
    
    // Tour filter buttons on Tours page
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');
    
    if (filterBtns.length > 0 && tourCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter button
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter tour cards with animation
                const filter = btn.getAttribute('data-filter');
                
                tourCards.forEach((card, index) => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        // Staggered animation for white theme
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

/**
 * Image Gallery Lightbox
 * Creates a lightbox effect for gallery images
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item, .service-img, img[data-lightbox="true"]');
    
    if (galleryItems.length > 0) {
        // Create lightbox container if it doesn't exist
        let lightbox = document.getElementById('gallery-lightbox');
        
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'gallery-lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img class="lightbox-image" src="" alt="Gallery Image">
                    <div class="lightbox-caption"></div>
                </div>
            `;
            document.body.appendChild(lightbox);
            
            // Add lightbox styles if they don't exist (White theme compatible)
            if (!document.getElementById('lightbox-styles')) {
                const style = document.createElement('style');
                style.id = 'lightbox-styles';
                style.textContent = `
                    .lightbox {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(255, 255, 255, 0.95);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(5px);
                    }
                    .lightbox.active {
                        opacity: 1;
                        visibility: visible;
                    }
                    .lightbox-content {
                        position: relative;
                        max-width: 90%;
                        max-height: 90%;
                    }
                    .lightbox-image {
                        max-width: 100%;
                        max-height: 85vh;
                        display: block;
                        border: 5px solid #fff;
                        border-radius: 8px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    }
                    .lightbox-caption {
                        position: absolute;
                        bottom: -50px;
                        left: 0;
                        right: 0;
                        text-align: center;
                        color: #263238;
                        padding: 10px;
                        font-size: 1rem;
                        background-color: #ffffff;
                        border-radius: 4px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    .lightbox-close {
                        position: absolute;
                        top: -50px;
                        right: 0;
                        color: #263238;
                        font-size: 1.5rem;
                        cursor: pointer;
                        background-color: #ffffff;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                        transition: all 0.3s ease;
                    }
                    .lightbox-close:hover {
                        background-color: #2e7d32;
                        color: #ffffff;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Close lightbox when clicking the close button or outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target.className === 'lightbox-close') {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Close lightbox with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
        
        // Open lightbox when clicking gallery items
        galleryItems.forEach(item => {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                let img;
                
                if (item.tagName === 'IMG') {
                    img = item;
                } else {
                    img = item.querySelector('img');
                }
                
                if (img) {
                    const lightboxImg = lightbox.querySelector('.lightbox-image');
                    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
                    
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    
                    const caption = item.querySelector('.gallery-caption');
                    if (caption && lightboxCaption) {
                        lightboxCaption.textContent = caption.textContent;
                    } else if (img.alt && lightboxCaption) {
                        lightboxCaption.textContent = img.alt;
                    } else if (lightboxCaption) {
                        lightboxCaption.textContent = '';
                    }
                    
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open
                }
            });
        });
    }
}

/**
 * Sticky Header
 * Makes the header stick to the top of the viewport on scroll - White Theme
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero') || document.querySelector('.page-hero');
    
    if (header && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroHeight - 100) {
                header.classList.add('sticky-header');
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.classList.remove('sticky-header');
                header.style.backgroundColor = '#ffffff';
                header.style.backdropFilter = 'none';
            }
        });
    }
}

/**
 * Back to Top Button
 * White theme compatible back to top button
 */
function initBackToTopButton() {
    let backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);
        
        // Add styles if they don't exist (White theme compatible)
        if (!document.getElementById('back-to-top-styles')) {
            const style = document.createElement('style');
            style.id = 'back-to-top-styles';
            style.textContent = `
                #back-to-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #2e7d32;
                    color: #ffffff;
                    border: none;
                    font-size: 1.25rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
                    z-index: 999;
                }
                #back-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                }
                #back-to-top:hover {
                    background-color: #005005;
                    transform: translateY(-5px);
                    box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
                }
                @media (max-width: 768px) {
                    #back-to-top {
                        width: 45px;
                        height: 45px;
                        bottom: 20px;
                        right: 20px;
                        font-size: 1.1rem;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * White Theme Specific Features
 * Additional functionality specific to the white theme
 */
function initThemeSpecificFeatures() {
    // Add subtle animations to cards
    const cards = document.querySelectorAll('.location-card, .service-item, .tour-card, .product-card, .highlight-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease';
        });
    });
    
    // Enhanced form interactions
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
            input.style.borderColor = '#2e7d32';
        });
        
        input.addEventListener('blur', () => {
            input.style.boxShadow = 'none';
            input.style.borderColor = '#e9ecef';
        });
    });
    
    // Enhance button interactions
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'all 0.3s ease';
        });
    });
    
    // Add loading states for interactive elements
    const interactiveElements = document.querySelectorAll('[data-loading]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            element.classList.add('loading');
            
            // Remove loading state after a delay (or when your action completes)
            setTimeout(() => {
                element.classList.remove('loading');
            }, 2000);
        });
    });
    
    // Enhanced scroll performance for white theme
    let ticking = false;
    
    function updateScrollElements() {
        // Update any scroll-dependent elements here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
    
    // Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate when in view
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
}