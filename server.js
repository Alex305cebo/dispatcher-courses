const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

// Загрузка переменных окружения (если файл .env существует)
try {
  require('dotenv').config();
} catch (e) {
  console.log('dotenv not installed, using default values');
}

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(`Starting server in ${NODE_ENV} mode...`);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

// Create tables
function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      google_id TEXT UNIQUE,
      avatar_url TEXT,
      auth_provider TEXT DEFAULT 'local',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Users table ready');
    }
  });
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Все поля обязательны для заполнения' 
    });
  }

  if (password.length < 8) {
    return res.status(400).json({ 
      success: false, 
      message: 'Пароль должен содержать минимум 8 символов' 
    });
  }

  // Check if user exists
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Ошибка сервера' 
      });
    }

    if (user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Пользователь с таким email уже существует' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    db.run(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      [firstName, lastName, email, hashedPassword],
      function(err) {
        if (err) {
          return res.status(500).json({ 
            success: false, 
            message: 'Ошибка при создании пользователя' 
          });
        }

        // Generate token
        const token = jwt.sign(
          { id: this.lastID, email: email },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        res.status(201).json({
          success: true,
          message: 'Регистрация успешна!',
          token: token,
          user: {
            id: this.lastID,
            firstName: firstName,
            lastName: lastName,
            email: email
          }
        });
      }
    );
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email и пароль обязательны' 
    });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Ошибка сервера' 
      });
    }

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверный email или пароль' 
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        message: 'Неверный email или пароль' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Вход выполнен успешно!',
      token: token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  });
});

// Verify token endpoint
app.get('/api/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Токен не предоставлен' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    db.get('SELECT id, first_name, last_name, email FROM users WHERE id = ?', 
      [decoded.id], 
      (err, user) => {
        if (err || !user) {
          return res.status(401).json({ 
            success: false, 
            message: 'Пользователь не найден' 
          });
        }

        res.json({
          success: true,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email
          }
        });
      }
    );
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Недействительный токен' 
    });
  }
});

// Google OAuth endpoint
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ 
      success: false, 
      message: 'Google credential не предоставлен' 
    });
  }

  try {
    // Декодируем JWT токен от Google (без верификации для упрощения)
    // В продакшене нужно верифицировать токен через Google API
    const base64Url = credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString());

    const { sub: googleId, email, given_name: firstName, family_name: lastName, picture: avatarUrl } = payload;

    // Проверяем, существует ли пользователь
    db.get('SELECT * FROM users WHERE email = ? OR google_id = ?', [email, googleId], (err, user) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Ошибка сервера' 
        });
      }

      if (user) {
        // Пользователь существует - обновляем google_id если нужно
        if (!user.google_id) {
          db.run('UPDATE users SET google_id = ?, avatar_url = ?, auth_provider = ? WHERE id = ?',
            [googleId, avatarUrl, 'google', user.id]);
        }

        // Генерируем токен
        const token = jwt.sign(
          { id: user.id, email: user.email },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        return res.json({
          success: true,
          message: 'Вход выполнен успешно!',
          token: token,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            avatarUrl: avatarUrl || user.avatar_url
          }
        });
      }

      // Создаём нового пользователя
      db.run(
        'INSERT INTO users (first_name, last_name, email, google_id, avatar_url, auth_provider) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName || 'User', lastName || '', email, googleId, avatarUrl, 'google'],
        function(err) {
          if (err) {
            return res.status(500).json({ 
              success: false, 
              message: 'Ошибка при создании пользователя' 
            });
          }

          // Генерируем токен
          const token = jwt.sign(
            { id: this.lastID, email: email },
            JWT_SECRET,
            { expiresIn: '7d' }
          );

          res.status(201).json({
            success: true,
            message: 'Регистрация через Google успешна!',
            token: token,
            user: {
              id: this.lastID,
              firstName: firstName || 'User',
              lastName: lastName || '',
              email: email,
              avatarUrl: avatarUrl
            }
          });
        }
      );
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обработке Google авторизации' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Backend система запущена!');
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
