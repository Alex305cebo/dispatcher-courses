# 🎯 Dispatcher Cards App

Современное образовательное приложение для диспетчеров с механикой Tinder-свайпов. Построено на React, Next.js, Tailwind CSS и Framer Motion.

## ✨ Особенности

### 🎨 Дизайн
- **Glassmorphism** - стеклянные поверхности с размытием
- **Темная/Светлая тема** - автоматическое переключение
- **Адаптивный дизайн** - Mobile-first подход
- **Плавные анимации** - Framer Motion для физики карточек

### 📱 Мобильная оптимизация
- Использование `svh` для корректной высоты экрана
- Safe area insets для iOS
- Touch-оптимизированные жесты
- Вибрация при ответах
- Предотвращение pull-to-refresh

### 🌍 Интернационализация
- Готовая структура для переводов
- Поддержка русского и английского языков
- Легкое добавление новых языков

### 🎮 Механика
- **Свайп вправо** → Правильный ответ (✓)
- **Свайп влево** → Неверный ответ (✗)
- Кнопки для альтернативного управления
- Стек карточек с предзагрузкой
- Прогресс-бар и статистика

## 🚀 Быстрый старт

### Установка зависимостей

```bash
cd dispatcher-cards-app
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Сборка для продакшена

```bash
npm run build
npm start
```

## 📁 Структура проекта

```
dispatcher-cards-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout с ThemeProvider
│   │   ├── page.tsx            # Главная страница
│   │   └── globals.css         # Глобальные стили
│   ├── components/
│   │   ├── DispatcherCard.tsx  # Компонент карточки с drag
│   │   ├── SwipeCardStack.tsx  # Стек карточек
│   │   ├── ResultsModal.tsx    # Модальное окно результатов
│   │   └── ThemeToggle.tsx     # Переключатель темы
│   ├── data/
│   │   └── questions.ts        # База вопросов
│   ├── lib/
│   │   └── i18n.ts            # Система переводов
│   └── locales/
│       ├── ru.json            # Русские переводы
│       └── en.json            # Английские переводы
├── tailwind.config.ts         # Конфигурация Tailwind
├── tsconfig.json              # TypeScript конфигурация
└── package.json
```

## 🎨 Темы

### Темная тема (по умолчанию)
Вдохновлена интерфейсом кабины пилота:
- Глубокий темно-синий фон
- Glassmorphism эффекты
- Неоморфные тени
- Яркие акценты

### Светлая тема
Чистый и минималистичный дизайн:
- Белый фон с градиентами
- Мягкие тени
- Высокий контраст

## 🌍 Добавление нового языка

1. Создайте файл перевода в `src/locales/`:

```json
// src/locales/es.json
{
  "app": {
    "title": "Entrenador de Despachador",
    "subtitle": "Aprendizaje Interactivo"
  },
  // ... остальные переводы
}
```

2. Обновите `src/lib/i18n.ts`:

```typescript
import es from '@/locales/es.json'

export type Locale = 'en' | 'ru' | 'es'

const messages: Record<Locale, Messages> = {
  en,
  ru,
  es,
}
```

## 📝 Добавление вопросов

Редактируйте `src/data/questions.ts`:

```typescript
{
  id: 21,
  category: 'new_category',
  question: 'Ваш вопрос?',
  description: 'Подробное объяснение',
  correctAnswer: true,
  hint: 'Полезная подсказка'
}
```

Не забудьте добавить категорию в переводы:

```json
{
  "categories": {
    "new_category": "Новая категория"
  }
}
```

## 🎯 Tailwind конфигурация

### Цветовая палитра

```typescript
// Светлая тема
light: {
  bg: { primary, secondary, tertiary },
  text: { primary, secondary, muted },
  border
}

// Темная тема
dark: {
  bg: { primary, secondary, tertiary },
  text: { primary, secondary, muted },
  border
}

// Семантические цвета
success, danger, primary, accent
```

### Кастомные утилиты

- `h-screen-safe` - высота с учетом safe area
- `glass-light` / `glass-dark` - glassmorphism эффекты
- `safe-top/bottom/left/right` - отступы для safe area

## 🔧 Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Framer Motion** - анимации
- **next-themes** - управление темами

## 📱 Мобильная адаптация

### iOS
- Safe area insets
- Предотвращение zoom на input
- Оптимизация touch-событий
- PWA поддержка

### Android
- Material Design принципы
- Оптимизация производительности
- Адаптивные размеры

## 🚀 Деплой

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel
```

### Другие платформы

```bash
npm run build
# Загрузите папку .next на ваш хостинг
```

## 📄 Лицензия

MIT

## 🤝 Вклад

Приветствуются pull requests и issues!

---

Создано с ❤️ для диспетчеров
