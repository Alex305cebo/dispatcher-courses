// Защита контента от копирования и скриншотов
// Этот скрипт должен быть подключен на всех страницах курсов

(function() {
  'use strict';

  // Отключение контекстного меню (правый клик)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Отключение выделения текста через CSS
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
    }
    
    /* Защита от скриншотов через CSS */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 999999;
      mix-blend-mode: difference;
      opacity: 0.01;
    }
  `;
  document.head.appendChild(style);

  // Блокировка горячих клавиш
  document.addEventListener('keydown', function(e) {
    // Ctrl+C, Cmd+C (копирование)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+X, Cmd+X (вырезание)
    if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+A, Cmd+A (выделить все)
    if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+U, Cmd+U (просмотр исходного кода)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+S, Cmd+S (сохранить страницу)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+P, Cmd+P (печать)
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      return false;
    }
    
    // F12, Ctrl+Shift+I, Cmd+Option+I (DevTools)
    if (e.key === 'F12' || 
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i')) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+C, Cmd+Option+C (инспектор элементов)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      return false;
    }
    
    // Ctrl+Shift+J, Cmd+Option+J (консоль)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      return false;
    }
    
    // PrintScreen, Cmd+Shift+3, Cmd+Shift+4 (скриншоты)
    if (e.key === 'PrintScreen' || e.key === 'Print') {
      e.preventDefault();
      // Очищаем буфер обмена
      navigator.clipboard.writeText('').catch(() => {});
      return false;
    }
  });

  // Блокировка копирования через события
  document.addEventListener('copy', function(e) {
    e.preventDefault();
    e.clipboardData.setData('text/plain', '');
    return false;
  });

  document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
  });

  // Блокировка drag & drop
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Блокировка выделения через мышь
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Защита изображений от сохранения
  document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
      });
      
      // Добавляем прозрачный слой поверх изображений
      img.style.pointerEvents = 'none';
    });
  });

  // Обнаружение DevTools (дополнительная защита)
  let devtoolsOpen = false;
  const threshold = 160;
  
  setInterval(function() {
    if (window.outerWidth - window.innerWidth > threshold || 
        window.outerHeight - window.innerHeight > threshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        // Можно добавить предупреждение или действие
        console.clear();
      }
    } else {
      devtoolsOpen = false;
    }
  }, 1000);

  // Очистка консоли каждые 100мс
  setInterval(function() {
    console.clear();
  }, 100);

  // Защита от скриншотов через Page Visibility API
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      // Страница скрыта - возможно делают скриншот
      document.body.style.opacity = '0';
    } else {
      document.body.style.opacity = '1';
    }
  });

  // Блокировка Print Screen через буфер обмена
  window.addEventListener('keyup', function(e) {
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
    }
  });

  // Водяной знак (невидимый для пользователя, но видимый на скриншотах)
  const watermark = document.createElement('div');
  watermark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 80px;
    color: rgba(255, 255, 255, 0.02);
    pointer-events: none;
    z-index: 999998;
    white-space: nowrap;
    user-select: none;
  `;
  watermark.textContent = 'ЗАЩИЩЕНО ОТ КОПИРОВАНИЯ';
  document.body.appendChild(watermark);

  // Предотвращение инспектирования элементов
  document.addEventListener('mousedown', function(e) {
    if (e.button === 2) { // Правая кнопка мыши
      e.preventDefault();
      return false;
    }
  });

  // Блокировка длинного нажатия на мобильных устройствах
  let pressTimer;
  document.addEventListener('touchstart', function(e) {
    pressTimer = setTimeout(function() {
      e.preventDefault();
    }, 500);
  });

  document.addEventListener('touchend', function() {
    clearTimeout(pressTimer);
  });

  document.addEventListener('touchmove', function() {
    clearTimeout(pressTimer);
  });

  // Защита от автоматического заполнения форм (если есть)
  document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('readonly', 'readonly');
      
      // Снимаем readonly при фокусе для возможности ввода
      input.addEventListener('focus', function() {
        this.removeAttribute('readonly');
      });
      
      input.addEventListener('blur', function() {
        this.setAttribute('readonly', 'readonly');
      });
    });
  });

  // Сообщение при попытке копирования
  let copyAttempts = 0;
  document.addEventListener('copy', function() {
    copyAttempts++;
    if (copyAttempts === 1) {
      // Можно показать уведомление пользователю
      console.log('Копирование контента запрещено');
    }
  });

  // Защита от расширений браузера для скриншотов
  Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined
  });

})();

// Дополнительная защита - переопределение функций консоли
(function() {
  const noop = function() {};
  const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'group', 'groupCollapsed', 'groupEnd', 'clear'];
  
  methods.forEach(method => {
    console[method] = noop;
  });
})();
