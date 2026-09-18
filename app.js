// ============================================================================
// TERRA RIDE — Application Scripts
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library (Snappy & Responsive)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 450,
            once: true,
            easing: 'ease-out',
            offset: 20,
            disableMutationObserver: false
        });
    }

    initParticles();
    initSmoothScrolling();
    initCoverageSearch();
    initCounterAnimations();
    initScrollSpy();
});

// Mobile Drawer Menu Toggle
function toggleMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    const icon = document.getElementById('menu-icon');
    if (drawer) {
        drawer.classList.toggle('open');
        if (icon) {
            icon.className = drawer.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
    }
}

// Active Nav Item Handler for Mobile Bottom Navigation
function setActiveNav(element) {
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// Zero-Jank Scroll Spy using IntersectionObserver (No Layout Reflows or Frame Drops)
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.bottom-nav-item');
    if (!sections.length || !navItems.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    const href = item.getAttribute('href');
                    if (href === `#${currentId}`) {
                        item.classList.add('active');
                    } else if (href && href.startsWith('#')) {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Ultra-Smooth Animated Particles Canvas
function initParticles() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particleCount = window.innerWidth < 768 ? 16 : 28;
    const particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        color: Math.random() > 0.4 ? 'rgba(201, 147, 42, ' : 'rgba(255, 213, 79, ',
        alpha: Math.random() * 0.45 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.15
    }));

    // Postpone particle drawing for the first 1200ms to allow smooth entry CSS transitions
    let activeDrawing = false;
    setTimeout(() => {
        activeDrawing = true;
    }, 1200);

    function render() {
        if (!document.hidden) {
            ctx.clearRect(0, 0, width, height);

            if (activeDrawing) {
                particles.forEach(p => {
                    p.x += p.speedX;
                    p.y += p.speedY;

                    if (p.y < 0) p.y = height;
                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = p.color + p.alpha + ')';
                    ctx.fill();
                });
            }
        }

        requestAnimationFrame(render);
    }

    render();
}

// Modal Dialog Management
function openModal(modalId) {
    let modal = document.getElementById(modalId);
    if (!modal && !modalId.endsWith('-modal')) {
        modal = document.getElementById(`${modalId}-modal`);
    }
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function openLoginModal() {
    openModal('login-modal');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function closeModalOnOverlay(e, modalId) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal(modalId);
    }
}

// Login Modal Tabs & Form Submission
function switchLoginTab(tab) {
    const btnPassenger = document.getElementById('tab-passenger');
    const btnDriver = document.getElementById('tab-driver');

    if (tab === 'passenger') {
        btnPassenger.classList.add('active');
        btnDriver.classList.remove('active');
    } else {
        btnDriver.classList.add('active');
        btnPassenger.classList.remove('active');
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const successMsg = document.getElementById('login-success-msg');
    if (successMsg) {
        successMsg.classList.remove('hidden');
        setTimeout(() => {
            closeModal('login-modal');
            successMsg.classList.add('hidden');
        }, 1800);
    }
}

// Stats Number Counter Animation
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-counter'), 10);
                    if (isNaN(target)) return;

                    let start = 0;
                    const duration = 1500;
                    const stepTime = Math.abs(Math.floor(duration / target)) || 20;

                    const timer = setInterval(() => {
                        start += Math.ceil(target / 40);
                        if (start >= target) {
                            start = target;
                            clearInterval(timer);
                            if (target === 50000) counter.innerText = '+50,000';
                            if (target === 99) counter.innerText = '99.8%';
                        } else {
                            if (target === 50000) counter.innerText = '+' + start.toLocaleString();
                            if (target === 99) counter.innerText = start + '%';
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.hero-stats-bar');
    if (statsBar) observer.observe(statsBar);
}

// Search & Filter Coverage Landmarks
function initCoverageSearch() {
    const input = document.getElementById('coverage-search-input');
    if (!input) return;

    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.coverage-card');

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            if (text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}
