# Add footer to all module pages

$footerHTML = @'

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
        <a href="courses.html">Курсы</a>
        <a href="certification.html">Сертификация</a>
        <a href="webinars.html">Вебинары</a>
      </div>
      
      <div class="footer-section">
        <h4>Поддержка</h4>
        <a href="faq.html">FAQ</a>
        <a href="contacts.html">Контакты</a>
        <a href="help.html">Помощь</a>
      </div>
      
      <div class="footer-section">
        <h4>Компания</h4>
        <a href="about.html">О нас</a>
        <a href="blog.html">Блог</a>
        <a href="career.html">Карьера</a>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2024 Курсы Диспетчера. Все права защищены.</p>
    </div>
  </div>
</footer>
'@

$footerCSS = @'

/* Footer */
.footer {
  padding: 80px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 80px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
  margin-bottom: 48px;
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
'@

for ($i = 1; $i -le 12; $i++) {
    $file = "pages/module-$i.html"
    
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        
        $content = Get-Content $file -Raw -Encoding UTF8
        
        if ($content -match '<footer') {
            Write-Host "  Footer already exists, skipping"
            continue
        }
        
        $hasFooterCSS = $content -match '\.footer\s*\{'
        
        if (-not $hasFooterCSS) {
            $content = $content -replace '(</style>)', "$footerCSS`r`n`$1"
            Write-Host "  CSS added"
        }
        
        $content = $content -replace '(</body>)', "$footerHTML`r`n`$1"
        
        $content | Set-Content $file -Encoding UTF8 -NoNewline
        Write-Host "  Footer added successfully!"
    } else {
        Write-Host "File $file not found"
    }
}

Write-Host "Done! Footer added to all modules."
