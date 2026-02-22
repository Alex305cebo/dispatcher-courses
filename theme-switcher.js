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
            --bg: #fafbfc;
            --text: #1a1f36;
            --text-secondary: #697386;
            --card-bg: #ffffff;
            --border: rgba(0, 0, 0, 0.08);
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --success: #10b981;
        }

        /* Modern Light Theme - Clean & Minimal */
        [data-theme="light"] body {
            background: linear-gradient(180deg, #fafbfc 0%, #f3f4f6 100%);
        }

        [data-theme="light"] body::before {
            background: 
                radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.06), transparent 40%),
                radial-gradient(circle at 85% 80%, rgba(139, 92, 246, 0.06), transparent 40%) !important;
        }

        [data-theme="light"] body::after {
            background-image: 
                linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px) !important;
            opacity: 0.5;
        }

        /* Cards - Clean white with subtle shadows */
        [data-theme="light"] .card,
        [data-theme="light"] .load-card-front,
        [data-theme="light"] .load-card-back,
        [data-theme="light"] .header,
        [data-theme="light"] .stats,
        [data-theme="light"] .filters,
        [data-theme="light"] .module-card,
        [data-theme="light"] .test-card {
            background: #ffffff !important;
            backdrop-filter: none !important;
            border: 1px solid rgba(0, 0, 0, 0.06) !important;
            box-shadow: 
                0 1px 3px rgba(0, 0, 0, 0.05),
                0 1px 2px rgba(0, 0, 0, 0.03) !important;
        }

        [data-theme="light"] .load-card:hover .load-card-front,
        [data-theme="light"] .module-card:hover,
        [data-theme="light"] .test-card:hover {
            border-color: rgba(99, 102, 241, 0.2) !important;
            box-shadow: 
                0 4px 12px rgba(99, 102, 241, 0.08),
                0 2px 4px rgba(0, 0, 0, 0.04) !important;
            transform: translateY(-2px);
        }

        /* Typography - Perfect readability */
        [data-theme="light"] h1,
        [data-theme="light"] h2,
        [data-theme="light"] h3,
        [data-theme="light"] .load-route-header,
        [data-theme="light"] .analysis-title {
            color: #1a1f36 !important;
            font-weight: 700 !important;
        }

        [data-theme="light"] .detail-label,
        [data-theme="light"] .metric-label,
        [data-theme="light"] .stat-box .label {
            color: #697386 !important;
            font-weight: 500 !important;
        }

        [data-theme="light"] .detail-item,
        [data-theme="light"] .metric-value,
        [data-theme="light"] .route-text,
        [data-theme="light"] p {
            color: #3c4257 !important;
            font-weight: 400 !important;
        }

        /* Buttons - Modern flat design */
        [data-theme="light"] .back-btn,
        [data-theme="light"] button[type="submit"],
        [data-theme="light"] .btn-primary,
        [data-theme="light"] .module-btn,
        [data-theme="light"] .test-btn {
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
            color: white !important;
            border: none !important;
            box-shadow: 
                0 2px 8px rgba(99, 102, 241, 0.2),
                0 1px 2px rgba(0, 0, 0, 0.05) !important;
            font-weight: 600 !important;
        }

        [data-theme="light"] .back-btn:hover,
        [data-theme="light"] button[type="submit"]:hover,
        [data-theme="light"] .btn-primary:hover,
        [data-theme="light"] .module-btn:hover,
        [data-theme="light"] .test-btn:hover {
            box-shadow: 
                0 4px 16px rgba(99, 102, 241, 0.3),
                0 2px 4px rgba(0, 0, 0, 0.08) !important;
            transform: translateY(-1px) !important;
        }

        /* Badges - Soft colors */
        [data-theme="light"] .equipment-badge {
            background: #eef2ff !important;
            border: 1px solid #c7d2fe !important;
            color: #4f46e5 !important;
            font-weight: 600 !important;
        }

        [data-theme="light"] .status-badge {
            background: #d1fae5 !important;
            border: 1px solid #6ee7b7 !important;
            color: #059669 !important;
            font-weight: 600 !important;
        }

        /* Load rate - Vibrant green */
        [data-theme="light"] .load-rate {
            color: #10b981 !important;
            font-weight: 800 !important;
        }

        /* Stats numbers - Gradient text */
        [data-theme="light"] .stat-box .number {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            font-weight: 900 !important;
        }

        /* Inputs - Clean borders */
        [data-theme="light"] input,
        [data-theme="light"] select,
        [data-theme="light"] textarea {
            background: #ffffff !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            color: #1a1f36 !important;
            transition: all 0.2s ease !important;
        }

        [data-theme="light"] input:focus,
        [data-theme="light"] select:focus,
        [data-theme="light"] textarea:focus {
            border-color: #6366f1 !important;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
            outline: none !important;
        }

        [data-theme="light"] input::placeholder {
            color: #9ca3af !important;
        }

        /* Progress & Rating bars */
        [data-theme="light"] .progress-bar,
        [data-theme="light"] .rating-bar {
            background: #e5e7eb !important;
            border-radius: 999px !important;
        }

        [data-theme="light"] .progress-fill,
        [data-theme="light"] .rating-fill {
            background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%) !important;
            border-radius: 999px !important;
        }

        /* Recommendations - Soft backgrounds */
        [data-theme="light"] .recommendation {
            background: #f5f3ff !important;
            border: 1px solid #e9d5ff !important;
            color: #1a1f36 !important;
        }

        [data-theme="light"] .recommendation.positive {
            background: #ecfdf5 !important;
            border-color: #a7f3d0 !important;
        }

        [data-theme="light"] .recommendation.negative {
            background: #fef2f2 !important;
            border-color: #fecaca !important;
        }

        /* Scrollbar - Minimal */
        [data-theme="light"] ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        [data-theme="light"] ::-webkit-scrollbar-track {
            background: #f3f4f6 !important;
        }

        [data-theme="light"] ::-webkit-scrollbar-thumb {
            background: #d1d5db !important;
            border-radius: 4px !important;
        }

        [data-theme="light"] ::-webkit-scrollbar-thumb:hover {
            background: #9ca3af !important;
        }

        /* Module cards - Special styling */
        [data-theme="light"] .module-card h3,
        [data-theme="light"] .test-card h3 {
            color: #1a1f36 !important;
            font-weight: 700 !important;
        }

        [data-theme="light"] .module-card p,
        [data-theme="light"] .test-card p {
            color: #697386 !important;
        }

        /* Load route background */
        [data-theme="light"] .load-route {
            background: #f9fafb !important;
            border: 1px solid rgba(0, 0, 0, 0.05) !important;
        }

        /* Company info block */
        [data-theme="light"] .load-card-front > div[style*="background: rgba(139, 92, 246"] {
            background: #f5f3ff !important;
            border-left: 2px solid #6366f1 !important;
        }

        /* Contact info block */
        [data-theme="light"] .load-card-front > div[style*="background: rgba(59, 130, 246"] {
            background: #eff6ff !important;
            border-left: 2px solid #3b82f6 !important;
        }

        /* Analysis sections */
        [data-theme="light"] .analysis-section {
            border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
        }

        /* Metric rows */
        [data-theme="light"] .metric-row {
            border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
        }

        /* Theme Toggle Button - Modern style */
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
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 
                0 2px 8px rgba(0, 0, 0, 0.08),
                0 1px 2px rgba(0, 0, 0, 0.04);
        }

        [data-theme="light"] #themeToggle:hover {
            box-shadow: 
                0 4px 16px rgba(99, 102, 241, 0.15),
                0 2px 4px rgba(0, 0, 0, 0.08);
            transform: scale(1.1);
        }

        /* Smooth transitions for theme switch */
        [data-theme="light"] * {
            transition: background-color 0.3s ease, 
                        border-color 0.3s ease, 
                        color 0.3s ease,
                        box-shadow 0.3s ease !important;
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
    
    // Toggle theme on click with smooth transition
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
