# 🚀 Автоматический деплой с GitHub на Hostinger

## Способ 1: GitHub Actions + FTP (Рекомендуется)

### Шаг 1: Создать GitHub Secret с FTP данными

1. Открой https://github.com/Alex305cebo/dispatcher-courses
2. Перейди в **Settings** → **Secrets and variables** → **Actions**
3. Нажми **New repository secret**
4. Создай 3 секрета:

```
Name: FTP_SERVER
Value: ftp.gold-oyster-258946.hostingersite.com

Name: FTP_USERNAME
Value: u724602277.Dipscard

Name: FTP_PASSWORD
Value: [твой пароль от FTP]
```

### Шаг 2: Создать GitHub Action

Файл уже создан: `.github/workflows/deploy.yml`

Этот файл автоматически:
- Запускается при каждом push в ветку `main`
- Загружает все файлы на Hostinger через FTP
- Исключает ненужные файлы (node_modules, .git, и т.д.)

### Шаг 3: Проверить работу

1. Сделай любое изменение в файле (например, в index.html)
2. Сохрани локально
3. Когда скажешь "сохрани на git" - я закоммичу и запушу
4. GitHub автоматически загрузит изменения на Hostinger
5. Проверь сайт через 1-2 минуты

---

## Способ 2: Hostinger Git Integration (Если доступно)

⚠️ **Внимание**: Эта функция доступна не на всех тарифах Hostinger

### Шаг 1: Проверить доступность

1. Открой https://hpanel.hostinger.com/
2. Выбери домен **dispatch4you.com**
3. Найди раздел **"Git"** или **"Version Control"**
4. Если есть - переходи к Шагу 2
5. Если нет - используй Способ 1 (GitHub Actions)

### Шаг 2: Подключить репозиторий

1. В разделе Git нажми **"Create new repository"** или **"Add repository"**
2. Введи данные:
   - Repository URL: `https://github.com/Alex305cebo/dispatcher-courses.git`
   - Branch: `main`
   - Target directory: `/public_html/`
3. Нажми **"Create"** или **"Connect"**

### Шаг 3: Настроить автодеплой

1. Включи опцию **"Auto deploy"** или **"Automatic deployment"**
2. Выбери ветку: `main`
3. Сохрани настройки

### Шаг 4: Первый деплой

1. Нажми **"Pull"** или **"Deploy now"**
2. Дождись окончания (1-2 минуты)
3. Проверь сайт: https://dispatch4you.com/

---

## 🎯 Как это работает

### GitHub Actions (Способ 1):
```
Ты меняешь файл → Говоришь "сохрани на git" → 
Я делаю commit + push → GitHub Action запускается → 
Файлы загружаются на Hostinger через FTP → Готово!
```

### Hostinger Git (Способ 2):
```
Ты меняешь файл → Говоришь "сохрани на git" → 
Я делаю commit + push → Hostinger видит изменения → 
Автоматически скачивает с GitHub → Готово!
```

---

## ✅ Преимущества автодеплоя

- 🚀 Не нужно вручную загружать файлы
- ⚡ Изменения появляются автоматически
- 🔄 Всегда актуальная версия на сервере
- 📝 История всех изменений в Git
- 🔙 Легко откатиться к предыдущей версии

---

## 🔍 Проверка работы

После настройки:

1. Измени любой файл (например, добавь комментарий в index.html)
2. Скажи мне "сохрани на git"
3. Я сделаю commit и push
4. Подожди 1-2 минуты
5. Открой сайт и проверь изменения (Ctrl + F5)

---

## 🆘 Если не работает

### GitHub Actions:
- Проверь что секреты FTP созданы правильно
- Открой вкладку **Actions** в GitHub - там видны логи
- Проверь что FTP пароль правильный

### Hostinger Git:
- Убедись что репозиторий публичный (или добавь SSH ключ)
- Проверь что ветка `main` выбрана
- Проверь логи деплоя в Hostinger панели

---

## 📝 Текущий статус

- ✅ GitHub репозиторий: https://github.com/Alex305cebo/dispatcher-courses
- ✅ Ветка: main
- ✅ Файлы загружены
- ⏳ Автодеплой: нужно настроить (выбери способ выше)

---

## 🎉 Готово!

Выбери способ и следуй инструкции. Способ 1 (GitHub Actions) работает на всех тарифах Hostinger.
