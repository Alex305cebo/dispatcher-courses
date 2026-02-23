# Деплой Next.js приложения на Hostinger

## Требования
- Node.js 18+ на сервере Hostinger
- SSH доступ к серверу
- PM2 для управления процессом

## Шаг 1: Подготовка локально

```bash
cd dispatcher-cards-app
npm install
npm run build
```

## Шаг 2: Загрузка на сервер

### Вариант A: Через Git (Рекомендуется)

1. На сервере Hostinger через SSH:
```bash
cd ~/public_html
git clone https://github.com/Alex305cebo/dispatcher-courses.git
cd dispatcher-courses/dispatcher-cards-app
```

2. Установка зависимостей:
```bash
npm install --production
```

3. Сборка приложения:
```bash
npm run build
```

### Вариант B: Через FTP

1. Загрузите всю папку `dispatcher-cards-app` на сервер
2. Подключитесь по SSH и выполните:
```bash
cd ~/public_html/dispatcher-cards-app
npm install --production
npm run build
```

## Шаг 3: Установка PM2

```bash
npm install -g pm2
```

## Шаг 4: Запуск приложения

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Шаг 5: Настройка Nginx/Apache

### Для Nginx (добавьте в конфигурацию):

```nginx
location /cards {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Для Apache (.htaccess):

```apache
RewriteEngine On
RewriteRule ^cards/(.*)$ http://localhost:3000/$1 [P,L]
```

## Шаг 6: Проверка

Откройте в браузере:
- `https://ваш-домен.com/cards` (если настроили прокси)
- `https://ваш-домен.com:3000` (прямой доступ, если открыт порт)

## Управление приложением

```bash
# Просмотр статуса
pm2 status

# Перезапуск
pm2 restart dispatcher-cards

# Остановка
pm2 stop dispatcher-cards

# Просмотр логов
pm2 logs dispatcher-cards

# Обновление после изменений
cd ~/public_html/dispatcher-courses/dispatcher-cards-app
git pull
npm install
npm run build
pm2 restart dispatcher-cards
```

## Альтернатива: Статический экспорт

Если Hostinger не поддерживает Node.js, можно экспортировать статическую версию:

1. Измените `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

2. Соберите:
```bash
npm run build
```

3. Загрузите папку `out` на сервер через FTP в `public_html/cards`

4. Откройте: `https://ваш-домен.com/cards`

## Troubleshooting

### Ошибка "Port 3000 already in use"
```bash
pm2 delete all
pm2 start ecosystem.config.js
```

### Ошибка прав доступа
```bash
chmod -R 755 ~/public_html/dispatcher-cards-app
```

### Приложение не запускается
```bash
pm2 logs dispatcher-cards
# Проверьте логи на ошибки
```
