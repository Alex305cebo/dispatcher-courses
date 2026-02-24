$footer = Get-Content "index.html" -Raw -Encoding UTF8
$footerStart = $footer.IndexOf('<!-- Footer -->')
$footerEnd = $footer.IndexOf('</footer>') + 9
$footerHTML = $footer.Substring($footerStart, $footerEnd - $footerStart)

$files = Get-ChildItem -Path "pages" -Filter "*.html" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -match '<footer') {
        Write-Host "Skip (has footer): $($file.Name)" -ForegroundColor Yellow
        continue
    }
    
    $newContent = $content -replace '</body>', "`n$footerHTML`n</body>"
    
    Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
    Write-Host "Added footer: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nDone!" -ForegroundColor Cyan
