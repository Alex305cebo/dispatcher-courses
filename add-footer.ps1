# Скрипт для добавления footer на все страницы в папке pages

$footerHTML = @'
<!-- Footer -->
<footer class="footer" style="margin-top: 60px; padding: 40px 20px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-top: 1px solid rgba(255,255,255,0.1);">
  <div style="max-width: 1200px; margin: 0 auto;">
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin-bottom: 30px;">
      <div>
        <h4 style="color: #fff; font-size: 18px; margin-bottom: 15px; font-weight: 700;">Курсы Диспетчера</h4>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">Профессиональное обучение диспетчеров грузоперевозок</p>
      </div>
      
      <div>
        <h4 style="color: #fff; font-size: 18px; margin-bottom: 15px; font-weight: 700;">Обучение</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="../courses.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Курсы</a>
          <a href="../certification.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Сертификация</a>
          <a href="../webinars.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Вебинары</a>
        </div>
      </div>
      
      <div>
        <h4 style="color: #fff; font-size: 18px; margin-bottom: 15px; font-weight: 700;">Поддержка</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="../faq.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">FAQ</a>
          <a href="../contacts.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Контакты</a>
          <a href="../help.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Помощь</a>
        </div>
      </div>
      
      <div>
        <h4 style="color: #fff; font-size: 18px; margin-bottom: 15px; font-weight: 700;">Компания</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="../about.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">О нас</a>
          <a href="../blog.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Блог</a>
          <a href="../career.html" style="color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.3s;">Карьера</a>
        </div>
      </div>
    </div>
    
    <div style="text-align: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1);">
      <p style="color: #64748b; font-size: 14px;">&copy; 2024 Курсы Диспетчера. Все права защищены.</p>
    </div>
  </div>
</footer>
'@

$files = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Проверяем есть ли уже footer
    if ($content -match '<footer') {
        Write-Host "Пропущен (уже есть footer): $($file.Name)" -ForegroundColor Yellow
        continue
    }
    
    # Добавляем footer перед закрывающим </body>
    $newContent = $content -replace '</body>', "$footerHTML`n</body>"
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Добавлен footer: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nГотово! Footer добавлен на все страницы." -ForegroundColor Cyan
