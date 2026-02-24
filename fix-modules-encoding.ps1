# Скрипт для исправления кодировки всех файлов модулей

$modulesPath = "pages"
$moduleFiles = @(
    "module-2.html",
    "module-3.html", 
    "module-4.html",
    "module-5.html",
    "module-6.html",
    "module-7.html",
    "module-8.html",
    "module-9.html",
    "module-10.html",
    "module-11.html",
    "module-12.html"
)

foreach ($file in $moduleFiles) {
    $filePath = Join-Path $modulesPath $file
    
    if (Test-Path $filePath) {
        Write-Host "Исправляю кодировку: $file" -ForegroundColor Yellow
        
        # Читаем файл с правильной кодировкой
        $content = Get-Content -Path $filePath -Encoding UTF8 -Raw
        
        # Сохраняем обратно в UTF-8 без BOM
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($filePath, $content, $utf8NoBom)
        
        Write-Host "✓ Готово: $file" -ForegroundColor Green
    } else {
        Write-Host "✗ Файл не найден: $file" -ForegroundColor Red
    }
}

Write-Host "`nВсе файлы обработаны!" -ForegroundColor Cyan
