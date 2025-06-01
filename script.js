class ThemeToggle {
    constructor() {
        this.toggleBtn = document.getElementById('theme-toggle-btn');
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener to toggle button
        this.toggleBtn.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        this.watchSystemTheme();

        // Add keyboard support
        this.toggleBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    storeTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.updateToggleButton(theme);
        this.storeTheme(theme);
    }

    updateToggleButton(theme) {
        const icon = this.toggleBtn.querySelector('.toggle-icon');
        
        if (theme === 'dark') {
            this.toggleBtn.setAttribute('aria-label', 'Switch to light mode');
            icon.style.transform = 'translateX(28px)';
        } else {
            this.toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            icon.style.transform = 'translateX(0)';
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Optional: Add a subtle animation effect
        this.animateToggle();
    }

    animateToggle() {
        document.body.style.transition = 'none';
        
        // Force a reflow
        document.body.offsetHeight;
        
        // Re-enable transitions
        setTimeout(() => {
            document.body.style.transition = '';
        }, 50);
    }

    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!this.getStoredTheme()) {
                const systemTheme = e.matches ? 'dark' : 'light';
                this.setTheme(systemTheme);
            }
        });
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});

// Optional: Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Optional: Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
