/**
 * KVS Spices & Traders - Complete JavaScript File
 * Universal functionality for all pages
 * Enhanced features and responsive interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFaqAccordion();
    initTabSwitcher();
    initTourFilters();
    initGalleryLightbox();
    initStickyHeader();
    initBackToTopButton();
    initScrollProgress();
    initHeaderScrollEffect();
    initIntersectionObserver();
    initPerformanceOptimizations();
    initAccessibilityFeatures();
    initStatsCounter();
    initParallaxEffects();
    initImageErrorHandling();
});

/* ================================
   MOBILE NAVIGATION FUNCTIONALITY
================================ */
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let isMenuOpen = false;

    if (!navToggle || !navMenu) return;

    // Toggle mobile navigation menu with enhanced icon animation
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        navMenu.classList.toggle('active', isMenuOpen);
        
        // Enhanced icon animation
        const icon = navToggle.querySelector('i');
        icon.className = isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Add animation class
        navToggle.classList.toggle('active', isMenuOpen);
    });

    // Close mobile menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu function
    function closeMenu() {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
        document.body.style.overflow = '';
        navToggle.classList.remove('active');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Touch gestures for mobile menu
    let startX, startY;

    navMenu.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    navMenu.addEventListener('touchmove', (e) => {
        if (!startX || !startY) return;
        
        const distX = e.touches[0].clientX - startX;
        const distY = e.touches[0].clientY - startY;
        
        // Close menu on swipe right
        if (distX > 100 && Math.abs(distY) < 100) {
            closeMenu();
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
}

/* ================================
   SMOOTH SCROLLING FUNCTIONALITY
================================ */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ================================
   SCROLL PROGRESS INDICATOR
================================ */
function initScrollProgress() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

/* ================================
   ENHANCED HEADER SCROLL EFFECT
================================ */
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove backdrop blur based on scroll position
        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'var(--shadow-md)';
        }
        
        // Hide/show header on scroll (only on mobile)
        if (window.innerWidth <= 768) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    });
}

/* ================================
   SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
================================ */
function initScrollAnimations() {
    // Add animation class to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll');
    });

    // Basic scroll animation
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    };

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

/* ================================
   ENHANCED INTERSECTION OBSERVER
================================ */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Enhanced card animations with staggered effect
    const cardElements = document.querySelectorAll(
        '.tour-card, .highlight-card, .value-card, .feature-card, ' +
        '.process-step, .product-card, .service-item, .location-card'
    );

    cardElements.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // Staggered animation
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
}

/* ================================
   FAQ ACCORDION FUNCTIONALITY
================================ */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });

        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}

/* ================================
   ENHANCED TAB SWITCHER
================================ */
function initTabSwitcher() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0 || tabContents.length === 0) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(tc => {
                tc.classList.remove('active');
                tc.style.opacity = '0';
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show target tab with fade effect
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

/* ================================
   TOUR FILTER FUNCTIONALITY
================================ */
function initTourFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');
    
    if (filterBtns.length === 0 || tourCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Filter tour cards with enhanced animations
            tourCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px) scale(0.9)';
                        
                        // Animate in
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    }, index * 100);
                } else {
                    // Hide card with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ================================
   ENHANCED GALLERY LIGHTBOX
================================ */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(
        '.gallery-item img, .gallery-item, img[data-lightbox="true"]'
    );
    
    if (galleryItems.length === 0) return;

    // Create lightbox if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);
    }

    const imgTag = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Add click handlers to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            let imgSrc, imgAlt, imgCap;
            
            if (item.tagName === "IMG") {
                imgSrc = item.src;
                imgAlt = item.alt;
                const galleryItem = item.closest('.gallery-item');
                imgCap = galleryItem?.querySelector('.gallery-caption')?.textContent || imgAlt || '';
            } else {
                const img = item.querySelector('img');
                imgSrc = img?.src || '';
                imgAlt = img?.alt || '';
                imgCap = item.querySelector('.gallery-caption')?.textContent || imgAlt || '';
            }
            
            if (imgSrc) {
                imgTag.src = imgSrc;
                imgTag.alt = imgAlt;
                caption.textContent = imgCap;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Add keyboard navigation
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Close lightbox handlers
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ================================
   STICKY HEADER FUNCTIONALITY
================================ */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
        
        lastScroll = currentScroll;
    });
}

/* ================================
   BACK TO TOP BUTTON
================================ */
function initBackToTopButton() {
    let backBtn = document.getElementById('back-to-top');
    
    // Create button if it doesn't exist
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'back-to-top';
        backBtn.title = 'Back to Top';
        backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backBtn);
    }

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ================================
   STATISTICS COUNTER ANIMATION
================================ */
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                const finalValue = parseInt(text.replace(/\D/g, ''));
                
                if (finalValue && finalValue > 0) {
                    animateCounter(stat, finalValue, text);
                    statsObserver.unobserve(stat);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element, finalValue, originalText) {
        let currentValue = 0;
        const increment = finalValue / 50;
        const suffix = originalText.replace(/\d/g, '');
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = finalValue + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(currentValue) + suffix;
            }
        }, 40);
    }
}

/* ================================
   ENHANCED HOVER EFFECTS
================================ */
function initEnhancedHoverEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll(
        '.tour-card, .product-card, .highlight-card, .value-card, ' +
        '.feature-card, .service-item, .location-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Enhanced hover effects for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
}

/* ================================
   PARALLAX EFFECTS
================================ */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .page-hero');
    
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.backgroundPositionY = rate + 'px';
            });
        });
    }
}

/* ================================
   PERFORMANCE OPTIMIZATIONS
================================ */
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loading');
                
                img.addEventListener('load', () => {
                    img.classList.remove('loading');
                });
                
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Throttle scroll events
    let scrollTimer = null;
    const throttledScroll = (callback) => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            callback();
            scrollTimer = null;
        }, 16); // ~60fps
    };

    // Debounce resize events
    let resizeTimer = null;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Handle resize events
            handleResize();
        }, 250);
    });

    function handleResize() {
        // Recalculate layouts or refresh components as needed
        const navMenu = document.getElementById('navMenu');
        if (navMenu && window.innerWidth > 768) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

/* ================================
   ACCESSIBILITY FEATURES
================================ */
function initAccessibilityFeatures() {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Remove transitions for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Focus management for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
}

/* ================================
   IMAGE ERROR HANDLING
================================ */
function initImageErrorHandling() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
            this.style.backgroundColor = 'var(--gray-200)';
            this.alt = 'Image could not be loaded';
            console.warn('Failed to load image:', this.src);
            
            // Add a placeholder icon or text
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: var(--text-medium);
                font-size: 2rem;
            `;
            placeholder.innerHTML = '<i class="fas fa-image"></i>';
            
            if (this.parentNode.style.position !== 'relative') {
                this.parentNode.style.position = 'relative';
            }
            this.parentNode.appendChild(placeholder);
        });
    });
}

/* ================================
   THEME DETECTION AND ADJUSTMENTS
================================ */
function initThemeDetection() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkMode) {
        document.documentElement.style.filter = 'brightness(0.95)';
    }

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.style.filter = 'brightness(0.95)';
        } else {
            document.documentElement.style.filter = '';
        }
    });
}

/* ================================
   LOADING OPTIMIZATION
================================ */
window.addEventListener('load', () => {
    // Remove loading classes
    document.querySelectorAll('.loading').forEach(el => {
        el.classList.remove('loading');
    });
    
    // Initialize animations after load
    setTimeout(() => {
        document.body.classList.add('loaded');
        initEnhancedHoverEffects();
        initParallaxEffects();
        initThemeDetection();
    }, 100);

    // Initialize additional features that require full page load
    setTimeout(() => {
        // Any additional initialization that needs to wait
    }, 500);
});

/* ================================
   UTILITY FUNCTIONS
================================ */

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func(...args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func(...args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/* ================================
   EXPORT FUNCTIONS FOR GLOBAL USE
================================ */
window.KVSUtils = {
    debounce,
    throttle,
    isInViewport,
    scrollToElement
};

/* ================================
   ERROR HANDLING AND FALLBACKS
================================ */
window.addEventListener('error', (e) => {
    console.warn('JavaScript error caught:', e.error);
    // Implement any fallback functionality here
});

// Service Worker registration for PWA (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker if you have one
        // navigator.serviceWorker.register('/sw.js');
    });
}

console.log('KVS Spices & Traders - JavaScript loaded successfully!');