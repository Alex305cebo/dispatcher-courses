# UI Components Library

Переиспользуемые UI компоненты для проекта Dispatcher Courses.

## Компоненты

### Button (`button.html`)
Кнопки с разными стилями.

**Варианты:**
- `.btn-primary` - основная кнопка (градиент)
- `.btn-secondary` - вторичная кнопка (контур)
- `.btn-outline` - контурная кнопка

**Пример:**
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<a href="#" class="btn btn-outline">Outline Link</a>
```

### Card (`card.html`)
Карточки для отображения контента.

**Структура:**
- `.card` - контейнер карточки
- `.card-header` - заголовок
- `.card-body` - основной контент
- `.card-footer` - подвал
- `.card-title` - заголовок контента
- `.card-description` - описание

**Пример:**
```html
<div class="card">
  <div class="card-body">
    <h3 class="card-title">Заголовок</h3>
    <p class="card-description">Описание</p>
  </div>
</div>
```

### Badge (`badge.html`)
Значки для отметок и статусов.

**Варианты:**
- `.badge-primary` - основной значок
- `.badge-secondary` - вторичный значок
- `.badge-success` - успешный статус
- `.badge-warning` - предупреждение

**Пример:**
```html
<span class="badge badge-primary">New</span>
<span class="badge badge-success">Active</span>
```

### Grid (`grid.html`)
Сетка для расположения элементов.

**Варианты:**
- `.grid-cols-1` - 1 колонка
- `.grid-cols-2` - 2 колонки
- `.grid-cols-3` - 3 колонки
- `.grid-cols-4` - 4 колонки

**Отступы:**
- `.gap-2` - 8px
- `.gap-4` - 16px
- `.gap-6` - 24px
- `.gap-8` - 32px

**Пример:**
```html
<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Использование

Все компоненты используют переменные CSS и темную тему проекта.

Цветовая схема:
- Основной цвет: `#6366f1` (индиго)
- Вторичный цвет: `#8b5cf6` (фиолетовый)
- Успех: `#10b981` (зеленый)
- Предупреждение: `#fbbf24` (желтый)
- Фон: `#0a0e1a` (темный)

## Адаптивность

Все компоненты адаптивны и работают на мобильных устройствах.

Точки разрыва:
- `768px` - планшеты
- `1024px` - большие экраны
