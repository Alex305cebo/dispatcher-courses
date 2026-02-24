# 🌐 Настройка домена dispatch4you.com для GitHub Pages

## Шаг 1: Загрузить CNAME файл на GitHub

Скажи **"сохрани на git"** чтобы я загрузил файл CNAME в репозиторий.

## Шаг 2: Настроить DNS в Hostinger

### 2.1 Зайди в hPanel Hostinger
1. Открой https://hpanel.hostinger.com
2. Войди в свой аккаунт

### 2.2 Перейди в DNS Zone Editor
1. Найди домен **dispatch4you.com**
2. Нажми **Manage** (Управление)
3. Перейди в раздел **DNS / Name Servers**
4. Выбери **DNS Zone Editor**

### 2.3 Удали существующие A записи (если есть)
- Удали все старые A записи для @ (root)
- Удали старые CNAME записи для www (если есть)

### 2.4 Добавь новые DNS записи для GitHub Pages

**A записи (добавь все 4):**
```
Type: A
Name: @
Points to: 185.199.108.153
TTL: 14400 (или оставь по умолчанию)
```

```
Type: A
Name: @
Points to: 185.199.109.153
TTL: 14400
```

```
Type: A
Name: @
Points to: 185.199.110.153
TTL: 14400
```

```
Type: A
Name: @
Points to: 185.199.111.153
TTL: 14400
```

**CNAME запись для www:**
```
Type: CNAME
Name: www
Points to: alex305cebo.github.io
TTL: 14400
```

### 2.5 Сохрани изменения
Нажми **Save** или **Add Record** для каждой записи.

## Шаг 3: Настроить GitHub Pages

1. Открой https://github.com/Alex305cebo/dispatcher-courses
2. Перейди в **Settings** → **Pages**
3. В разделе **Custom domain** введи: `dispatch4you.com`
4. Нажми **Save**
5. Подожди 1-2 минуты
6. Поставь галочку **Enforce HTTPS** (для SSL сертификата)

## Шаг 4: Подожди распространения DNS

⏱️ DNS изменения могут занять от 5 минут до 48 часов (обычно 15-30 минут)

Проверить статус можно здесь:
- https://www.whatsmydns.net/#A/dispatch4you.com
- https://www.whatsmydns.net/#CNAME/www.dispatch4you.com

## Шаг 5: Проверка

После распространения DNS:
1. Открой http://dispatch4you.com
2. Открой http://www.dispatch4you.com
3. Оба должны работать и перенаправлять на HTTPS

## 🎉 Готово!

Твой сайт будет доступен по адресу:
- https://dispatch4you.com
- https://www.dispatch4you.com

## Если что-то не работает:

### Проблема: "Domain's DNS record could not be retrieved"
**Решение:** Подожди 15-30 минут, DNS еще не распространился

### Проблема: Сайт не открывается
**Решение:** 
1. Проверь DNS записи в Hostinger
2. Убедись что CNAME файл загружен в GitHub
3. Проверь настройки в GitHub Pages

### Проблема: SSL сертификат не работает
**Решение:**
1. Подожди 24 часа после настройки DNS
2. В GitHub Pages сними галочку "Enforce HTTPS"
3. Подожди 5 минут
4. Поставь галочку обратно

## Скриншоты для Hostinger

### Где найти DNS Zone Editor:
```
hPanel → Domains → dispatch4you.com → Manage → DNS Zone Editor
```

### Как должны выглядеть записи:
```
Type    Name    Points to                TTL
A       @       185.199.108.153         14400
A       @       185.199.109.153         14400
A       @       185.199.110.153         14400
A       @       185.199.111.153         14400
CNAME   www     alex305cebo.github.io   14400
```

---

**Сначала скажи "сохрани на git" чтобы загрузить CNAME файл!** 🚀
