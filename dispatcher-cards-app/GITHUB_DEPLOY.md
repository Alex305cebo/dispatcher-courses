# 🚀 Деплой через GitHub на Hostinger

## ✅ ПОДГОТОВКА ЗАВЕРШЕНА!

Проект готов для деплоя через GitHub на Hostinger Node.js Web Apps.

---

## 📋 ПОШАГОВАЯ ИНСТРУКЦИЯ:

### Шаг 1: Загрузи проект на GitHub

Если проект ещё не на GitHub, выполни:

```bash
cd dispatcher-cards-app
git init
git add .
git commit -m "Initial commit - Dispatcher Cards App"
git branch -M main
git remote add origin https://github.com/ТвойUsername/dispatcher-cards.git
git push -u origin main
```

**Или используй GitHub Desktop / VS Code для загрузки.**

---

### Шаг 2: Деплой на Hostinger

1. **Открой Hostinger hPanel**
   - Войди в свой аккаунт Hostinger

2. **Перейди в Websites**
   - Нажми на "Websites" в боковом меню
   - Нажми "Add Website"

3. **Выбери Node.js Web App**
   - Выбери "Node.js Web App" из списка

4. **Выбери GitHub Integration**
   - Нажми "Import Git Repository"

5. **Авторизуй GitHub**
   - Нажми "Authorize" для доступа к репозиториям
   - Разреши Hostinger доступ к твоим репозиториям

6. **Выбери репозиторий**
   - Найди и выбери репозиторий `dispatcher-cards`
   - Выбери ветку `main`

7. **Проверь Build Settings**
   - Hostinger автоматически определит Next.js
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** 20.x (рекомендуется)

8. **Deploy!**
   - Нажми "Deploy"
   - Дождись завершения сборки (2-5 минут)

---

## 🌐 ПОСЛЕ ДЕПЛОЯ:

Hostinger создаст временный домен типа:
```
https://your-app-name.hostingersite.com
```

Потом можешь подключить свой домен через настройки.

---

## ✨ ПРЕИМУЩЕСТВА GITHUB ДЕПЛОЯ:

- ✅ Автоматические обновления при push в GitHub
- ✅ Hostinger сам собирает проект
- ✅ Не нужно вручную загружать файлы
- ✅ История деплоев
- ✅ Логи сборки

---

## 🔧 НАСТРОЙКИ ПРОЕКТА:

Проект уже настроен правильно:
- ✅ `next.config.js` - без `output: 'export'`
- ✅ `package.json` - все зависимости на месте
- ✅ Скрипты сборки настроены

---

## 📊 ТРЕБОВАНИЯ:

- **Hosting Plan:** Business или Cloud (у тебя есть)
- **Node.js Version:** 18.x, 20.x, 22.x (Hostinger поддерживает)
- **Framework:** Next.js 14.x (у тебя установлен)

---

## 🆘 ЕСЛИ ЧТО-ТО НЕ ТАК:

1. **Проверь логи сборки** в Hostinger Dashboard
2. **Убедись, что все зависимости в package.json**
3. **Проверь, что Node.js версия совместима**

---

## 🎉 ГОТОВО!

После деплоя приложение будет работать как на localhost:3000, но на сервере Hostinger!

Все функции, анимации, звуки - всё будет работать идеально! 🚀
