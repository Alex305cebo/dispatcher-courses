# Скрипт для удаления подключения content-protection.js из всех HTML файлов

$files = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Удаляем строку с content-protection.js
    $newContent = $content -replace '<script src="content-protection\.js"></script>\r?\n?', ''
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Обновлен: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nГотово! Защита удалена из всех файлов." -ForegroundColor Cyan
