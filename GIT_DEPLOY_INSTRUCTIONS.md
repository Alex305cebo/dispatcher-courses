# 🚀 Инструкция по деплою через Git на dispatch4you.com

## ✅ Изменения отправлены на GitHub!

Коммит: "Add Flow Field Background with mobile optimization and iPhone support"

---

## 📋 Шаги для деплоя на сервер Hostinger

### 1. Подключитесь к серверу через SSH

```bash
ssh u123456789@dispatch4you.com
# Или используйте данные из панели Hostinger
```

### 2. Перейдите в директорию сайта

```bash
cd /home/u123456789/domains/dispatch4you.com/public_html
# Или ваш путь к public_html
```

### 3. Обновите код из Git

```bash
git pull origin main
```

### 4. Перейдите в папку dispatcher-cards-app

```bash
cd dispatcher-cards-app
```

### 5. Установите зависимости (если нужно)

```bash
npm install
```

### 6. Соберите проект

```bash
npm run build
```

### 7. Скопируйте файлы в корень сайта

```bash
# Вернитесь в корень
cd ..

# Скопируйте файлы из out/ в корень
cp -r dispatcher-cards-app/out/* .

# Или если нужно заменить только главную страницу:
cp dispatcher-cards-app/out/index.html .
cp -r dispatcher-cards-app/out/_next .
```

### 8. Проверьте результат

Откройте в браузере: https://dispatch4you.com/

Вы должны увидеть:
- ✨ Анимированный фон с частицами
- 🎨 Фиолетовые частицы, реагирующие на мышь
- 📱 Адаптивный дизайн для iPhone

---

## 🔧 Альтернативный способ (если нет SSH)

### Через Hostinger Terminal (в панели управления)

1. Войдите в панель Hostinger
2. Откройте раздел "Advanced" → "Terminal"
3. Выполните команды из шагов 2-7 выше

---

## 📦 Что было добавлено

### Новые файлы:
- `dispatcher-cards-app/src/components/NeuralBackground.tsx` - компонент фона
- `dispatcher-cards-app/src/lib/utils.ts` - утилиты
- `dispatcher-cards-app/DEPLOY_FLOW_FIELD.md` - документация
- `dispatcher-cards-app/БЫСТРЫЙ_ДЕПЛОЙ.txt` - краткая инструкция

### Изменённые файлы:
- `dispatcher-cards-app/src/app/page.tsx` - добавлен Neural Background
- `dispatcher-cards-app/src/app/layout.tsx` - viewport для iPhone
- `dispatcher-cards-app/app/globals.css` - стили для Safe Area
- `dispatcher-cards-app/next.config.js` - включен статический экспорт
- `index.html` - добавлен Neural Background на главную страницу

---

## ⚙️ Настройки Neural Background

Если хотите изменить параметры фона, отредактируйте файл:
`dispatcher-cards-app/src/app/page.tsx`

```tsx
<NeuralBackground 
  color="#a78bfa"           // Цвет частиц
  trailOpacity={0.15}       // Прозрачность следов (0.0-1.0)
  particleCount={1500}      // Количество частиц
  speed={0.8}               // Скорость движения
/>
```

После изменений:
1. `git add .`
2. `git commit -m "Update background settings"`
3. `git push`
4. На сервере: `git pull && cd dispatcher-cards-app && npm run build && cd .. && cp -r dispatcher-cards-app/out/* .`

---

## 🐛 Troubleshooting

### Ошибка при git pull
```bash
# Если есть конфликты
git stash
git pull origin main
git stash pop
```

### Ошибка при npm install
```bash
# Очистите кеш
rm -rf node_modules package-lock.json
npm install
```

### Фон не отображается
1. Проверьте консоль браузера (F12)
2. Убедитесь, что файлы из `_next/` скопированы
3. Проверьте права доступа: `chmod -R 755 .`

### Медленная работа
- Уменьшите `particleCount` до 800-1000
- Увеличьте `trailOpacity` до 0.2

---

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи: `tail -f /path/to/error.log`
2. Проверьте права доступа: `ls -la`
3. Проверьте версию Node.js: `node -v` (должна быть >= 18)

---

✨ Готово! Наслаждайтесь красивым анимированным фоном!
