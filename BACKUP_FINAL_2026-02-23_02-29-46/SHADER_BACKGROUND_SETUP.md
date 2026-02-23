# Shader Background Setup

## ✅ Статус: ЗАВЕРШЕНО

Успешно установлены и интегрированы компоненты Paper Shaders с Three.js для создания анимированного фона.

## 📦 Установленные зависимости

```bash
npm install @react-three/fiber three --legacy-peer-deps
```

### Версии:
- `@react-three/fiber`: ^9.5.0
- `three`: ^r128+

## 📁 Созданные файлы

### 1. **src/components/ui/background-paper-shaders.tsx**
Основной компонент с шейдерами:

#### ShaderPlane
Плоскость с анимированным шейдером:
```tsx
<ShaderPlane 
  position={[0, 0, 0]} 
  color1="#6366f1" 
  color2="#8b5cf6" 
/>
```

**Параметры:**
- `position` - позиция в 3D пространстве [x, y, z]
- `color1` - первый цвет градиента (hex)
- `color2` - второй цвет градиента (hex)

#### EnergyRing
Кольцо с анимацией:
```tsx
<EnergyRing 
  radius={2} 
  position={[0, 0, -1]} 
/>
```

**Параметры:**
- `radius` - радиус кольца
- `position` - позиция в 3D пространстве

### 2. **src/components/ui/shader-background.tsx**
Canvas компонент для использования шейдеров:

```tsx
<ShaderBackground 
  color1="#6366f1" 
  color2="#8b5cf6" 
  className="custom-class"
/>
```

**Параметры:**
- `color1` - первый цвет (hex)
- `color2` - второй цвет (hex)
- `className` - дополнительные CSS классы

## 🎨 Использование в app/page.tsx

```tsx
import { ShaderBackground } from '@/components/ui/shader-background';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <ShaderBackground color1="#6366f1" color2="#8b5cf6" />
        <div className="max-w-[1200px] mx-auto px-5 relative z-10">
          {/* Содержимое */}
        </div>
      </section>
    </>
  );
}
```

## 🔧 Шейдеры

### Vertex Shader
- Анимирует позицию вершин на основе времени
- Создает волнообразный эффект
- Использует sin/cos функции для плавного движения

### Fragment Shader
- Создает анимированный паттерн шума
- Смешивает два цвета на основе шума
- Добавляет эффект свечения (glow)
- Использует радиальный градиент

## 🎬 Анимация

- **Время**: Синхронизируется с часами Three.js
- **Интенсивность**: Пульсирует от 0.7 до 1.3
- **Скорость**: Контролируется через uniforms
- **Плавность**: 60 FPS через requestAnimationFrame

## 🌈 Цвета

Текущие цвета в Hero Section:
- **color1**: #6366f1 (Индиго)
- **color2**: #8b5cf6 (Фиолетовый)

Можно изменить на любые hex цвета:
```tsx
<ShaderBackground color1="#ff5722" color2="#ffffff" />
```

## 📱 Адаптивность

- Canvas автоматически масштабируется под размер контейнера
- Работает на всех размерах экранов
- Оптимизирован для мобильных устройств

## ⚡ Производительность

- Использует WebGL для ускорения
- Оптимизированные шейдеры
- Минимальное использование памяти
- Плавная анимация на всех устройствах

## 🔗 Интеграция

Компоненты полностью интегрированы с:
- React 18.2+
- Next.js 14
- Tailwind CSS
- TypeScript

## 📝 Примечания

1. **Canvas требует контейнера** - ShaderBackground должен быть в контейнере с `relative overflow-hidden`
2. **Z-index** - Используйте `relative z-10` для содержимого над фоном
3. **Производительность** - На слабых устройствах может потребоваться снижение качества
4. **Браузеры** - Требует поддержки WebGL (все современные браузеры)

## 🚀 Расширение

Для добавления новых шейдеров:

1. Создайте новые vertex/fragment шaders
2. Добавьте новый компонент в `background-paper-shaders.tsx`
3. Используйте в `shader-background.tsx` через Canvas

## 📚 Ресурсы

- [Three.js Documentation](https://threejs.org/docs/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GLSL Shaders](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
