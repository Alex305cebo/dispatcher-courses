# Скрипт для подготовки к деплою на Hostinger

Write-Host "🚀 Подготовка к деплою на Hostinger..." -ForegroundColor Cyan
Write-Host ""

# Проверка наличия node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Установка зависимостей..." -ForegroundColor Yellow
    npm install
}

# Сборка проекта
Write-Host "🔨 Сборка проекта..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Сборка завершена успешно!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📁 Файлы для загрузки находятся в папке: out/" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📤 Следующие шаги:" -ForegroundColor Yellow
    Write-Host "1. Открой File Manager в панели Hostinger"
    Write-Host "2. Перейди в public_html/cards"
    Write-Host "3. Загрузи ВСЕ файлы из папки 'out'"
    Write-Host "4. Открой https://твой-домен.com/cards"
    Write-Host ""
    Write-Host "📖 Подробная инструкция: ПРОСТОЙ_ДЕПЛОЙ.md" -ForegroundColor Cyan
    
    # Открываем папку out в проводнике
    Write-Host ""
    Write-Host "🗂️  Открываю папку out..." -ForegroundColor Green
    Start-Process "out"
} else {
    Write-Host ""
    Write-Host "❌ Ошибка при сборке!" -ForegroundColor Red
    Write-Host "Проверь ошибки выше и попробуй снова."
}
