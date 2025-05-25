const themeSelect = document.getElementById('theme');

function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
}

const savedTheme = localStorage.getItem('theme') || 'light';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener('change', function() {
    const selectedTheme = this.value;
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
});
