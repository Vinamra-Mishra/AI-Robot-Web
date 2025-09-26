// AI Robot Project - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initParallaxEffects();
    initInteractiveElements();
    initGitHubLinks();
    
    console.log('🤖 AI Robot Project initialized successfully!');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollTop = 0;

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add click handlers for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// GitHub links functionality
function initGitHubLinks() {
    const githubLinks = document.querySelectorAll('a[href*="github"], .github-btn');
    
    githubLinks.forEach(link => {
        // Ensure all GitHub links open in new tab
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        // If href is placeholder, set to actual GitHub URL
        if (link.href.includes('username/ai-robot-project')) {
            link.href = 'https://github.com/username/ai-robot-project';
        }
        
        // Add click handler to ensure functionality
        link.addEventListener('click', function(e) {
            // Let the browser handle the link normally
            console.log('Opening GitHub repository...');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('#mobile-menu-btn i');
    
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu icon
        if (mobileMenu.classList.contains('hidden')) {
            menuIcon.className = 'fas fa-bars text-xl';
        } else {
            menuIcon.className = 'fas fa-times text-xl';
        }
    }
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.toLowerCase();
            
            if (text.includes('demo')) {
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                    window.scrollTo({
                        top: gallerySection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else if (text.includes('features') || text.includes('explore')) {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    window.scrollTo({
                        top: featuresSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle demo launch button
    const demoLaunchBtn = document.querySelector('button');
    if (demoLaunchBtn && demoLaunchBtn.textContent.includes('Launch Demo')) {
        demoLaunchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            simulateLoading(this);
        });
    }
}

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grouped elements
                if (entry.target.classList.contains('stagger-parent')) {
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll([
        '.component-card',
        '.feature-card',
        '.spec-category',
        '.expression-card',
        '.flow-item',
        '.metric',
        '.info-item'
    ].join(','));

    animatedElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.3 });

    // Find the stats container more reliably
    const statsContainer = document.querySelector('.grid.grid-cols-2.md\\:grid-cols-6') || 
                          document.querySelector('[data-target]')?.closest('.grid') ||
                          document.querySelector('.counter')?.closest('.grid');
    
    if (statsContainer) {
        counterObserver.observe(statsContainer);
    } else {
        // Fallback: observe individual counters
        counters.forEach(counter => {
            counterObserver.observe(counter.parentElement);
        });
    }

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            let current = 0;
            const increment = target / 30; // Faster animation
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                    counter.classList.add('animate');
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 50); // Slightly faster updates
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.animate-float');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// Interactive elements
function initInteractiveElements() {
    // Add click handlers for expression cards
    const expressionCards = document.querySelectorAll('.expression-card');
    expressionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a fun interaction effect
            this.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // Add hover effects for component cards
    const componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create a ripple effect
            createRippleEffect(this, e);
        });
    });

    // GitHub button interactions
    const githubButtons = document.querySelectorAll('.github-btn, a[href*="github"]');
    githubButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 212, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add functionality to all demo-related buttons
    const demoButtons = document.querySelectorAll('button');
    demoButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        if (buttonText.includes('demo') || buttonText.includes('launch')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                simulateLoading(this);
            });
        }
    });
}

// Create ripple effect on click
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;

    // Add ripple animation CSS if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Simulate loading state
function simulateLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading Demo...';
    button.disabled = true;
    button.classList.add('loading');

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check mr-2"></i>Demo Ready!';
        button.classList.remove('loading');
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-play mr-2"></i>Experience Demo';
            button.disabled = false;
            
            // After demo simulation, show completion
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 1000);
        }, 2000);
    }, 2000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
    
    // Arrow keys for section navigation
    if (e.ctrlKey || e.metaKey) {
        const sections = ['home', 'architecture', 'features', 'specs', 'gallery', 'about'];
        const currentSection = getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            const nextSection = document.getElementById(sections[currentIndex + 1]);
            if (nextSection) {
                window.scrollTo({
                    top: nextSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            const prevSection = document.getElementById(sections[currentIndex - 1]);
            if (prevSection) {
                window.scrollTo({
                    top: prevSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;
    
    for (let section of sections) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        
        if (scrollPos >= top && scrollPos <= top + height) {
            return section.getAttribute('id');
        }
    }
    return 'home';
}

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    // Scroll-dependent calculations here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Accessibility improvements
function initAccessibility() {
    // Add keyboard navigation indicators
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
initAccessibility();

// Console welcome message
console.log(`
🤖 AI-Powered Raspberry Pi Robot Project
=======================================
Welcome to the future of interactive robotics!

Features:
- Voice interaction with AI processing
- 4-wheel drive autonomous navigation
- Real-time obstacle detection
- Expressive visual feedback
- Comprehensive logging system

GitHub: https://github.com/username/ai-robot-project
Status: In Development
License: MIT

Happy exploring! 🚀
`);

// Export functions for potential external use
window.RobotProject = {
    toggleMobileMenu,
    createRippleEffect,
    getCurrentSection,
    simulateLoading
};