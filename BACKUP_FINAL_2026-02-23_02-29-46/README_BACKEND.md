# Backend система для Курсов Диспетчера

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Запуск сервера

```bash
npm start
```

Или для разработки с автоперезагрузкой:

```bash
npm run dev
```

Сервер запустится на `http://localhost:3000`

## 📋 Что включено

### Backend (Node.js + Express)
- ✅ Регистрация пользователей
- ✅ Вход в систему
- ✅ JWT токены для аутентификации
- ✅ Хеширование паролей (bcrypt)
- ✅ SQLite база данных
- ✅ CORS для работы с frontend

### API Endpoints

#### POST /api/register
Регистрация нового пользователя

**Body:**
```json
{
  "firstName": "Иван",
  "lastName": "Иванов",
  "email": "ivan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Регистрация успешна!",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com"
  }
}
```

#### POST /api/login
Вход в систему

**Body:**
```json
{
  "email": "ivan@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Вход выполнен успешно!",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com"
  }
}
```

#### GET /api/verify
Проверка токена

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "firstName": "Иван",
    "lastName": "Иванов",
    "email": "ivan@example.com"
  }
}
```

## 🗄️ База данных

Используется SQLite с файлом `users.db`

### Структура таблицы users:
- `id` - INTEGER PRIMARY KEY AUTOINCREMENT
- `first_name` - TEXT NOT NULL
- `last_name` - TEXT NOT NULL
- `email` - TEXT UNIQUE NOT NULL
- `password` - TEXT NOT NULL (хешированный)
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP

## 🔒 Безопасность

- Пароли хешируются с помощью bcrypt (10 раундов)
- JWT токены действительны 7 дней
- Email должен быть уникальным
- Минимальная длина пароля: 8 символов

## 📝 Примечания

1. **JWT_SECRET** - в production замените на безопасный ключ
2. **CORS** - настроен для всех источников, в production ограничьте
3. База данных создается автоматически при первом запуске
4. Токен сохраняется в localStorage браузера

## 🛠️ Разработка

### Структура проекта:
```
├── server.js          # Основной файл сервера
├── package.json       # Зависимости
├── users.db          # База данных (создается автоматически)
├── register.html     # Страница регистрации
├── login.html        # Страница входа
└── index.html        # Главная страница
```

### Тестирование API:

Можно использовать curl или Postman:

```bash
# Регистрация
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Иван","lastName":"Иванов","email":"test@test.com","password":"12345678"}'

# Вход
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"12345678"}'
```

## 🐛 Troubleshooting

### Ошибка "Cannot find module"
```bash
npm install
```

### Порт 3000 занят
Измените PORT в server.js на другой

### База данных заблокирована
Закройте все процессы, использующие users.db

## 📦 Production

Для production рекомендуется:
1. Использовать PostgreSQL или MySQL вместо SQLite
2. Добавить rate limiting
3. Настроить HTTPS
4. Использовать переменные окружения (.env)
5. Добавить логирование
6. Настроить мониторинг
