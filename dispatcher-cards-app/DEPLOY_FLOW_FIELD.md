# 🚀 Деплой Flow Field Background на dispatch4you.com

## Что было сделано

✅ Добавлен Neural Background (Flow Field) с анимированными частицами
✅ Адаптирован под iPhone и мобильные устройства
✅ Оптимизирована производительность (меньше частиц на мобильных)
✅ Добавлена поддержка Safe Area для iPhone с вырезом

## Шаги для деплоя

### 1. Сборка проекта

Проект уже собран! Статические файлы находятся в папке `out/`

```bash
cd dispatcher-cards-app
npm run build
```

### 2. Файлы для загрузки

Все файлы из папки `dispatcher-cards-app/out/` нужно загрузить на хостинг:

```
out/
├── index.html          # Главная страница с Neural Background
├── test.html           # Страница теста
├── _next/              # Статические ресурсы Next.js
│   ├── static/
│   └── ...
└── ...
```

### 3. Загрузка на Hostinger

#### Вариант A: Через File Manager

1. Войдите в панель Hostinger
2. Откройте File Manager
3. Перейдите в папку `public_html/`
4. Загрузите все файлы из `dispatcher-cards-app/out/`

#### Вариант B: Через FTP

1. Подключитесь к FTP (данные в панели Hostinger)
2. Перейдите в `/public_html/`
3. Загрузите все файлы из `dispatcher-cards-app/out/`

#### Вариант C: Через Git (рекомендуется)

```bash
# В корне проекта
git add .
git commit -m "Add Flow Field Background with mobile optimization"
git push origin main
```

Затем на сервере:
```bash
cd /home/u123456789/domains/dispatch4you.com/public_html
git pull origin main
cd dispatcher-cards-app
npm install
npm run build
# Скопировать файлы из out/ в корень
cp -r out/* ../
```

### 4. Проверка

После загрузки откройте:
- https://dispatch4you.com/ - должен быть виден Neural Background

## Настройки Neural Background

В файле `src/app/page.tsx`:

```tsx
<NeuralBackground 
  color="#a78bfa"           // Цвет частиц (фиолетовый)
  trailOpacity={0.15}       // Прозрачность следов (0.0-1.0)
  particleCount={1500}      // Количество частиц (авто уменьшается на мобильных)
  speed={0.8}               // Скорость движения
/>
```

## Оптимизация для мобильных

- На экранах < 768px количество частиц автоматически уменьшается на 50%
- Добавлена поддержка Safe Area для iPhone
- Адаптивные размеры текста и отступов
- Предотвращение автозума на iOS

## Troubleshooting

### Фон не виден
- Проверьте, что файлы из `_next/static/` загружены
- Откройте консоль браузера (F12) и проверьте ошибки
- Убедитесь, что JavaScript включен

### Медленная работа на мобильных
- Уменьшите `particleCount` в `src/app/page.tsx`
- Увеличьте `trailOpacity` для меньших следов

### Не вмещается на iPhone
- Проверьте, что файл `app/globals.css` загружен
- Убедитесь, что viewport meta теги установлены в `layout.tsx`

## Контакты

Если возникли проблемы, проверьте:
1. Консоль браузера (F12 → Console)
2. Network tab (F12 → Network) - все ли файлы загружаются
3. Версию браузера (должен поддерживать Canvas API)
