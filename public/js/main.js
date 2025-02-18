// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn?.addEventListener('click', () => {
        navLinks?.classList.toggle('active');
        
        // Animate menu button
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn?.contains(e.target) && !navLinks?.contains(e.target)) {
            navLinks?.classList.remove('active');
            const spans = mobileMenuBtn?.querySelectorAll('span');
            spans?.forEach(span => span.classList.remove('active'));
        }
    });

    // Check authentication status
    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/status');
            const data = await response.json();
            
            const loginBtn = document.getElementById('loginBtn');
            if (data.authenticated) {
                loginBtn.textContent = 'Dashboard';
                loginBtn.href = '/dashboard.html';
            } else {
                loginBtn.textContent = 'Login';
                loginBtn.href = '/login.html';
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
        }
    };

    checkAuth();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current navigation link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});