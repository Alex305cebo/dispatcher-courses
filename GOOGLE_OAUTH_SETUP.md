# 🔵 Настройка Google OAuth для регистрации и входа

## ✅ Что было реализовано

Добавлена полная поддержка авторизации через Google на страницах:
- `register.html` - регистрация через Google
- `login.html` - вход через Google
- `server.js` - серверная обработка Google OAuth

## 📋 Как настроить Google OAuth

### Шаг 1: Создание проекта в Google Cloud Console

1. Перейдите на [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Название проекта: "Курсы Диспетчера" (или любое другое)

### Шаг 2: Включение Google Sign-In API

1. В меню слева выберите "APIs & Services" → "Library"
2. Найдите "Google+ API" или "Google Identity"
3. Нажмите "Enable" для активации API

### Шаг 3: Создание OAuth 2.0 Client ID

1. Перейдите в "APIs & Services" → "Credentials"
2. Нажмите "Create Credentials" → "OAuth client ID"
3. Если требуется, настройте OAuth consent screen:
   - User Type: External (для тестирования)
   - App name: "Курсы Диспетчера"
   - User support email: ваш email
   - Developer contact: ваш email
   - Сохраните

4. Создайте OAuth client ID:
   - Application type: "Web application"
   - Name: "Курсы Диспетчера Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `http://127.0.0.1:3000`
     - Добавьте ваш production домен, если есть
   - Authorized redirect URIs:
     - `http://localhost:3000`
     - `http://127.0.0.1:3000`
   - Нажмите "Create"

5. Скопируйте Client ID (выглядит как: `1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com`)

### Шаг 4: Обновление кода

Замените `GOOGLE_CLIENT_ID` в файлах:

**register.html** (строка ~290):
```javascript
const GOOGLE_CLIENT_ID = 'ВАШ_CLIENT_ID_ЗДЕСЬ';
```

**login.html** (строка ~290):
```javascript
const GOOGLE_CLIENT_ID = 'ВАШ_CLIENT_ID_ЗДЕСЬ';
```

### Шаг 5: Перезапуск сервера

```bash
# Остановите сервер (Ctrl+C)
# Запустите снова
npm start
```

## 🔧 Как это работает

### Процесс авторизации:

1. **Пользователь нажимает кнопку Google**
   - Открывается всплывающее окно Google Sign-In
   - Пользователь выбирает аккаунт Google

2. **Google возвращает credential (JWT токен)**
   - Токен содержит: email, имя, фамилию, фото профиля
   - Токен отправляется на сервер

3. **Сервер обрабатывает токен** (`/api/auth/google`)
   - Декодирует JWT токен от Google
   - Проверяет, существует ли пользователь с таким email
   - Если существует - выполняет вход
   - Если нет - создаёт нового пользователя

4. **Возврат токена авторизации**
   - Сервер генерирует свой JWT токен
   - Токен сохраняется в localStorage
   - Пользователь перенаправляется в dashboard

### База данных:

Таблица `users` обновлена с новыми полями:
- `google_id` - уникальный ID от Google
- `avatar_url` - URL фото профиля
- `auth_provider` - 'local' или 'google'
- `password` - теперь может быть NULL для Google пользователей

## 🎨 Внешний вид кнопки

Кнопка Google отображается с официальным стилем:
- Синий фон с логотипом Google
- Текст "Продолжить с Google"
- Адаптивная ширина
- Локализация на русском языке

## 🔒 Безопасность

### Текущая реализация (для разработки):
- Токен от Google декодируется без верификации
- Подходит для локальной разработки и тестирования

### Для production (рекомендуется):
1. Установите Google Auth Library:
```bash
npm install google-auth-library
```

2. Обновите `server.js` для верификации токена:
```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}
```

3. Используйте верификацию в endpoint:
```javascript
app.post('/api/auth/google', async (req, res) => {
  try {
    const payload = await verifyGoogleToken(req.body.credential);
    // Используйте payload вместо декодирования
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});
```

## 🧪 Тестирование

### Локальное тестирование:

1. Запустите сервер:
```bash
npm start
```

2. Откройте браузер:
```
http://localhost:3000/register.html
```

3. Нажмите кнопку "Продолжить с Google"

4. Выберите Google аккаунт

5. Проверьте:
   - Перенаправление на dashboard.html
   - Имя пользователя в навигации
   - Доступ к курсам

### Проверка базы данных:

```bash
# Откройте SQLite базу
sqlite3 users.db

# Посмотрите пользователей
SELECT * FROM users;

# Проверьте Google пользователей
SELECT * FROM users WHERE auth_provider = 'google';
```

## ❌ Возможные проблемы

### Проблема 1: Кнопка Google не появляется
**Решение:**
- Проверьте, что Google SDK загружен (откройте DevTools → Network)
- Убедитесь, что Client ID правильный
- Проверьте консоль браузера на ошибки

### Проблема 2: "Invalid Client ID"
**Решение:**
- Проверьте, что Client ID скопирован полностью
- Убедитесь, что в Google Console добавлен `http://localhost:3000`
- Очистите кэш браузера

### Проблема 3: "Redirect URI mismatch"
**Решение:**
- В Google Console добавьте точный URL: `http://localhost:3000`
- Не добавляйте слэш в конце
- Подождите 5-10 минут после изменений в Console

### Проблема 4: Ошибка на сервере
**Решение:**
- Проверьте, что сервер запущен (`npm start`)
- Проверьте консоль сервера на ошибки
- Убедитесь, что база данных обновлена (перезапустите сервер)

## 📱 Мобильные устройства

Google Sign-In работает на мобильных устройствах:
- iOS Safari
- Android Chrome
- Адаптивный дизайн кнопки
- Touch-friendly интерфейс

## 🚀 Production Deployment

Для production:

1. Обновите Authorized JavaScript origins:
   - Добавьте ваш домен: `https://yourdomain.com`

2. Обновите Authorized redirect URIs:
   - Добавьте: `https://yourdomain.com`

3. Обновите Client ID в коде:
   - Используйте переменные окружения
   - Не храните Client ID в git

4. Включите верификацию токенов (см. раздел Безопасность)

5. Настройте OAuth consent screen:
   - Заполните все обязательные поля
   - Добавьте Privacy Policy
   - Добавьте Terms of Service
   - Пройдите верификацию Google (если нужно)

## 📊 Статистика

После настройки вы сможете отслеживать:
- Количество входов через Google
- Новые регистрации через Google
- Активность пользователей
- Конверсию регистраций

## 🔗 Полезные ссылки

- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Sign-In Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Google Auth Library](https://github.com/googleapis/google-auth-library-nodejs)

## ✅ Checklist

- [ ] Создан проект в Google Cloud Console
- [ ] Включен Google Sign-In API
- [ ] Создан OAuth 2.0 Client ID
- [ ] Добавлены Authorized origins
- [ ] Client ID обновлён в register.html
- [ ] Client ID обновлён в login.html
- [ ] Сервер перезапущен
- [ ] Протестирована регистрация через Google
- [ ] Протестирован вход через Google
- [ ] Проверен доступ к курсам
- [ ] База данных содержит Google пользователей

## 💡 Советы

1. Используйте тестовый Google аккаунт для разработки
2. Не коммитьте Client ID в публичный репозиторий
3. Регулярно обновляйте Google Auth Library
4. Мониторьте логи авторизации
5. Добавьте аналитику для отслеживания конверсии
