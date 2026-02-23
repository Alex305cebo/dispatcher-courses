# Автоматическое резервное копирование каждые 10 минут
$backupDir = ".backups"
$filesToBackup = @(
    "pages/calls.html",
    "pages/cases.html",
    "pages/home.html",
    "app/page.tsx",
    "app/layout.tsx"
)

# Убедиться что папка существует
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    (Get-Item $backupDir -Force).Attributes += 'Hidden'
}

# Функция для создания резервной копии
function Create-Backup {
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
    
    foreach ($file in $filesToBackup) {
        if (Test-Path $file) {
            $fileName = Split-Path $file -Leaf
            $backupFile = "$backupDir/${fileName}_${timestamp}.bak"
            Copy-Item -Path $file -Destination $backupFile -Force
            Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Резервная копия: $fileName"
        }
    }
}

# Основной цикл - резервная копия каждые 10 минут
Write-Host "Запущена система автоматического резервного копирования"
Write-Host "Резервная копия будет создаваться каждые 10 минут"

while ($true) {
    Create-Backup
    Start-Sleep -Seconds 600  # 10 минут = 600 секунд
}
