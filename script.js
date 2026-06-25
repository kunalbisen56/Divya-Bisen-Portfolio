document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. FIXED HEADER & ACTIVE NAV HIGHLIGHT
       ========================================================================== */
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header Toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Section link Highlight
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       2. MOBILE HAMBURGER MENU
       ========================================================================== */
    const hamburger = document.getElementById('hamburger-menu');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        hamburger.classList.toggle('open');
        mobileOverlay.classList.toggle('open');
        // Prevent body scroll when menu open
        if (mobileOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu and resume scrolling
            hamburger.classList.remove('open');
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    /* ==========================================================================
       3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       4. CERTIFICATION LIGHTBOX MODAL
       ========================================================================== */
    const certModal = document.getElementById('cert-modal');
    const certModalClose = document.getElementById('cert-modal-close');
    const modalCertTitle = document.getElementById('modal-cert-title');
    const modalCertImg = document.getElementById('modal-cert-img');
    const certBtns = document.querySelectorAll('.cert-btn');

    certBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const certImgSrc = e.currentTarget.getAttribute('data-cert');
            const certTitle = e.currentTarget.getAttribute('data-title');
            
            modalCertImg.setAttribute('src', certImgSrc);
            modalCertTitle.textContent = certTitle;
            
            certModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close Cert Modal
    certModalClose.addEventListener('click', () => {
        certModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    });

    /* ==========================================================================
       5. RESUME VIEWER MODAL
       ========================================================================== */
    const resumeModal = document.getElementById('resume-modal');
    const resumeModalClose = document.getElementById('resume-modal-close');
    const viewResumeBtn = document.getElementById('btn-view-resume');
    const headerResumeBtn = document.getElementById('header-resume-btn');
    const mobResumeBtn = document.getElementById('mob-link-resume');

    function openResumeModal(e) {
        e.preventDefault();
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    if (viewResumeBtn) viewResumeBtn.addEventListener('click', openResumeModal);
    if (headerResumeBtn) headerResumeBtn.addEventListener('click', openResumeModal);
    if (mobResumeBtn) mobResumeBtn.addEventListener('click', openResumeModal);

    // Close Resume Modal
    resumeModalClose.addEventListener('click', () => {
        resumeModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    });

    /* ==========================================================================
       6. GLOBAL CLOSE ON OVERLAY CLICK
       ========================================================================== */
    window.addEventListener('click', (e) => {
        if (e.target === certModal) {
            certModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
        if (e.target === resumeModal) {
            resumeModal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });

    /* ==========================================================================
       7. CONTACT FORM SUBMISSION & TOAST SUCCESS
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const successToast = document.getElementById('toast-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // UI Button feedback state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;

            // Simulate server network latency
            setTimeout(() => {
                // Reset form inputs
                contactForm.reset();
                
                // Show Success Toast
                successToast.classList.add('show');
                
                // Restore button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;

                // Hide Toast after 4 seconds
                setTimeout(() => {
                    successToast.classList.remove('show');
                }, 4000);

            }, 1500);
        });
    }

    /* ==========================================================================
       8. SMOOTH SCROLL ACCESSIBILITY FOR NAVIGATION HACKS
       ========================================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate sticky header offset dynamically
                const offset = header.offsetHeight;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
