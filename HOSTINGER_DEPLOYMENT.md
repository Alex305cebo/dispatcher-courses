# 🚀 Деплой проекта на Hostinger

## 📋 Подготовка к деплою

### Что у вас есть:
- ✅ Frontend (HTML, CSS, JavaScript)
- ✅ Backend (Node.js + Express + SQLite)
- ✅ Система авторизации (JWT)
- ✅ Google OAuth
- ✅ Защита контента

### Что нужно для Hostinger:
- Хостинг план с поддержкой Node.js (Business или выше)
- Доменное имя
- SSH доступ
- Node.js 14+ на сервере

## 🔧 Шаг 1: Подготовка файлов

### 1.1 Создайте .gitignore (если планируете использовать Git)

```
node_modules/
users.db
.env
*.log
.DS_Store
```

### 1.2 Создайте package.json (если его нет)

Файл уже должен быть создан, проверьте наличие всех зависимостей:

```json
{
  "name": "dispatcher-courses",
  "version": "1.0.0",
  "description": "Курсы Диспетчера - Платформа обучения",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sqlite3": "^5.1.6",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

### 1.3 Создайте .env файл для переменных окружения

```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-this-in-production
NODE_ENV=production
GOOGLE_CLIENT_ID=your-google-client-id
```

### 1.4 Обновите server.js для использования переменных окружения

Добавьте в начало server.js:

```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
```

## 🌐 Шаг 2: Настройка Hostinger

### 2.1 Выбор плана хостинга

Для Node.js приложения нужен:
- **Business Hosting** или выше
- **VPS Hosting** (рекомендуется для лучшей производительности)
- **Cloud Hosting**

⚠️ **Важно:** Обычный Web Hosting НЕ поддерживает Node.js!

### 2.2 Подключение к серверу через SSH

1. В панели Hostinger найдите раздел "SSH Access"
2. Включите SSH доступ
3. Скопируйте данные для подключения:
   - Hostname: `ssh.hostinger.com` (или ваш)
   - Port: `65002` (или другой)
   - Username: ваш username
   - Password: ваш пароль

4. Подключитесь через терминал:

```bash
ssh username@ssh.hostinger.com -p 65002
```

Или используйте PuTTY на Windows.

### 2.3 Проверка Node.js на сервере

```bash
node --version
npm --version
```

Если Node.js не установлен, установите через NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

## 📤 Шаг 3: Загрузка файлов на сервер

### Вариант 1: Через FTP/SFTP (проще)

1. Скачайте FileZilla или WinSCP
2. Подключитесь к серверу:
   - Protocol: SFTP
   - Host: ваш домен или IP
   - Port: 65002
   - Username: ваш username
   - Password: ваш пароль

3. Загрузите все файлы проекта в папку `public_html` или `domains/yourdomain.com/public_html`

### Вариант 2: Через Git (рекомендуется)

1. Создайте репозиторий на GitHub (приватный)
2. Загрузите проект:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dispatcher-courses.git
git push -u origin main
```

3. На сервере клонируйте репозиторий:

```bash
cd ~/public_html
git clone https://github.com/yourusername/dispatcher-courses.git
cd dispatcher-courses
```

### Вариант 3: Через SCP (командная строка)

```bash
scp -P 65002 -r /path/to/your/project username@ssh.hostinger.com:~/public_html/
```

## 🔨 Шаг 4: Установка зависимостей на сервере

```bash
cd ~/public_html/dispatcher-courses
npm install --production
```

## ⚙️ Шаг 5: Настройка переменных окружения

Создайте .env файл на сервере:

```bash
nano .env
```

Добавьте:

```env
PORT=3000
JWT_SECRET=ваш-супер-секретный-ключ-минимум-32-символа
NODE_ENV=production
GOOGLE_CLIENT_ID=ваш-google-client-id
```

Сохраните: `Ctrl+X`, затем `Y`, затем `Enter`

## 🔄 Шаг 6: Настройка Process Manager (PM2)

PM2 будет держать ваше приложение запущенным:

```bash
npm install -g pm2

# Запуск приложения
pm2 start server.js --name "dispatcher-courses"

# Автозапуск при перезагрузке сервера
pm2 startup
pm2 save

# Полезные команды
pm2 status          # Статус приложений
pm2 logs            # Просмотр логов
pm2 restart all     # Перезапуск
pm2 stop all        # Остановка
```

## 🌍 Шаг 7: Настройка домена и Nginx

### 7.1 Настройка Nginx как reverse proxy

Создайте конфигурацию Nginx:

```bash
sudo nano /etc/nginx/sites-available/dispatcher-courses
```

Добавьте:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/dispatcher-courses /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7.2 Настройка SSL (HTTPS)

Установите Certbot для бесплатного SSL от Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot автоматически настроит HTTPS и перенаправление.

## 🔐 Шаг 8: Обновление Google OAuth

1. Зайдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Выберите ваш проект
3. Перейдите в "Credentials"
4. Обновите OAuth 2.0 Client ID:
   - Authorized JavaScript origins:
     - `https://yourdomain.com`
     - `https://www.yourdomain.com`
   - Authorized redirect URIs:
     - `https://yourdomain.com`
     - `https://www.yourdomain.com`

5. Обновите Client ID в файлах:
   - `register.html`
   - `login.html`

## 🔧 Шаг 9: Обновление API endpoints

Замените все `http://localhost:3000` на ваш домен:

### Создайте config.js:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://yourdomain.com';
```

### Обновите все fetch запросы:

```javascript
// Было:
fetch('http://localhost:3000/api/register', ...)

// Стало:
fetch(`${API_BASE_URL}/api/register`, ...)
```

Или используйте относительные пути:

```javascript
fetch('/api/register', ...)
```

## 🧪 Шаг 10: Тестирование

1. Откройте ваш домен в браузере
2. Проверьте:
   - ✅ Главная страница загружается
   - ✅ Регистрация работает
   - ✅ Вход работает
   - ✅ Google OAuth работает
   - ✅ Доступ к курсам после авторизации
   - ✅ Защита контента работает
   - ✅ HTTPS активен (зелёный замок)

## 📊 Шаг 11: Мониторинг и логи

### Просмотр логов PM2:

```bash
pm2 logs dispatcher-courses
pm2 logs dispatcher-courses --lines 100
```

### Просмотр логов Nginx:

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Мониторинг ресурсов:

```bash
pm2 monit
```

## 🔄 Шаг 12: Обновление проекта

### Через Git:

```bash
cd ~/public_html/dispatcher-courses
git pull origin main
npm install --production
pm2 restart dispatcher-courses
```

### Через FTP:

1. Загрузите обновлённые файлы
2. Перезапустите приложение:

```bash
pm2 restart dispatcher-courses
```

## 🛡️ Шаг 13: Безопасность

### 13.1 Настройте firewall:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 13.2 Обновите JWT_SECRET:

Сгенерируйте надёжный ключ:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Обновите в .env файле.

### 13.3 Ограничьте доступ к .env:

```bash
chmod 600 .env
```

### 13.4 Настройте rate limiting в server.js:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // максимум 100 запросов
});

app.use('/api/', limiter);
```

## 📈 Шаг 14: Оптимизация

### 14.1 Включите gzip сжатие:

```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

### 14.2 Настройте кэширование статики в Nginx:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 14.3 Минифицируйте CSS и JS (опционально):

```bash
npm install -g minify
minify styles.css > styles.min.css
```

## 🔍 Troubleshooting

### Проблема: Приложение не запускается

```bash
pm2 logs dispatcher-courses
# Проверьте ошибки в логах
```

### Проблема: 502 Bad Gateway

```bash
# Проверьте, запущено ли приложение
pm2 status

# Проверьте порт
netstat -tulpn | grep 3000

# Перезапустите Nginx
sudo systemctl restart nginx
```

### Проблема: База данных не работает

```bash
# Проверьте права доступа
ls -la users.db
chmod 644 users.db

# Проверьте путь к базе в server.js
```

### Проблема: Google OAuth не работает

1. Проверьте Client ID в коде
2. Проверьте Authorized origins в Google Console
3. Проверьте HTTPS (Google требует HTTPS для production)

## 📝 Checklist перед деплоем

- [ ] package.json содержит все зависимости
- [ ] .env файл создан с правильными значениями
- [ ] JWT_SECRET изменён на надёжный
- [ ] Google OAuth настроен для production домена
- [ ] API endpoints обновлены на production URL
- [ ] База данных users.db создана
- [ ] Node.js установлен на сервере
- [ ] PM2 установлен и настроен
- [ ] Nginx настроен как reverse proxy
- [ ] SSL сертификат установлен
- [ ] Firewall настроен
- [ ] Тестирование пройдено

## 🎉 После успешного деплоя

1. Сделайте резервную копию базы данных:

```bash
cp users.db users.db.backup
```

2. Настройте автоматические бэкапы:

```bash
crontab -e
# Добавьте:
0 2 * * * cp ~/public_html/dispatcher-courses/users.db ~/backups/users-$(date +\%Y\%m\%d).db
```

3. Мониторьте логи первые дни
4. Соберите обратную связь от пользователей
5. Настройте Google Analytics (опционально)

## 📞 Поддержка Hostinger

Если возникнут проблемы:
- Live Chat: доступен 24/7
- Email: support@hostinger.com
- База знаний: https://support.hostinger.com

## 🚀 Готово!

Ваш проект теперь доступен по адресу: `https://yourdomain.com`

Поздравляю с успешным деплоем! 🎊
