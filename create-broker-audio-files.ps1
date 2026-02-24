# Скрипт для создания пустых аудио файлов для фраз брокера

# Минимальный MP3 заголовок
$mp3Header = [byte[]](0xFF, 0xFB, 0x90, 0x00)

# Список фраз брокера (последние 2 слова из каждой фразы)
$phrases = @(
    # Шаг 1 - Ответы брокера на приветствие
    "still_available",
    "still_open", 
    "still_available2",
    "still_available3",
    "still_open2",
    "still_available4",
    "still_open3",
    "still_available5",
    
    # Шаг 1 - Детали груза (brokerDetails первый набор)
    "you_have",
    "you_have2",
    "you_running",
    "your_equipment",
    "you_have3",
    "you_provide",
    
    # Шаг 3 - Подтверждение оборудования (brokerDetails второй набор)
    "by_5PM",
    "of_day",
    "by_5PM2",
    "by_5PM3",
    "by_5PM4",
    "same_day",
    
    # Шаг 5 - Ответ на вопрос о ставке
    "this_route",
    "this_lane",
    "competitive_rate",
    "per_mile",
    "right_now",
    "standard_pricing",
    "the_market",
    "fair_rate",
    
    # Шаг 7 - Контр-предложение брокера
    "can_do",
    "about_X",
    "best_price",
    "can_go",
    "to_X",
    "max_is",
    "this_one",
    "thats_it",
    
    # Шаг 9 - Финальное согласие
    "rate_confirmation",
    "confirmation_now",
    "right_away",
    "a_minute",
    "your_way",
    "right_now",
    "a_minute2",
    "now2"
)

# Создать папку audio если не существует
if (-not (Test-Path "audio")) {
    New-Item -ItemType Directory -Path "audio" | Out-Null
}

# Создать файлы
$count = 0
foreach ($phrase in $phrases) {
    $filename = "audio/broker_$phrase.mp3"
    [System.IO.File]::WriteAllBytes("$PWD\$filename", $mp3Header)
    Write-Host "Created: $filename" -ForegroundColor Green
    $count++
}

Write-Host "`nTotal files created: $count" -ForegroundColor Cyan
Write-Host "`nNow replace these files with your voice recordings." -ForegroundColor Yellow
