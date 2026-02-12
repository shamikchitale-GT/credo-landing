// ========================================
// CREDO LANDING PAGE SCRIPTS
// ========================================

// Respect user motion preferences
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scaleDuration(ms) {
    return prefersReducedMotion() ? 0 : ms;
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVIGATION SCROLL EFFECT
    // ========================================
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // ========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // CREDIT SCORE COUNTER ANIMATION
    // ========================================
    const scoreValue = document.querySelector('.score-value');
    
    function animateCounter(element, target, duration) {
        const d = scaleDuration(duration);
        if (d === 0) {
            element.textContent = target;
            return;
        }
        const start = parseInt(element.textContent);
        const end = parseInt(target);
        const increment = (end - start) / (d / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Trigger counter when element is in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = entry.target.getAttribute('data-target');
                animateCounter(entry.target, target, 2000);
            }
        });
    }, observerOptions);

    if (scoreValue) {
        counterObserver.observe(scoreValue);
    }

    // ========================================
    // GRAPH LINE ANIMATION
    // ========================================
    const graphLine = document.querySelector('.graph-line');
    
    const graphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.strokeDashoffset = '0';
            }
        });
    }, observerOptions);

    if (graphLine) {
        graphObserver.observe(graphLine);
    }

    // ========================================
    // CREDIT CARD 3D TILT EFFECT
    // ========================================
    const creditCard = document.querySelector('.credit-card');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (creditCard && heroVisual && !prefersReducedMotion()) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            creditCard.style.transform = `
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px)
            `;
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            creditCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    }

    // ========================================
    // SCROLL ANIMATIONS FOR SECTIONS
    // ========================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.impact-card, .feature-card, .step-card, .team-card, .stat-card');
        const duration = scaleDuration(600);
        const stagger = prefersReducedMotion() ? 0 : 100;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = prefersReducedMotion() ? 0 : index * stagger;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity ' + duration + 'ms cubic-bezier(0.16, 1, 0.3, 1), transform ' + duration + 'ms cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(element);
        });
    };

    animateOnScroll();

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
        });
    });

    // ========================================
    // FLOATING BADGES RANDOM ANIMATION
    // ========================================
    if (!prefersReducedMotion()) {
        const floatingBadges = document.querySelectorAll('.floating-badge');
        
        floatingBadges.forEach((badge) => {
            const randomDelay = Math.random() * 2;
            const randomDuration = 4 + Math.random() * 3;
            badge.style.animationDelay = `${randomDelay}s`;
            badge.style.animationDuration = `${randomDuration}s`;
        });
    }

    // ========================================
    // PRICING BADGE PULSE ANIMATION
    // ========================================
    const pricingBadge = document.querySelector('.pricing-badge');
    
    if (pricingBadge && !prefersReducedMotion()) {
        setInterval(() => {
            pricingBadge.style.transform = 'scale(1.03)';
            setTimeout(() => {
                pricingBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }

    // ========================================
    // INTEGRATION STRIP PAUSE ON HOVER
    // ========================================
    const integrationStrip = document.querySelector('.strip-track');
    
    if (integrationStrip) {
        integrationStrip.addEventListener('mouseenter', () => {
            integrationStrip.style.animationPlayState = 'paused';
        });
        
        integrationStrip.addEventListener('mouseleave', () => {
            integrationStrip.style.animationPlayState = 'running';
        });
    }

    // ========================================
    // SOCIAL PROOF COUNTER
    // ========================================
    const proofCount = document.querySelector('.proof-count');
    
    if (proofCount) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, 250, 1500);
                }
            });
        }, observerOptions);
        
        countObserver.observe(proofCount);
    }

    // ========================================
    // FEATURE CARDS STAGGER ANIMATION
    // ========================================
    const featureCards = document.querySelectorAll('.feature-card');
    const featureStagger = prefersReducedMotion() ? 0 : 100;
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * featureStagger);
            }
        });
    }, {
        threshold: 0.2
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all ' + scaleDuration(500) + 'ms cubic-bezier(0.16, 1, 0.3, 1)';
        featureObserver.observe(card);
    });

    // ========================================
    // HERO CTA BUTTON HOVER EFFECT
    // ========================================
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!prefersReducedMotion()) {
                this.style.transform = 'translateY(-3px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========================================
    // SMOOTH REVEAL FOR REALITY SECTION
    // ========================================
    const realitySection = document.querySelector('.reality-section');
    
    if (realitySection) {
        const realityObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.1
        });
        
        realitySection.style.opacity = '0';
        realitySection.style.transition = 'opacity ' + scaleDuration(1000) + 'ms cubic-bezier(0.16, 1, 0.3, 1)';
        realityObserver.observe(realitySection);
    }

    // ========================================
    // WAITLIST FORM PLACEHOLDER INTERACTION
    // ========================================
    const formPlaceholder = document.querySelector('.form-placeholder');
    
    if (formPlaceholder) {
        formPlaceholder.addEventListener('click', function() {
            this.style.borderColor = 'var(--accent-blue)';
            setTimeout(() => {
                this.style.borderColor = 'var(--glass-border)';
            }, 1000);
        });
    }

    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%cCredo - Credit Planning Agent', 'font-size: 20px; color: #0A84FF; font-weight: bold;');
    console.log('%cBuilt for people who deserve better credit', 'font-size: 14px; color: #30D158;');

});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images (if we add them later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Prevent scroll jank
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});
