# WinSCP deployment script for Hostinger
# Uploads files to dispatch4you.com

$ftpHost = "147.93.42.76"
$ftpUser = "dispatch4you"
$ftpPass = "Dis.69008"
$ftpPort = 21
$remotePath = "/public_html"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Deploying to Hostinger" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# WinSCP path
$winscpPath = "C:\Program Files (x86)\WinSCP\WinSCP.com"

# Create WinSCP script
$scriptContent = @"
option batch abort
option confirm off
open ftp://${ftpUser}:${ftpPass}@${ftpHost}:${ftpPort}
option transfer binary

cd ${remotePath}

put index.html
put about.html
put course.html
put android-preview.html

synchronize remote pages
synchronize remote css
synchronize remote js
synchronize remote images

close
exit
"@

# Save script
$scriptPath = "$env:TEMP\winscp_upload.txt"
$scriptContent | Out-File -FilePath $scriptPath -Encoding ASCII

# Execute upload
Write-Host "Connecting to server..." -ForegroundColor Yellow
& $winscpPath /script=$scriptPath

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Success! Files uploaded" -ForegroundColor Green
    Write-Host ""
    Write-Host "Site available at:" -ForegroundColor Cyan
    Write-Host "https://dispatch4you.com" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "Error during upload" -ForegroundColor Red
}

# Cleanup
Remove-Item $scriptPath -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
