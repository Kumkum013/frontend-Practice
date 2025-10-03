// Load HTML components
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Load components
    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('hero-placeholder', 'hero.html');
    loadComponent('services-placeholder', 'services.html');
    loadComponent('how-it-works-placeholder', 'howitworks.html');
    loadComponent('footer-placeholder', 'footer.html');
    loadComponent('auth-placeholder', 'auth.html');

    // Wait a bit for components to load before initializing animations
    setTimeout(initializeAnimations, 500);
});

// Initialize all animations
function initializeAnimations() {
    // Function to create particles
    const createParticle = (container, particleClass, animationDelay) => {
        const particle = document.createElement('div');
        particle.classList.add(particleClass);
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${animationDelay}s`;
        container.appendChild(particle);
    };

    // Network Animation for Hero Section - Increased particle count and speed
    const heroAnimationContainer = document.querySelector('.hero-animation');
    if (heroAnimationContainer) {
        const aiParticlesContainer = heroAnimationContainer.querySelector('.ai-particles');
        if (aiParticlesContainer) {
            aiParticlesContainer.innerHTML = ''; // Clear existing particles
            for (let i = 0; i < 60; i++) { // Increased particle count
                createParticle(aiParticlesContainer, 'particle', Math.random() * 5); // Faster animation delay
            }
        }
    }

    // Network Animation for How It Works Section - Increased particle count and speed
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
        const howItWorksAnimationBg = howItWorksSection.querySelector('.how-it-works-animation-bg');
        if (howItWorksAnimationBg) { // Check if the animation background exists
            const howItWorksParticlesContainer = howItWorksAnimationBg.querySelector('.ai-particles');
            if (howItWorksParticlesContainer) {
                howItWorksParticlesContainer.innerHTML = ''; // Clear existing particles
                for (let i = 0; i < 40; i++) { // Increased particle count
                    createParticle(howItWorksParticlesContainer, 'particle', Math.random() * 5); // Faster animation delay
                }
            }
        }
    }

    // JavaScript for fade-in animation on scroll for sections
    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // Function to create the film credits-style text animation
    function animateHeroText() {
        const textContainer = document.getElementById('hero-animated-text');
        if (!textContainer) return;
        
        const textContent = "AI-powered solutions for tomorrow's challenges. Connect, learn and grow with intelligent networking.";
        const sentences = textContent.split('. ');
        textContainer.innerHTML = '';

        sentences.forEach((sentence, index) => {
            if (sentence) {
                const span = document.createElement('span');
                span.textContent = sentence + (index < sentences.length - 1 ? '.' : '');
                span.classList.add('animated-text-line', 'text-xl', 'md:text-2xl', 'text-gray-400', 'leading-relaxed');
                span.style.animationDelay = `${index * 1}s`;
                textContainer.appendChild(span);
                // Add a line break after each line except the last
                if (index < sentences.length - 1) {
                    textContainer.appendChild(document.createElement('br'));
                }
            }
        });
    }

    animateHeroText();
}

// JavaScript for mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// Functions for showing/hiding login and sign-up pages
function showSignUpPage() {
    const signupPage = document.getElementById('signup-page');
    const loginPage = document.getElementById('login-page');
    
    if (signupPage && loginPage) {
        signupPage.classList.remove('hidden');
        loginPage.classList.add('hidden');
        setTimeout(() => {
            signupPage.classList.add('active');
        }, 10);
    }
}

function showLoginPage() {
    const loginPage = document.getElementById('login-page');
    const signupPage = document.getElementById('signup-page');
    
    if (loginPage && signupPage) {
        loginPage.classList.remove('hidden');
        signupPage.classList.add('hidden');
        setTimeout(() => {
            loginPage.classList.add('active');
        }, 10);
    }
}

function hideAuthPages() {
    const signupPage = document.getElementById('signup-page');
    const loginPage = document.getElementById('login-page');
    
    if (signupPage) signupPage.classList.remove('active');
    if (loginPage) loginPage.classList.remove('active');
    
    setTimeout(() => {
        if (signupPage) signupPage.classList.add('hidden');
        if (loginPage) loginPage.classList.add('hidden');
    }, 300);
}