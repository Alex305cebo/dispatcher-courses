# 🚀 Dispatcher Cards - Инструкция по установке и запуску

## Быстрый старт

### 1. Установка зависимостей

```bash
cd dispatcher-cards-app
npm install
```

### 2. Запуск в режиме разработки

```bash
npm run dev
```

Откройте http://localhost:3000 в браузере.

### 3. Сборка для продакшена

```bash
npm run build
npm start
```

## Что создано

### ✅ HTML версия (готова к использованию)
- `quiz-cards.html` - основная страница
- `quiz-cards.css` - стили
- `quiz-cards.js` - логика и вопросы
- Работает напрямую в браузере: `file:///C:/Courses/quiz-cards.html`

### ✅ React версия (Next.js)
- Полноценное приложение с Framer Motion
- Темная/светлая тема
- Интернационализация (ru/en)
- Glassmorphism дизайн
- Требует запуска dev-сервера

## Основные файлы React-версии

```
dispatcher-cards-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Главная страница
│   │   └── globals.css      # Глобальные стили
│   ├── components/
│   │   ├── DispatcherCard.tsx    # Карточка с drag
│   │   ├── SwipeCardStack.tsx    # Стек карточек
│   │   ├── ResultsModal.tsx      # Результаты
│   │   └── ThemeToggle.tsx       # Переключатель темы
│   ├── data/
│   │   └── questions.ts     # 20 вопросов
│   ├── lib/
│   │   └── i18n.ts         # Система переводов
│   └── locales/
│       ├── ru.json         # Русский
│       └── en.json         # Английский
```

## Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Framer Motion** - анимации свайпа
- **next-themes** - темная/светлая тема

## Управление

- **Свайп вправо** → Правильный ответ (✓)
- **Свайп влево** → Неверный ответ (✗)
- **Кнопки** → Альтернативное управление
- **Иконка солнца/луны** → Переключение темы

## Интеграция с основным сайтом

Приложение интегрировано в `dashboard.html` как карточка "Тренажёр вопросов".

## Проверка авторизации

⚠️ Временно отключена для тестирования (см. `AUTH_DISABLED_INFO.md`)

## Деплой

### Vercel (рекомендуется)
```bash
npm install -g vercel
vercel
```

### Другие платформы
```bash
npm run build
# Загрузите папку .next на хостинг
```

## Решение проблем

### Ошибка "border-border class does not exist"
✅ Исправлено в `globals.css`

### Ошибка "createContext is not a function"
✅ Исправлено добавлением `'use client'` в `layout.tsx`

### Стили не применяются
✅ Упрощена конфигурация Tailwind

## Полный код

Весь код разбит на части в файлах:
- `DISPATCHER_CARDS_CODE_PART1.md` - структура и package.json
- `DISPATCHER_CARDS_CODE_PART2.md` - конфигурация
- `DISPATCHER_CARDS_CODE_PART3.md` - layout и globals.css
- `DISPATCHER_CARDS_CODE_PART4.md` - i18n и конфиги
- `DISPATCHER_CARDS_CODE_PART5_LOCALES.md` - переводы

Компоненты находятся в папке `dispatcher-cards-app/src/components/`
