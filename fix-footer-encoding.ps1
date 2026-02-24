# Fix footer encoding and styling

$correctFooter = @"

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
"@

for ($i = 1; $i -le 12; $i++) {
    $file = "pages/module-$i.html"
    
    if (Test-Path $file) {
        Write-Host "Fixing $file..."
        
        $content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)
        
        # Remove old footer
        $content = $content -replace '(?s)<!-- Footer -->.*?</footer>', ''
        
        # Add correct footer before </body>
        $content = $content -replace '(</body>)', "$correctFooter`r`n`$1"
        
        [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  Fixed!"
    }
}

Write-Host "Done!"
