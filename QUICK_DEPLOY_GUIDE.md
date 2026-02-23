# ⚡ Быстрый гайд по деплою на Hostinger

## 🎯 За 15 минут до запуска

### 1️⃣ Подготовка (5 минут)

```bash
# 1. Создайте .env файл
cp .env.example .env

# 2. Отредактируйте .env:
# - Смените JWT_SECRET на надёжный ключ
# - Добавьте Google Client ID (если используете)

# 3. Проверьте package.json
npm install
```

### 2️⃣ Загрузка на Hostinger (5 минут)

**Вариант A: Через FileZilla (проще)**
1. Скачайте FileZilla
2. Подключитесь к серверу (SFTP)
3. Загрузите все файлы в `public_html`

**Вариант B: Через Git (рекомендуется)**
```bash
# На вашем компьютере:
git init
git add .
git commit -m "Initial commit"
git push origin main

# На сервере Hostinger:
ssh username@ssh.hostinger.com -p 65002
cd ~/public_html
git clone your-repo-url
```

### 3️⃣ Запуск на сервере (5 минут)

```bash
# Подключитесь к серверу
ssh username@ssh.hostinger.com -p 65002

# Перейдите в папку проекта
cd ~/public_html/dispatcher-courses

# Установите зависимости
npm install --production

# Установите PM2 (если ещё не установлен)
npm install -g pm2

# Запустите приложение
pm2 start server.js --name "dispatcher-courses"

# Сохраните конфигурацию
pm2 save
pm2 startup
```

### 4️⃣ Настройка домена (автоматически)

Hostinger обычно автоматически настраивает Nginx.
Если нет - обратитесь в поддержку.

### 5️⃣ Настройка SSL (1 команда)

```bash
sudo certbot --nginx -d yourdomain.com
```

## ✅ Готово!

Откройте ваш домен в браузере: `https://yourdomain.com`

## 🔧 Полезные команды

```bash
# Просмотр логов
pm2 logs dispatcher-courses

# Перезапуск
pm2 restart dispatcher-courses

# Остановка
pm2 stop dispatcher-courses

# Статус
pm2 status

# Мониторинг
pm2 monit
```

## 🆘 Если что-то не работает

1. **Проверьте логи:**
   ```bash
   pm2 logs dispatcher-courses
   ```

2. **Проверьте порт:**
   ```bash
   netstat -tulpn | grep 3000
   ```

3. **Перезапустите:**
   ```bash
   pm2 restart dispatcher-courses
   ```

4. **Обратитесь в поддержку Hostinger:**
   - Live Chat 24/7
   - support@hostinger.com

## 📚 Подробная инструкция

Смотрите файл `HOSTINGER_DEPLOYMENT.md` для полной инструкции.

## 🎉 Успехов с деплоем!
