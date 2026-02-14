/**
 * UMass Lowell AI & ML Club — Main JavaScript
 * Handles: partial loading, scroll animations, typing effect, navbar, mobile menu, form, scroll-spy
 */

// ============================================
// Partial Loader — fetch HTML includes
// ============================================
async function loadPartials() {
    const slots = document.querySelectorAll('[data-include]');
    const fetches = Array.from(slots).map(async (slot) => {
        const url = slot.getAttribute('data-include');
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
            const html = await res.text();
            slot.outerHTML = html;
        } catch (err) {
            console.error(err);
        }
    });
    await Promise.all(fetches);
}

// ============================================
// App Initialization (called after partials load)
// ============================================
function initApp() {
    // ---- Typing Effect ----
    const typedPhrases = [
        'deep learning.',
        'neural networks.',
        'computer vision.',
        'natural language processing.',
        'generative AI.',
        'reinforcement learning.',
        'data science.',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedEl = document.getElementById('typed-text');

    function typeEffect() {
        if (!typedEl) return;

        const currentPhrase = typedPhrases[phraseIndex];

        if (isDeleting) {
            typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typedPhrases.length;
            delay = 400;
        }

        setTimeout(typeEffect, delay);
    }

    // Start typing after a brief delay
    setTimeout(typeEffect, 1200);

    // ---- Intersection Observer — Reveal on Scroll ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ---- Navbar Shrink on Scroll ----
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // ---- Scroll Spy — Active Nav Link ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    function handleScrollSpy() {
        const scrollY = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScrollSpy, { passive: true });

    // ---- Mobile Menu Toggle ----
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('.nav-link, .btn').forEach((link) => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Form Handling ----
    const joinForm = document.getElementById('join-form');
    const formSuccess = document.getElementById('form-success');

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation visual feedback
            const inputs = joinForm.querySelectorAll('.form-input, .form-select, .form-textarea');
            let isValid = true;

            inputs.forEach((input) => {
                if (input.required && !input.value.trim()) {
                    input.style.borderColor = 'var(--color-red)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                // Hide form, show success
                joinForm.style.display = 'none';
                formSuccess.classList.add('visible');
            }
        });

        // Clear error border on focus
        joinForm.querySelectorAll('.form-input, .form-select, .form-textarea').forEach((input) => {
            input.addEventListener('focus', () => {
                input.style.borderColor = '';
            });
        });
    }

    // ---- Smooth Scroll for all anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 80; // navbar height
                const targetPosition = targetEl.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            }
        });
    });
}

// ============================================
// Boot: load partials, then initialize
// ============================================
loadPartials().then(initApp);
