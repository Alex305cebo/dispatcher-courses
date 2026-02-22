// Universal Theme Switcher for all pages
(function() {
    // Detect page type and add data attribute
    const path = window.location.pathname;
    const body = document.body;
    
    if (path.includes('loadboard')) {
        body.setAttribute('data-page', 'loadboard');
    } else if (path.includes('module')) {
        body.setAttribute('data-page', 'modules');
    } else if (path.includes('simulator')) {
        body.setAttribute('data-page', 'simulator');
    } else if (path.includes('test')) {
        body.setAttribute('data-page', 'testing');
    } else if (path.includes('documentation')) {
        body.setAttribute('data-page', 'documentation');
    } else if (path.includes('cases')) {
        body.setAttribute('data-page', 'cases');
    } else {
        body.setAttribute('data-page', 'home');
    }

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

        /* Modern Light Theme - Professional animated background */
        [data-theme="light"] body {
            background: linear-gradient(135deg, #d8dce8 0%, #cfd4e3 100%);
            position: relative;
        }

        /* Animated gradient overlay */
        [data-theme="light"] body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            background: 
                radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.12), transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.12), transparent 50%);
            animation: gradientShift 20s ease-in-out infinite;
        }

        @keyframes gradientShift {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            50% {
                transform: translate(-5%, 5%) scale(1.08);
                opacity: 0.85;
            }
        }

        [data-theme="light"] body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 1;
            pointer-events: none;
        }

        /* Home - Floating dots */
        [data-theme="light"] body[data-page="home"]::after {
            background-color: transparent;
            background-image: 
                radial-gradient(circle, rgba(99, 102, 241, 0.25) 3px, transparent 3px),
                radial-gradient(circle, rgba(139, 92, 246, 0.18) 2px, transparent 2px),
                radial-gradient(circle, rgba(59, 130, 246, 0.15) 2.5px, transparent 2.5px);
            background-size: 60px 60px, 40px 40px, 80px 80px;
            background-position: 0 0, 20px 20px, 40px 40px;
            animation: floatPattern 25s linear infinite;
        }

        @keyframes floatPattern {
            0% {
                background-position: 0 0, 20px 20px, 40px 40px;
            }
            100% {
                background-position: 60px 60px, 80px 80px, 120px 120px;
            }
        }

        /* Load Board - Sliding hexagons */
        [data-theme="light"] body[data-page="loadboard"]::after {
            background-color: transparent;
            background-image: 
                linear-gradient(30deg, rgba(99, 102, 241, 0.18) 12%, transparent 12.5%, transparent 87%, rgba(99, 102, 241, 0.18) 87.5%),
                linear-gradient(150deg, rgba(99, 102, 241, 0.18) 12%, transparent 12.5%, transparent 87%, rgba(99, 102, 241, 0.18) 87.5%),
                linear-gradient(30deg, rgba(139, 92, 246, 0.14) 12%, transparent 12.5%, transparent 87%, rgba(139, 92, 246, 0.14) 87.5%),
                linear-gradient(150deg, rgba(139, 92, 246, 0.14) 12%, transparent 12.5%, transparent 87%, rgba(139, 92, 246, 0.14) 87.5%);
            background-size: 100px 175px;
            background-position: 0 0, 0 0, 50px 87.5px, 50px 87.5px;
            animation: slideHexagons 35s linear infinite;
        }

        @keyframes slideHexagons {
            0% {
                background-position: 0 0, 0 0, 50px 87.5px, 50px 87.5px;
            }
            100% {
                background-position: 100px 175px, 100px 175px, 150px 262.5px, 150px 262.5px;
            }
        }

        /* Modules - Diagonal wave */
        [data-theme="light"] body[data-page="modules"]::after {
            background-color: transparent;
            background-image: 
                repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 30px,
                    rgba(99, 102, 241, 0.15) 30px,
                    rgba(99, 102, 241, 0.15) 33px,
                    transparent 33px,
                    transparent 60px,
                    rgba(139, 92, 246, 0.12) 60px,
                    rgba(139, 92, 246, 0.12) 63px
                );
            animation: diagonalSlide 22s linear infinite;
        }

        @keyframes diagonalSlide {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 63px 63px;
            }
        }

        /* Simulator - Pulsing grid */
        [data-theme="light"] body[data-page="simulator"]::after {
            background-color: transparent;
            background-image: 
                linear-gradient(rgba(99, 102, 241, 0.2) 2.5px, transparent 2.5px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.2) 2.5px, transparent 2.5px),
                linear-gradient(rgba(139, 92, 246, 0.12) 1.5px, transparent 1.5px),
                linear-gradient(90deg, rgba(139, 92, 246, 0.12) 1.5px, transparent 1.5px);
            background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
            animation: pulseGrid 12s ease-in-out infinite;
        }

        @keyframes pulseGrid {
            0%, 100% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.75;
                transform: scale(1.03);
            }
        }

        /* Testing - Moving graph paper */
        [data-theme="light"] body[data-page="testing"]::after {
            background-color: transparent;
            background-image: 
                linear-gradient(rgba(99, 102, 241, 0.2) 2.5px, transparent 2.5px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.2) 2.5px, transparent 2.5px),
                linear-gradient(rgba(99, 102, 241, 0.1) 1.5px, transparent 1.5px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1.5px, transparent 1.5px);
            background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
            animation: moveGraph 28s linear infinite;
        }

        @keyframes moveGraph {
            0% {
                background-position: 0 0, 0 0, 0 0, 0 0;
            }
            100% {
                background-position: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
            }
        }

        /* Documentation - Rotating blueprint */
        [data-theme="light"] body[data-page="documentation"]::after {
            background-color: transparent;
            background-image: 
                linear-gradient(45deg, rgba(99, 102, 241, 0.15) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(99, 102, 241, 0.15) 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, rgba(139, 92, 246, 0.15) 75%),
                linear-gradient(-45deg, transparent 75%, rgba(139, 92, 246, 0.15) 75%);
            background-size: 80px 80px;
            background-position: 0 0, 0 40px, 40px -40px, -40px 0px;
            animation: rotateBlueprint 30s linear infinite;
        }

        @keyframes rotateBlueprint {
            0% {
                background-position: 0 0, 0 40px, 40px -40px, -40px 0px;
            }
            100% {
                background-position: 80px 80px, 80px 120px, 120px 40px, 40px 80px;
            }
        }

        /* Cases - Bouncing dots */
        [data-theme="light"] body[data-page="cases"]::after {
            background-color: transparent;
            background-image: 
                radial-gradient(circle, rgba(99, 102, 241, 0.22) 18%, transparent 18%),
                radial-gradient(circle, rgba(139, 92, 246, 0.18) 15%, transparent 15%),
                radial-gradient(circle, rgba(59, 130, 246, 0.15) 12%, transparent 12%);
            background-size: 70px 70px, 90px 90px, 110px 110px;
            background-position: 0 0, 35px 35px, 55px 55px;
            animation: bounceDots 18s ease-in-out infinite;
        }

        @keyframes bounceDots {
            0%, 100% {
                background-position: 0 0, 35px 35px, 55px 55px;
                opacity: 1;
            }
            50% {
                background-position: 12px 12px, 47px 47px, 67px 67px;
                opacity: 0.85;
            }
        }

        /* Cards - Apple-style elevated cards */
        [data-theme="light"] .card,
        [data-theme="light"] .load-card-front,
        [data-theme="light"] .load-card-back,
        [data-theme="light"] .module-card,
        [data-theme="light"] .test-card {
            background: #ffffff !important;
            backdrop-filter: none !important;
            border: 1px solid rgba(0, 0, 0, 0.04) !important;
            box-shadow: 
                0 2px 8px rgba(0, 0, 0, 0.04),
                0 1px 4px rgba(0, 0, 0, 0.02),
                0 0 1px rgba(0, 0, 0, 0.04) !important;
        }

        /* Header and Stats - More prominent shadows */
        [data-theme="light"] .header,
        [data-theme="light"] .stats,
        [data-theme="light"] .filters {
            background: #ffffff !important;
            backdrop-filter: none !important;
            border: 1px solid rgba(0, 0, 0, 0.06) !important;
            box-shadow: 
                0 4px 16px rgba(0, 0, 0, 0.06),
                0 2px 8px rgba(0, 0, 0, 0.03),
                0 1px 4px rgba(0, 0, 0, 0.02) !important;
        }

        [data-theme="light"] .load-card:hover .load-card-front,
        [data-theme="light"] .module-card:hover,
        [data-theme="light"] .test-card:hover {
            border-color: rgba(99, 102, 241, 0.12) !important;
            box-shadow: 
                0 8px 24px rgba(99, 102, 241, 0.06),
                0 4px 12px rgba(0, 0, 0, 0.04),
                0 2px 6px rgba(0, 0, 0, 0.02),
                0 0 1px rgba(99, 102, 241, 0.12) !important;
            transform: translateY(-4px) scale(1.01);
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

        /* Buttons - Material Design elevated buttons */
        [data-theme="light"] .back-btn,
        [data-theme="light"] button[type="submit"],
        [data-theme="light"] .btn-primary,
        [data-theme="light"] .module-btn,
        [data-theme="light"] .test-btn {
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%) !important;
            color: white !important;
            border: none !important;
            box-shadow: 
                0 4px 12px rgba(99, 102, 241, 0.25),
                0 2px 6px rgba(99, 102, 241, 0.15),
                0 1px 3px rgba(0, 0, 0, 0.08) !important;
            font-weight: 600 !important;
        }

        [data-theme="light"] .back-btn:hover,
        [data-theme="light"] button[type="submit"]:hover,
        [data-theme="light"] .btn-primary:hover,
        [data-theme="light"] .module-btn:hover,
        [data-theme="light"] .test-btn:hover {
            box-shadow: 
                0 8px 24px rgba(99, 102, 241, 0.35),
                0 4px 12px rgba(99, 102, 241, 0.2),
                0 2px 6px rgba(0, 0, 0, 0.1) !important;
            transform: translateY(-2px) scale(1.02) !important;
        }

        [data-theme="light"] .back-btn:active,
        [data-theme="light"] button[type="submit"]:active,
        [data-theme="light"] .btn-primary:active {
            box-shadow: 
                0 2px 8px rgba(99, 102, 241, 0.2),
                0 1px 4px rgba(0, 0, 0, 0.08) !important;
            transform: translateY(0) scale(0.98) !important;
        }

        /* Badges - Soft elevated style */
        [data-theme="light"] .equipment-badge {
            background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%) !important;
            border: 1px solid rgba(99, 102, 241, 0.15) !important;
            color: #4f46e5 !important;
            font-weight: 600 !important;
            box-shadow: 
                0 1px 3px rgba(99, 102, 241, 0.08),
                0 1px 2px rgba(0, 0, 0, 0.02) !important;
        }

        [data-theme="light"] .status-badge {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%) !important;
            border: 1px solid rgba(16, 185, 129, 0.2) !important;
            color: #059669 !important;
            font-weight: 600 !important;
            box-shadow: 
                0 1px 3px rgba(16, 185, 129, 0.08),
                0 1px 2px rgba(0, 0, 0, 0.02) !important;
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

        /* Inputs - Material Design style */
        [data-theme="light"] input,
        [data-theme="light"] select,
        [data-theme="light"] textarea {
            background: #ffffff !important;
            border: 1px solid rgba(0, 0, 0, 0.12) !important;
            color: #1a1f36 !important;
            transition: all 0.2s ease !important;
            box-shadow: 
                0 1px 3px rgba(0, 0, 0, 0.04),
                0 1px 2px rgba(0, 0, 0, 0.02) !important;
        }

        [data-theme="light"] input:focus,
        [data-theme="light"] select:focus,
        [data-theme="light"] textarea:focus {
            border-color: #6366f1 !important;
            box-shadow: 
                0 0 0 4px rgba(99, 102, 241, 0.1),
                0 2px 8px rgba(99, 102, 241, 0.15),
                0 1px 4px rgba(0, 0, 0, 0.04) !important;
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
            border: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 
                0 4px 16px rgba(0, 0, 0, 0.08),
                0 2px 8px rgba(0, 0, 0, 0.04),
                0 1px 4px rgba(0, 0, 0, 0.02);
        }

        [data-theme="light"] #themeToggle:hover {
            box-shadow: 
                0 8px 24px rgba(99, 102, 241, 0.2),
                0 4px 12px rgba(99, 102, 241, 0.12),
                0 2px 6px rgba(0, 0, 0, 0.06);
            transform: scale(1.1) translateY(-2px);
        }

        [data-theme="light"] #themeToggle:active {
            box-shadow: 
                0 2px 8px rgba(99, 102, 241, 0.15),
                0 1px 4px rgba(0, 0, 0, 0.04);
            transform: scale(1.05) translateY(0);
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
