# 📦 Инструкция по загрузке сайта на Hostinger

## ✅ Что подготовлено

Папка `HOSTINGER_DEPLOY` содержит **полноценный рабочий сайт** (4.46 MB, 241 файл):
- Все HTML страницы (index.html, courses.html, и т.д.)
- CSS стили (shared-styles.css, dark-theme.css)
- JavaScript файлы (auth.js, dark-mode.js, theme-switcher.js)
- Папка pages/ со всеми страницами
- Папка audio/ с аудиофайлами
- manifest.json и CNAME

## 🚀 Способ 1: Загрузка через File Manager (рекомендуется)

### Шаг 1: Войти в Hostinger
1. Открой https://hpanel.hostinger.com/
2. Войди в свой аккаунт
3. Выбери домен **dispatch4you.com**

### Шаг 2: Открыть File Manager
1. В панели управления найди **"File Manager"** или **"Файловый менеджер"**
2. Кликни на него

### Шаг 3: Очистить папку public_html
1. Перейди в папку **public_html** (это корневая папка сайта)
2. Выдели все файлы (Ctrl + A)
3. Удали их (кнопка Delete или корзина)
4. ⚠️ **НЕ удаляй саму папку public_html!**

### Шаг 4: Загрузить архив
1. Нажми кнопку **"Upload"** или **"Загрузить"**
2. Выбери файл **dispatch4you_hostinger.zip** из папки C:\Courses\
3. Дождись окончания загрузки

### Шаг 5: Распаковать архив
1. Найди загруженный файл dispatch4you_hostinger.zip
2. Кликни правой кнопкой → **"Extract"** или **"Распаковать"**
3. Выбери "Extract here" (распаковать здесь)
4. Удали архив dispatch4you_hostinger.zip после распаковки

### Шаг 6: Проверить
1. Открой https://dispatch4you.com/
2. Жесткая перезагрузка: **Ctrl + F5**
3. Проверь что все работает

---

## 🔧 Способ 2: Загрузка через FTP (для опытных)

### Что нужно:
- FTP клиент (FileZilla, WinSCP)
- FTP данные из Hostinger (хост, логин, пароль)

### Шаги:
1. Скачай FileZilla: https://filezilla-project.org/
2. Получи FTP данные в Hostinger (раздел FTP Accounts)
3. Подключись к серверу
4. Перейди в папку /public_html/
5. Удали все старые файлы
6. Загрузи содержимое папки HOSTINGER_DEPLOY

---

## ❓ Почему так мало весит?

### Исключено (не нужно для работы сайта):
- ❌ **node_modules/** (~200 MB) - библиотеки для разработки
- ❌ **.next/** (~50 MB) - кэш Next.js
- ❌ **.git/** (~30 MB) - история Git
- ❌ **Бэкапы** (~100 MB) - старые версии
- ❌ **Исходники приложений** - не нужны на сервере
- ❌ **Скрипты .py, .ps1** - для разработки

### Включено (нужно для работы):
- ✅ Все HTML страницы
- ✅ CSS стили
- ✅ JavaScript для интерактивности
- ✅ Аудиофайлы
- ✅ Конфигурационные файлы

**Твой сайт статический (HTML/CSS/JS)**, поэтому весит мало и работает быстро!

---

## 🔍 Проверка после загрузки

Проверь эти страницы:
- ✅ https://dispatch4you.com/ (главная)
- ✅ https://dispatch4you.com/courses.html (курсы)
- ✅ https://dispatch4you.com/pages/dispatcher-cards.html (новая страница)
- ✅ https://dispatch4you.com/pages/load-finder.html
- ✅ https://dispatch4you.com/pages/documentation.html

---

## 🆘 Если что-то не работает

1. **Очисти кэш браузера**: Ctrl + Shift + Delete
2. **Жесткая перезагрузка**: Ctrl + F5
3. **Проверь права доступа**: файлы должны быть 644, папки 755
4. **Проверь .htaccess**: если есть, убедись что настроен правильно

---

## 📝 Важные заметки

- Все изменения сохранены локально в C:\Courses\
- Бэкап в GitHub: https://github.com/Alex305cebo/dispatcher-courses
- Для обновления сайта: измени файлы локально → загрузи на Hostinger
- Или настрой автоматический деплой из GitHub

---

## 🎉 Готово!

После загрузки сайт будет работать на https://dispatch4you.com/ с Hostinger!
