// ================================================================
// THEME TOGGLE (Dark/Light)
// ================================================================

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const icon = document.querySelector('.top-navbar .nav-icons i:first-child');
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ================================================================
// SIDEBAR TOGGLE FUNCTIONS (Mobile)
// ================================================================

function openSidebar() {
    document.getElementById('sidebar').classList.add('show');
    document.getElementById('sidebarOverlay').classList.add('show');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
}

// ================================================================
// PAGE NAVIGATION (Day 4)
// ================================================================

function showPage(pageId, element) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update active nav link
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }

    // Update page title in navbar
    const pageTitles = {
        dashboard: 'Dashboard',
        products: 'Products',
        orders: 'Orders',
        customers: 'Customers',
        settings: 'Settings'
    };
    const iconMap = {
        dashboard: 'fa-th-large',
        products: 'fa-box',
        orders: 'fa-shopping-cart',
        customers: 'fa-users',
        settings: 'fa-cog'
    };
    const title = pageTitles[pageId] || 'Dashboard';
    const icon = iconMap[pageId] || 'fa-th-large';
    document.querySelector('.page-title').innerHTML = `<i class="fas ${icon}"></i> ${title}`;

    // Close sidebar on mobile
    closeSidebar();
}

// ================================================================
// NOTIFICATION TOGGLE (Day 5)
// ================================================================

function toggleNotification() {
    const toggle = document.getElementById('notificationToggle');
    toggle.classList.toggle('active');
}

// ================================================================
// INITIALIZE - Set Dashboard as default page
// ================================================================

// Ensure Dashboard is visible on load
document.addEventListener('DOMContentLoaded', function() {
    // Show dashboard page
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    const dashboardPage = document.getElementById('page-dashboard');
    if (dashboardPage) {
        dashboardPage.classList.add('active');
    }

    // Set dashboard link as active
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const dashboardLink = document.querySelector('.sidebar .nav-link[data-page="dashboard"]');
    if (dashboardLink) {
        dashboardLink.classList.add('active');
    }

    // Set dark mode toggle to inactive by default
    const darkToggle = document.getElementById('darkModeToggle');
    if (darkToggle) {
        darkToggle.classList.remove('active');
    }
});

console.log('🚀 SmartShop Dashboard loaded successfully!');
console.log('📊 Module 1 Complete!');