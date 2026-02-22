// Universal Theme Switcher for all pages
(function() {
    // Add theme toggle button styles
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --bg: #070b14;
            --text: #f0f4ff;
            --text-secondary: #8892aa;
            --card-bg: rgba(255, 255, 255, 0.03);
            --border: rgba(255, 255, 255, 0.1);
            --primary: #8b5cf6;
            --primary-dark: #7c3aed;
            --success: #22c55e;
        }

        [data-theme="light"] {
            --bg: #f5f7fa;
            --text: #1a202c;
            --text-secondary: #4a5568;
            --card-bg: rgba(255, 255, 255, 0.9);
            --border: rgba(0, 0, 0, 0.1);
            --primary: #8b5cf6;
            --primary-dark: #7c3aed;
            --success: #22c55e;
        }

        [data-theme="light"] body::before {
            background: 
                radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.08), transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.08), transparent 50%) !important;
        }

        [data-theme="light"] body::after {
            background-image: 
                linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px) !important;
        }

        #themeToggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            width: 50px;
            height: 50px;
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border);
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        #themeToggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.3);
        }

        @media (max-width: 768px) {
            #themeToggle {
                width: 45px;
                height: 45px;
                top: 15px;
                right: 15px;
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);

    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);

    const html = document.documentElement;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        html.setAttribute('data-theme', 'light');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'light') {
            html.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            html.setAttribute('data-theme', 'light');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
})();
