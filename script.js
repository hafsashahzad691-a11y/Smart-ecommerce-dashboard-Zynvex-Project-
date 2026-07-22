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

console.log('🚀 SmartShop Dashboard loaded successfully!');