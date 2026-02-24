# -*- coding: utf-8 -*-
import re
import glob

footer_html = """
<!-- Footer -->
<footer class="footer">
  <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
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

# Process all module files
for i in range(1, 13):
    filename = f'pages/module-{i}.html'
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old footer
        content = re.sub(r'<!-- Footer -->.*?</footer>', '', content, flags=re.DOTALL)
        
        # Add new footer before </body>
        content = content.replace('</body>', f'{footer_html}\n</body>')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Fixed {filename}')
    except Exception as e:
        print(f'Error with {filename}: {e}')

print('Done!')
