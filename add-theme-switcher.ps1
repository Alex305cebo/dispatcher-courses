# Script to add theme switcher to all HTML pages
$scriptTag = '<script src="../theme-switcher.js"></script>'
$scriptTagRoot = '<script src="theme-switcher.js"></script>'

# Get all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse | Where-Object { 
    $_.FullName -notlike "*node_modules*" -and 
    $_.FullName -notlike "*.git*" -and
    $_.FullName -notlike "*backup*" -and
    $_.Name -notlike "_*"
}

$count = 0
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Skip if already has theme-switcher
    if ($content -match 'theme-switcher\.js') {
        Write-Host "Skipped (already has theme switcher): $($file.Name)" -ForegroundColor Yellow
        continue
    }
    
    # Determine correct script path
    $isInPages = $file.DirectoryName -like "*pages*"
    $scriptToAdd = if ($isInPages) { $scriptTag } else { $scriptTagRoot }
    
    # Add script before closing body tag
    if ($content -match '</body>') {
        $newContent = $content -replace '</body>', "$scriptToAdd`n</body>"
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Added theme switcher to: $($file.Name)" -ForegroundColor Green
        $count++
    } else {
        Write-Host "Skipped (no </body> tag): $($file.Name)" -ForegroundColor Red
    }
}

Write-Host "`nTotal files updated: $count" -ForegroundColor Cyan
