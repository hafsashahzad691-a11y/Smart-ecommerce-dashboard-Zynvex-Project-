

function toggleTheme() {
    document.body.classList.toggle('light-mode');

    const icon = document.querySelector('.theme-toggle');

    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun theme-toggle';
    } else {
        icon.className = 'fas fa-moon theme-toggle';
    }
}

console.log('🚀 Smart E-Commerce Dashboard loaded successfully!');