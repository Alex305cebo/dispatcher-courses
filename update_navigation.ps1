# Скрипт для обновления навигации на всех страницах

$oldNav = '<style>.global-nav{background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);padding:15px 0;box-shadow:0 4px 20px rgba(0,0,0,0.3);position:sticky;top:0;z-index:1000}.global-nav-container{max-width:1600px;margin:0 auto;padding:0 20px;display:flex;justify-content:center;align-items:center;gap:20px;flex-wrap:wrap}.nav-logo{font-size:24px;font-weight:800;color:white;text-decoration:none;display:flex;align-items:center;gap:10px;transition:all 0.3s}.nav-logo:hover{transform:scale(1.05)}.nav-links{display:flex;gap:12px;flex-wrap:wrap;align-items:center}.nav-btn{padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.3s;display:flex;align-items:center;gap:6px;border:2px solid transparent}.nav-btn-primary{background:linear-gradient(135deg,#3b82f6,#2563eb);color:white}.nav-btn-primary:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(59,130,246,0.4)}.nav-btn-success{background:linear-gradient(135deg,#16a34a,#15803d);color:white}.nav-btn-success:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(22,163,74,0.4)}.nav-btn-warning{background:linear-gradient(135deg,#f59e0b,#d97706);color:white}.nav-btn-warning:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(245,158,11,0.4)}.nav-btn-secondary{background:rgba(255,255,255,0.1);color:white;border-color:rgba(255,255,255,0.2)}.nav-btn-secondary:hover{background:rgba(255,255,255,0.2);border-color:rgba(255,255,255,0.4)}@media (max-width:768px){.global-nav-container{flex-direction:column;gap:15px}.nav-links{width:100%;justify-content:center}.nav-btn{font-size:13px;padding:8px 14px}}</style>'

$newNav = '<style>.global-nav{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:20px 0;box-shadow:0 8px 32px rgba(102,126,234,0.4);position:sticky;top:0;z-index:1000;border-bottom:3px solid rgba(255,255,255,0.2)}.global-nav-container{max-width:1200px;margin:0 auto;padding:0 20px;display:flex;justify-content:center;align-items:center;gap:15px;flex-wrap:wrap}.nav-logo{font-size:28px;font-weight:900;color:white;text-decoration:none;display:flex;align-items:center;gap:12px;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);text-shadow:0 2px 10px rgba(0,0,0,0.3);letter-spacing:0.5px}.nav-logo:hover{transform:scale(1.08) rotate(-2deg);text-shadow:0 4px 20px rgba(255,255,255,0.5)}.nav-links{display:flex;gap:15px;flex-wrap:wrap;align-items:center;justify-content:center}.nav-btn{padding:14px 28px;border-radius:50px;text-decoration:none;font-weight:700;font-size:15px;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275);display:flex;align-items:center;gap:8px;border:3px solid transparent;position:relative;overflow:hidden;text-transform:uppercase;letter-spacing:0.5px;box-shadow:0 4px 15px rgba(0,0,0,0.2)}.nav-btn::before{content:'+"''"+ ';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent);transition:left 0.5s}.nav-btn:hover::before{left:100%}.nav-btn-primary{background:linear-gradient(135deg,#3b82f6,#2563eb);color:white;border-color:rgba(255,255,255,0.3)}.nav-btn-primary:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 8px 25px rgba(59,130,246,0.5)}.nav-btn-success{background:linear-gradient(135deg,#16a34a,#15803d);color:white;border-color:rgba(255,255,255,0.3)}.nav-btn-success:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 8px 25px rgba(22,163,74,0.5)}.nav-btn-warning{background:linear-gradient(135deg,#f59e0b,#d97706);color:white;border-color:rgba(255,255,255,0.3)}.nav-btn-warning:hover{transform:translateY(-4px) scale(1.05);box-shadow:0 8px 25px rgba(245,158,11,0.5)}.nav-btn-secondary{background:rgba(255,255,255,0.25);color:white;border-color:rgba(255,255,255,0.4);backdrop-filter:blur(10px)}.nav-btn-secondary:hover{background:rgba(255,255,255,0.35);border-color:rgba(255,255,255,0.6);transform:translateY(-4px) scale(1.05);box-shadow:0 8px 25px rgba(255,255,255,0.3)}@media (max-width:768px){.global-nav{padding:15px 0}.global-nav-container{flex-direction:column;gap:12px}.nav-logo{font-size:24px}.nav-links{width:100%;justify-content:center;gap:10px}.nav-btn{font-size:13px;padding:12px 22px}}</style>'

# Получаем все HTML файлы в папке pages
$files = Get-ChildItem -Path "pages" -Filter "*.html" -File

$updated = 0
$skipped = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    if ($content -match [regex]::Escape($oldNav)) {
        $content = $content -replace [regex]::Escape($oldNav), $newNav
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✓ Обновлено: $($file.Name)" -ForegroundColor Green
        $updated++
    } else {
        Write-Host "○ Пропущено: $($file.Name)" -ForegroundColor Yellow
        $skipped++
    }
}

Write-Host "`n=== Итого ===" -ForegroundColor Cyan
Write-Host "Обновлено файлов: $updated" -ForegroundColor Green
Write-Host "Пропущено файлов: $skipped" -ForegroundColor Yellow
