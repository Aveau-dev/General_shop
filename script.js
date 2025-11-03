// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.right = '20px';
    navLinks.style.background = 'white';
    navLinks.style.padding = '20px';
    navLinks.style.borderRadius = '10px';
    navLinks.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Product card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});
// Admin Login Modal
function openAdminLogin() {
    const modal = document.createElement('div');
    modal.className = 'admin-modal';
    modal.id = 'adminLoginModal';
    modal.innerHTML = `
        <div class="admin-modal-content">
            <div class="admin-modal-header">
                <i class="fas fa-shield-alt"></i>
                <h3>Admin Login</h3>
                <p>Store Management Access</p>
            </div>
            <div id="adminError" class="admin-error"></div>
            <form id="adminQuickLogin">
                <div class="admin-input-group">
                    <i class="fas fa-user"></i>
                    <input type="text" id="adminUsername" placeholder="Username" required>
                </div>
                <div class="admin-input-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" id="adminPassword" placeholder="Password" required>
                </div>
                <button type="submit" class="admin-login-btn">
                    <i class="fas fa-sign-in-alt"></i> Login to Admin Panel
                </button>
                <button type="button" onclick="closeAdminModal()" class="admin-cancel-btn">
                    Cancel
                </button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAdminModal();
        }
    });
    
    // Handle login
    document.getElementById('adminQuickLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        handleAdminLogin();
    });
}

function closeAdminModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.remove();
    }
}

function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('adminError');
    
    // Default credentials (same as admin panel)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set session
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminName', username);
        
        // Redirect to admin panel
        window.location.href = 'admin.html';
    } else {
        // Show error
        errorDiv.textContent = '❌ Invalid username or password!';
        errorDiv.style.display = 'block';
        
        // Hide error after 3 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

// Keyboard shortcut for admin (Ctrl+Shift+A)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminLogin();
    }
});

console.log('Admin Access: Click shield icon (bottom-left) or press Ctrl+Shift+A');
