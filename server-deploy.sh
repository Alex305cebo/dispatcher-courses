#!/bin/bash

# Скрипт для автоматического деплоя на сервере Hostinger
# Использование: bash server-deploy.sh

echo "🚀 Начинаем деплой Flow Field Background..."

# Цвета для вывода
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Обновление кода из Git
echo -e "${CYAN}📥 Шаг 1: Обновление кода из Git...${NC}"
git pull origin main

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при обновлении из Git!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Код обновлен!${NC}"

# 2. Переход в папку проекта
echo -e "${CYAN}📂 Шаг 2: Переход в dispatcher-cards-app...${NC}"
cd dispatcher-cards-app

# 3. Установка зависимостей
echo -e "${CYAN}📦 Шаг 3: Установка зависимостей...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при установке зависимостей!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Зависимости установлены!${NC}"

# 4. Сборка проекта
echo -e "${CYAN}🔨 Шаг 4: Сборка проекта...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при сборке проекта!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Проект собран!${NC}"

# 5. Копирование файлов
echo -e "${CYAN}📋 Шаг 5: Копирование файлов в корень...${NC}"
cd ..

# Создаем бэкап текущего index.html
if [ -f "index.html" ]; then
    cp index.html "index.html.backup.$(date +%Y%m%d_%H%M%S)"
    echo -e "${GREEN}✅ Создан бэкап index.html${NC}"
fi

# Копируем новые файлы
cp -r dispatcher-cards-app/out/* .

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка при копировании файлов!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Файлы скопированы!${NC}"

# 6. Установка прав доступа
echo -e "${CYAN}🔐 Шаг 6: Установка прав доступа...${NC}"
chmod -R 755 .

echo -e "${GREEN}✅ Права доступа установлены!${NC}"

# Готово!
echo ""
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Деплой завершен успешно!${NC}"
echo -e "${GREEN}═══════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}🌐 Откройте: https://dispatch4you.com/${NC}"
echo ""
echo -e "Вы должны увидеть:"
echo -e "  ✨ Анимированный фон с частицами"
echo -e "  🎨 Фиолетовые частицы, реагирующие на мышь"
echo -e "  📱 Адаптивный дизайн для iPhone"
echo ""
