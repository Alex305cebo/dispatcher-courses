# 🎨 Руководство по стилям проекта "Курсы Диспетчера"

## 📐 Единые стандарты дизайна

### Цветовая палитра

**Основной градиент фона:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Анимированный фон:**
```css
radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.3), transparent 50%),
radial-gradient(circle at 40% 20%, rgba(75, 0, 130, 0.2), transparent 50%)
```

**Цвета кнопок:**
- Главная (Secondary): `rgba(255, 255, 255, 0.25)` с backdrop-filter
- Модули (Success): `linear-gradient(135deg, #16a34a, #15803d)`
- Тесты (Warning): `linear-gradient(135deg, #f59e0b, #d97706)`
- Симулятор (Primary): `linear-gradient(135deg, #3b82f6, #2563eb)`

### Размеры и отступы

**Контейнеры:**
- `max-width: 1050px` - единая ширина для всех страниц (уменьшено на 25%)
- `width: 100%` - адаптивность
- `margin: 0 auto` - центрирование

**Body:**
- `padding: 30px 20px` - единые отступы
- `min-height: 100vh` - на всю высоту экрана
- `text-align: center` - весь текст по центру

**Карточки (header, card, content-card):**
- `padding: 40px` - внутренние отступы
- `border-radius: 20px` - скругление углов
- `margin-bottom: 30px` - отступ снизу
- `box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3)` - глубокая тень
- `backdrop-filter: blur(10px)` - эффект размытия

### Типографика

**ЕДИНЫЙ ШРИФТ ДЛЯ ВСЕГО ПРОЕКТА:**
```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

**Заголовки:**
- H1: `font-size: 36px`, `font-weight: 700`, `text-align: center`
- H2: `font-size: 28px`, `font-weight: 600`, `text-align: center`
- H3: `font-size: 22px`, `font-weight: 600`, `text-align: center`
- Цвет: `#2d3748`

**Основной текст:**
- `font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- `font-size: 18px` - базовый размер (увеличен для читабельности)
- `line-height: 1.8` - межстрочный интервал
- `text-align: center` - выравнивание по центру

**ВАЖНО:** Все тексты должны быть выровнены по центру для единообразия!

### Кнопки

**Стандартная кнопка (pill-style):**
```css
padding: 14px 28px;
border-radius: 50px; /* ВСЕГДА pill-style! */
font-weight: 700;
font-size: 15px;
box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
text-transform: uppercase;
letter-spacing: 0.5px;
```

**Эффект при наведении:**
```css
transform: translateY(-4px) scale(1.05);
box-shadow: 0 8px 25px rgba(цвет кнопки, 0.5);
```

**ВАЖНО:** Все кнопки должны быть в стиле pill (border-radius: 50px) с uppercase текстом!

### Навигация

**НАВИГАЦИЯ УДАЛЕНА** - страницы работают без глобальной навигации

### Анимации

**Фон:**
```css
@keyframes backgroundMove {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(5%, 5%) scale(1.05); }
    50% { transform: translate(-5%, 5%) scale(1.1); }
    75% { transform: translate(5%, -5%) scale(1.05); }
}
animation: backgroundMove 20s ease infinite;
```

**Появление элементов:**
```css
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
animation: fadeInUp 0.8s ease;
```

### Адаптивность

**Мобильные устройства (max-width: 768px):**
- Body padding: `20px 15px`
- Карточки padding: `25px 20px`
- H1: `font-size: 28px`
- H2: `font-size: 24px`
- Кнопки: `padding: 12px 22px`, `font-size: 13px`

## 📋 Чек-лист для новых страниц

- [ ] Фон: градиент #667eea → #764ba2
- [ ] Анимация фона: backgroundMove
- [ ] Контейнер: max-width 1050px
- [ ] Карточки: border-radius 20px, box-shadow глубокая
- [ ] Backdrop-filter: blur(10px)
- [ ] Кнопки: border-radius 50px (pill-style)
- [ ] Шрифт: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- [ ] Размер текста: 18px, line-height: 1.8
- [ ] Выравнивание: text-align: center
- [ ] Адаптивные стили для мобильных
- [ ] Единые отступы и padding
- [ ] Правильная типографика

## 🎯 Применено на страницах

✅ Главная (index.html)
✅ Модули (modules.html + module-1.html до module-10.html)
✅ Тесты (testing.html + test-1.html до test-10.html)
✅ Симулятор (simulator.html)
✅ Документация (documentation.html)
✅ Load Board (loadboard.html, loadboard-full.html)
✅ Практические кейсы (cases.html)

**Всего унифицировано: 35+ страниц**

## 🎯 Критически важно!

### Единый стиль шрифтов (ВСЕГДА):
- **font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif** - единый шрифт
- **font-size: 18px** - базовый размер текста
- **line-height: 1.8** - межстрочный интервал
- **text-align: center** - выравнивание по центру

### Единый стиль кнопок (ВСЕГДА):
- **border-radius: 50px** - все кнопки pill-style
- **text-transform: uppercase** - весь текст заглавными
- **letter-spacing: 0.5px** - межбуквенный интервал
- **transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)** - плавная анимация
- **transform: translateY(-4px) scale(1.05)** - эффект при наведении

### Применяется к:
- Кнопки действий (.btn, .back-btn)
- Все интерактивные элементы

**НЕ ИСПОЛЬЗУЙТЕ другие шрифты или выравнивание!**


### Списки (ul/li)

**ВАЖНО: Все списки должны быть по центру!**
```css
ul {
    text-align: center;
    list-style-position: inside;
    font-size: 18px;
    line-height: 1.8;
}

li {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 18px;
    line-height: 1.8;
}
```

**НЕ ИСПОЛЬЗУЙТЕ text-align: left для списков!**
