# 📱 Инструкция по сборке мобильного приложения

## Обзор

Приложение "Курсы - Диспетчера" может быть упаковано для Android и iOS несколькими способами:

1. **PWA (Progressive Web App)** - Установка через браузер (самый простой способ)
2. **Capacitor** - Нативная упаковка для магазинов приложений
3. **Cordova** - Альтернативный метод нативной упаковки

---

## 🌐 Метод 1: PWA (Рекомендуется для быстрого старта)

### Преимущества:
- ✅ Не требует публикации в магазинах
- ✅ Мгновенные обновления
- ✅ Работает на всех платформах
- ✅ Не требует разработческих аккаунтов

### Установка PWA:

#### На Android:
1. Откройте сайт в Chrome
2. Нажмите меню (три точки)
3. Выберите "Установить приложение" или "Добавить на главный экран"
4. Приложение появится на рабочем столе

#### На iOS:
1. Откройте сайт в Safari
2. Нажмите кнопку "Поделиться" (квадрат со стрелкой)
3. Выберите "На экран «Домой»"
4. Нажмите "Добавить"

### Требования для PWA:
- ✅ HTTPS соединение (обязательно)
- ✅ manifest.json (уже создан)
- ✅ service-worker.js (уже создан)
- ✅ Иконки приложения (нужно создать)

---

## 📦 Метод 2: Capacitor (Для публикации в магазинах)

### Установка Capacitor:

```bash
# 1. Установите Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# 2. Инициализируйте Capacitor
npx cap init "Диспетчер США" "com.dispatcher.courses" --web-dir=.

# 3. Добавьте платформы
npx cap add android
npx cap add ios

# 4. Синхронизируйте файлы
npx cap sync

# 5. Откройте проекты
npx cap open android  # Для Android Studio
npx cap open ios      # Для Xcode (только на Mac)
```

### Сборка для Android:

```bash
# 1. Откройте Android Studio
npx cap open android

# 2. В Android Studio:
# - Build > Generate Signed Bundle / APK
# - Выберите APK или AAB
# - Создайте keystore (если нет)
# - Подпишите приложение

# 3. Файл будет в: android/app/build/outputs/apk/release/
```

### Сборка для iOS:

```bash
# 1. Откройте Xcode (только на Mac)
npx cap open ios

# 2. В Xcode:
# - Product > Archive
# - Выберите архив
# - Distribute App
# - Выберите метод распространения

# Требования:
# - Mac с Xcode
# - Apple Developer Account ($99/год)
# - Сертификаты и профили
```

---

## 🔧 Метод 3: Cordova (Альтернатива)

### Установка Cordova:

```bash
# 1. Установите Cordova
npm install -g cordova

# 2. Создайте проект
cordova create dispatcher-app com.dispatcher.courses "Диспетчер США"
cd dispatcher-app

# 3. Скопируйте файлы
# Скопируйте все HTML/CSS/JS файлы в папку www/

# 4. Добавьте платформы
cordova platform add android
cordova platform add ios

# 5. Соберите приложение
cordova build android
cordova build ios
```

---

## 🎨 Создание иконок приложения

### Требуемые размеры:

```
icons/
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
└── icon-512x512.png
```

### Инструменты для создания иконок:

1. **PWA Asset Generator** (автоматически):
```bash
npm install -g pwa-asset-generator
pwa-asset-generator logo.png icons/
```

2. **Online генераторы**:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/
- https://app-manifest.firebaseapp.com/

3. **Вручную**:
- Создайте PNG изображение 512x512px
- Используйте Photoshop/GIMP для ресайза

---

## 📝 Конфигурация capacitor.config.json

```json
{
  "appId": "com.dispatcher.courses",
  "appName": "Диспетчер США",
  "webDir": ".",
  "bundledWebRuntime": false,
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "backgroundColor": "#667eea",
      "showSpinner": true,
      "spinnerColor": "#ffffff"
    }
  }
}
```

---

## 🚀 Публикация в магазинах

### Google Play Store (Android):

1. **Требования**:
   - Google Play Developer Account ($25 единоразово)
   - Подписанный APK/AAB файл
   - Иконки и скриншоты
   - Описание приложения

2. **Процесс**:
   - Зайдите в Google Play Console
   - Создайте новое приложение
   - Загрузите AAB файл
   - Заполните информацию о приложении
   - Отправьте на проверку (1-3 дня)

### Apple App Store (iOS):

1. **Требования**:
   - Apple Developer Account ($99/год)
   - Mac с Xcode
   - Архив приложения (.ipa)
   - Иконки и скриншоты
   - Описание приложения

2. **Процесс**:
   - Зайдите в App Store Connect
   - Создайте новое приложение
   - Загрузите через Xcode или Transporter
   - Заполните информацию
   - Отправьте на проверку (1-7 дней)

---

## 🔐 Требования безопасности

### Android:
- Подпись приложения (keystore)
- Минимальная версия SDK: 21 (Android 5.0)
- Target SDK: 33 (Android 13)

### iOS:
- Сертификаты разработчика
- Provisioning profiles
- Минимальная версия: iOS 13.0

---

## 📊 Тестирование

### Перед публикацией протестируйте:

1. **Функциональность**:
   - Все страницы открываются
   - Фильтры работают
   - Данные загружаются

2. **Производительность**:
   - Быстрая загрузка
   - Плавная прокрутка
   - Нет зависаний

3. **Совместимость**:
   - Разные размеры экранов
   - Портретная/ландшафтная ориентация
   - Разные версии ОС

4. **Offline режим**:
   - Service Worker кеширует страницы
   - Работа без интернета

---

## 💡 Рекомендации

### Для быстрого старта:
1. Используйте PWA (не требует магазинов)
2. Разместите на HTTPS хостинге
3. Пользователи установят через браузер

### Для профессионального релиза:
1. Используйте Capacitor
2. Создайте нативные приложения
3. Опубликуйте в магазинах
4. Получите больше доверия пользователей

---

## 🆘 Поддержка

### Полезные ресурсы:
- Capacitor Docs: https://capacitorjs.com/docs
- PWA Guide: https://web.dev/progressive-web-apps/
- Android Developers: https://developer.android.com/
- iOS Developer: https://developer.apple.com/

### Сообщество:
- Stack Overflow
- GitHub Issues
- Discord/Slack каналы

---

## ✅ Чеклист перед публикацией

- [ ] Создать все иконки (72px - 512px)
- [ ] Настроить manifest.json
- [ ] Протестировать на реальных устройствах
- [ ] Подготовить скриншоты для магазинов
- [ ] Написать описание приложения
- [ ] Настроить политику конфиденциальности
- [ ] Получить разработческие аккаунты
- [ ] Подписать приложение
- [ ] Загрузить в магазины
- [ ] Дождаться одобрения

---

**Версия**: 1.0.0  
**Дата**: Февраль 2026  
**Статус**: Готово к сборке
