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
            --bg: #ffffff;
            --text: #0f172a;
            --text-secondary: #475569;
            --card-bg: rgba(255, 255, 255, 0.95);
            --border: rgba(100, 116, 139, 0.2);
            --primary: #7c3aed;
            --primary-dark: #6d28d9;
            --success: #16a34a;
        }

        /* Light theme background - elegant gradient */
        [data-theme="light"] body {
            background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #ddd6fe 100%);
        }

        [data-theme="light"] body::before {
            background: 
                radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.12), transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.12), transparent 50%) !important;
        }

        [data-theme="light"] body::after {
            background-image: 
                linear-gradient(rgba(124, 58, 237, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124, 58, 237, 0.08) 1px, transparent 1px) !important;
        }

        /* Light theme card improvements */
        [data-theme="light"] .card,
        [data-theme="light"] .load-card-front,
        [data-theme="light"] .load-card-back,
        [data-theme="light"] .header,
        [data-theme="light"] .stats,
        [data-theme="light"] .filters {
            background: rgba(255, 255, 255, 0.85) !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(124, 58, 237, 0.15) !important;
            box-shadow: 0 4px 20px rgba(124, 58, 237, 0.08) !important;
        }

        /* Light theme text improvements */
        [data-theme="light"] h1,
        [data-theme="light"] h2,
        [data-theme="light"] h3,
        [data-theme="light"] .load-route-header,
        [data-theme="light"] .analysis-title {
            color: #0f172a !important;
        }

        [data-theme="light"] .detail-label,
        [data-theme="light"] .metric-label {
            color: #64748b !important;
        }

        [data-theme="light"] .detail-item,
        [data-theme="light"] .metric-value,
        [data-theme="light"] .route-text {
            color: #1e293b !important;
        }

        /* Light theme buttons and badges */
        [data-theme="light"] .equipment-badge {
            background: rgba(124, 58, 237, 0.15) !important;
            border: 1px solid rgba(124, 58, 237, 0.3) !important;
            color: #7c3aed !important;
        }

        [data-theme="light"] .status-badge {
            background: rgba(22, 163, 74, 0.15) !important;
            border: 1px solid rgba(22, 163, 74, 0.3) !important;
            color: #16a34a !important;
        }

        [data-theme="light"] .back-btn,
        [data-theme="light"] button[type="submit"],
        [data-theme="light"] .btn-primary {
            background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
            color: white !important;
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3) !important;
        }

        [data-theme="light"] .back-btn:hover,
        [data-theme="light"] button[type="submit"]:hover,
        [data-theme="light"] .btn-primary:hover {
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4) !important;
        }

        /* Light theme load rate */
        [data-theme="light"] .load-rate {
            color: #16a34a !important;
        }

        /* Light theme scrollbar */
        [data-theme="light"] ::-webkit-scrollbar-track {
            background: rgba(124, 58, 237, 0.05) !important;
        }

        [data-theme="light"] ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
        }

        /* Light theme recommendation boxes */
        [data-theme="light"] .recommendation {
            background: rgba(124, 58, 237, 0.08) !important;
            border: 1px solid rgba(124, 58, 237, 0.25) !important;
            color: #1e293b !important;
        }

        [data-theme="light"] .recommendation.positive {
            background: rgba(22, 163, 74, 0.08) !important;
            border-color: rgba(22, 163, 74, 0.25) !important;
        }

        [data-theme="light"] .recommendation.negative {
            background: rgba(239, 68, 68, 0.08) !important;
            border-color: rgba(239, 68, 68, 0.25) !important;
        }

        /* Light theme inputs */
        [data-theme="light"] input,
        [data-theme="light"] select,
        [data-theme="light"] textarea {
            background: rgba(255, 255, 255, 0.9) !important;
            border: 1px solid rgba(124, 58, 237, 0.2) !important;
            color: #0f172a !important;
        }

        [data-theme="light"] input::placeholder {
            color: #94a3b8 !important;
        }

        /* Light theme hover effects */
        [data-theme="light"] .load-card:hover .load-card-front {
            background: rgba(255, 255, 255, 0.95) !important;
            border-color: rgba(124, 58, 237, 0.3) !important;
            box-shadow: 0 12px 40px rgba(124, 58, 237, 0.15) !important;
        }

        /* Light theme stat numbers */
        [data-theme="light"] .stat-box .number {
            background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
        }

        /* Light theme module cards */
        [data-theme="light"] .module-card,
        [data-theme="light"] .test-card {
            background: rgba(255, 255, 255, 0.85) !important;
            border: 1px solid rgba(124, 58, 237, 0.15) !important;
            box-shadow: 0 4px 20px rgba(124, 58, 237, 0.08) !important;
        }

        [data-theme="light"] .module-card:hover,
        [data-theme="light"] .test-card:hover {
            border-color: rgba(124, 58, 237, 0.3) !important;
            box-shadow: 0 8px 30px rgba(124, 58, 237, 0.15) !important;
        }

        /* Light theme progress bars */
        [data-theme="light"] .progress-bar {
            background: rgba(124, 58, 237, 0.1) !important;
        }

        [data-theme="light"] .progress-fill {
            background: linear-gradient(90deg, #7c3aed, #6d28d9) !important;
        }

        /* Light theme rating bar */
        [data-theme="light"] .rating-bar {
            background: rgba(124, 58, 237, 0.1) !important;
        }

        [data-theme="light"] .rating-fill {
            background: linear-gradient(90deg, #7c3aed, #6d28d9) !important;
        }

        /* Theme Toggle Button */
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

        [data-theme="light"] #themeToggle {
            box-shadow: 0 4px 16px rgba(124, 58, 237, 0.2);
        }

        [data-theme="light"] #themeToggle:hover {
            box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
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
