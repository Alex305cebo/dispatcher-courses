#!/bin/bash

# Скрипт для быстрого деплоя на сервер
# Использование: ./deploy.sh

echo "🚀 Начинаем деплой..."

# Проверка наличия .env файла
if [ ! -f .env ]; then
    echo "❌ Ошибка: .env файл не найден!"
    echo "Скопируйте .env.example в .env и заполните значения"
    exit 1
fi

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install --production

# Проверка синтаксиса
echo "🔍 Проверка синтаксиса..."
node -c server.js
if [ $? -ne 0 ]; then
    echo "❌ Ошибка синтаксиса в server.js"
    exit 1
fi

# Создание папки для логов
mkdir -p logs

# Остановка старой версии (если запущена)
echo "🛑 Остановка старой версии..."
pm2 stop dispatcher-courses 2>/dev/null || true

# Запуск приложения
echo "▶️  Запуск приложения..."
pm2 start ecosystem.config.js

# Сохранение конфигурации PM2
pm2 save

echo "✅ Деплой завершён успешно!"
echo "📊 Статус приложения:"
pm2 status

echo ""
echo "Полезные команды:"
echo "  pm2 logs dispatcher-courses  - просмотр логов"
echo "  pm2 restart dispatcher-courses  - перезапуск"
echo "  pm2 stop dispatcher-courses  - остановка"
echo "  pm2 monit  - мониторинг"
