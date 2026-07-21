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

console.log('🚀 SmartShop Dashboard loaded successfully!');