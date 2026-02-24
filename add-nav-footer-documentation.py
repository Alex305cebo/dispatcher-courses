# -*- coding: utf-8 -*-

nav_buttons = """
<!-- Navigation Buttons -->
<div style="position: fixed; top: 20px; right: 200px; z-index: 1000; display: flex; gap: 12px;">
  <a href="../course.html" class="btn btn-header" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); font-weight: 600; display: flex; align-items: center; gap: 8px; padding: 10px 18px; text-decoration: none; color: white; border-radius: 12px; transition: all 0.3s ease;">
    <span style="font-size: 18px;">←</span>
    <span style="font-size: 14px;">Назад</span>
  </a>
  <a href="../index.html" class="btn btn-header" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); font-weight: 600; display: flex; align-items: center; gap: 8px; padding: 10px 18px; text-decoration: none; color: white; border-radius: 12px; transition: all 0.3s ease;">
    <span style="font-size: 18px;">🏠</span>
    <span style="font-size: 14px;">Главная</span>
  </a>
</div>

"""

footer_css = """
/* Footer */
.footer {
  padding: 80px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 80px;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  margin-bottom: 48px;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 568px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer .container {
    padding: 0 20px;
  }
}

.footer-section h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #f1f5f9;
}

.footer-section p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.7;
}

.footer-section a {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.footer-section a:hover {
  color: #6366f1;
  transform: translateX(4px);
}

.footer-bottom {
  text-align: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #64748b;
  font-size: 14px;
}
"""

footer_html = """
<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h4>Курсы Диспетчера</h4>
        <p>Профессиональное обучение диспетчеров грузоперевозок</p>
      </div>
      
      <div class="footer-section">
        <h4>Обучение</h4>
        <a href="../courses.html">Курсы</a>
        <a href="../certification.html">Сертификация</a>
        <a href="../webinars.html">Вебинары</a>
      </div>
      
      <div class="footer-section">
        <h4>Поддержка</h4>
        <a href="../faq.html">FAQ</a>
        <a href="../contacts.html">Контакты</a>
        <a href="../help.html">Помощь</a>
      </div>
      
      <div class="footer-section">
        <h4>Компания</h4>
        <a href="../about.html">О нас</a>
        <a href="../blog.html">Блог</a>
        <a href="../career.html">Карьера</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 Курсы Диспетчера. Все права защищены.</p>
    </div>
  </div>
</footer>
"""

try:
    with open('pages/documentation.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add navigation buttons after <body>
    if '<body>' in content and 'Navigation Buttons' not in content:
        content = content.replace('<body>', f'<body>\n{nav_buttons}')
        print('Navigation buttons added')
    
    # Add CSS before </style>
    if '</style>' in content and '/* Footer */' not in content:
        content = content.replace('</style>', f'{footer_css}\n</style>')
        print('Footer CSS added')
    
    # Add HTML footer before </body>
    if '<footer' not in content:
        content = content.replace('</body>', f'{footer_html}\n</body>')
        print('Footer HTML added')
    
    with open('pages/documentation.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('Done! Navigation and footer added to documentation.html')
except Exception as e:
    print(f'Error: {e}')
