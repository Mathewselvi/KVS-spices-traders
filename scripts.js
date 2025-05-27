/**
 * KVS Spices & Traders - Main JavaScript File (Responsive, White Theme Compatible)
 * Handles navigation, scroll effects, tabs, lightbox, FAQ, sticky header, back to top, and more
 */
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initFaqAccordion();
    initTabSwitcher();
    initGalleryLightbox();
    initStickyHeader();
    initBackToTopButton();
    // Add more initializers here if needed!
});

/* --- Mobile Navigation Toggle --- */
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}
/* --- Smooth Scrolling --- */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !document.querySelector(targetId)) return;
            e.preventDefault();
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = document.querySelector(targetId).offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
    });
}
/* --- Animate on Scroll --- */
function initScrollAnimations() {
    const animateOnScroll = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animated');
            }
        });
    }
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    document.querySelectorAll('.section-title').forEach(title => {
        title.classList.add('animate-on-scroll');
    });
}
/* --- FAQ Accordion --- */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
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
/* --- Tabs (and Tour Filter) --- */
function initTabSwitcher() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                tabBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
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
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tourCards = document.querySelectorAll('.tour-card');
    if (filterBtns.length > 0 && tourCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                tourCards.forEach((card, index) => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
}
/* --- Gallery Lightbox --- */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-item, img[data-lightbox="true"]');
    if (galleryItems.length > 0) {
        let lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-caption"></div>
                <span class="lightbox-close">&times;</span>
            </div>
        `;
        document.body.appendChild(lightbox);
        const imgTag = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        galleryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                let imgSrc, imgAlt, imgCap;
                if (item.tagName === "IMG") {
                    imgSrc = item.src;
                    imgAlt = item.alt;
                    imgCap = item.closest('.gallery-item')?.querySelector('.gallery-caption')?.textContent || imgAlt || '';
                } else {
                    imgSrc = item.querySelector('img')?.src || '';
                    imgAlt = item.querySelector('img')?.alt || '';
                    imgCap = item.querySelector('.gallery-caption')?.textContent || imgAlt || '';
                }
                imgTag.src = imgSrc;
                imgTag.alt = imgAlt;
                caption.textContent = imgCap;
                lightbox.classList.add('active');
            });
        });
        closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") lightbox.classList.remove('active');
        });
    }
}
/* --- Sticky Header --- */
function initStickyHeader() {
    const header = document.querySelector('header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('sticky-header');
        } else {
            header.classList.remove('sticky-header');
        }
        lastScroll = window.scrollY;
    });
}
/* --- Back to Top Button --- */
function initBackToTopButton() {
    let backBtn = document.getElementById('back-to-top');
    if (!backBtn) {
        backBtn = document.createElement('button');
        backBtn.id = 'back-to-top';
        backBtn.title = 'Back to Top';
        backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backBtn);
    }
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) backBtn.classList.add('visible');
        else backBtn.classList.remove('visible');
    });
    backBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
}
