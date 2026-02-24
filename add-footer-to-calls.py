# -*- coding: utf-8 -*-

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
    with open('pages/calls.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add CSS before </style>
    if '</style>' in content and '/* Footer */' not in content:
        content = content.replace('</style>', f'{footer_css}\n</style>')
        print('CSS added')
    
    # Add HTML footer before </body>
    if '<footer' not in content:
        content = content.replace('</body>', f'{footer_html}\n</body>')
        print('Footer HTML added')
    
    with open('pages/calls.html', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print('Done! Footer added to calls.html')
except Exception as e:
    print(f'Error: {e}')
