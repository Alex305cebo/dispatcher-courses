# Скрипт для деплоя на Hostinger
# Использование: .\deploy-to-hostinger.ps1

Write-Host "🚀 Начинаем деплой Flow Field Background на dispatch4you.com..." -ForegroundColor Green

# 1. Сборка проекта
Write-Host "`n📦 Шаг 1: Сборка проекта..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Ошибка при сборке проекта!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Проект успешно собран!" -ForegroundColor Green

# 2. Создание архива для загрузки
Write-Host "`n📦 Шаг 2: Создание архива..." -ForegroundColor Cyan
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$archiveName = "dispatcher-cards-flow-field-$timestamp.zip"

Compress-Archive -Path "out\*" -DestinationPath $archiveName -Force

Write-Host "✅ Архив создан: $archiveName" -ForegroundColor Green

# 3. Инструкции по загрузке
Write-Host "`n📋 Шаг 3: Загрузка на Hostinger" -ForegroundColor Cyan
Write-Host @"

Теперь загрузите файлы на Hostinger одним из способов:

ВАРИАНТ A - Через File Manager (самый простой):
1. Войдите в панель Hostinger
2. Откройте File Manager
3. Перейдите в public_html/
4. Загрузите архив: $archiveName
5. Распакуйте архив
6. Готово! Откройте https://dispatch4you.com/

ВАРИАНТ B - Через FTP:
1. Подключитесь к FTP
2. Перейдите в /public_html/
3. Загрузите все файлы из папки 'out/'

ВАРИАНТ C - Через Git:
1. git add .
2. git commit -m "Add Flow Field Background"
3. git push origin main
4. На сервере: git pull && cd dispatcher-cards-app && npm run build

"@ -ForegroundColor Yellow

Write-Host "`n✨ Готово! Архив создан и готов к загрузке." -ForegroundColor Green
Write-Host "📁 Файл: $archiveName" -ForegroundColor Cyan
