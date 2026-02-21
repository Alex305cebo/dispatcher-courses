/**
 * dark-mode.js — Переключатель темы + обработка inline стилей
 * Курсы Диспетчера
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'dispatcher-theme';
  var darkApplied = [];

  /* ---- Карта замены цветов текста (inline style) ---- */
  var TEXT_COLOR_MAP = {
    '#166534': '#34d399', '#15803d': '#34d399',
    '#065f46': '#34d399', '#047857': '#34d399',
    '#1e40af': '#93c5fd', '#1e3a8a': '#93c5fd',
    '#92400e': '#fbbf24', '#78350f': '#fbbf24',
    '#9f1239': '#f9a8d4', '#831843': '#f9a8d4',
    '#3730a3': '#a5b4fc', '#4338ca': '#a5b4fc',
    '#5b21b6': '#c4b5fd', '#6b21a8': '#c4b5fd',
    '#991b1b': '#fca5a5', '#7f1d1d': '#fca5a5',
    '#c53030': '#fca5a5', '#742a2a': '#fca5a5',
    '#2d3748': '#e2e8f0', '#1e293b': '#e2e8f0',
    '#4a5568': '#94a3b8', '#374151': '#d1d5db',
    '#475569': '#94a3b8', '#718096': '#94a3b8',
    '#64748b': '#94a3b8', '#1a202c': '#e2e8f0'
  };

  /* ---- Определение тёмного фона для светлых inline градиентов ---- */
  function getDarkBg(s) {
    if (/linear-gradient.*(?:#f0fdf4|#dcfce7|#d1fae5|#a7f3d0)/i.test(s)) return 'rgba(16,185,129,0.07)';
    if (/linear-gradient.*(?:#dbeafe|#bfdbfe)/i.test(s))                  return 'rgba(59,130,246,0.07)';
    if (/linear-gradient.*(?:#fef3c7|#fde68a)/i.test(s))                  return 'rgba(245,158,11,0.07)';
    if (/linear-gradient.*(?:#fce7f3|#fbcfe8)/i.test(s))                  return 'rgba(236,72,153,0.07)';
    if (/linear-gradient.*(?:#e0e7ff|#c7d2fe)/i.test(s))                  return 'rgba(99,102,241,0.07)';
    if (/linear-gradient.*(?:#ddd6fe|#c4b5fd)/i.test(s))                  return 'rgba(139,92,246,0.07)';
    if (/linear-gradient.*(?:#fee2e2|#fecaca)/i.test(s))                  return 'rgba(239,68,68,0.07)';
    if (/linear-gradient.*(?:#fff5f5|#fed7d7)/i.test(s))                  return 'rgba(239,68,68,0.06)';
    if (/linear-gradient.*(?:#f7fafc|#edf2f7|#f8fafc|#f1f5f9)/i.test(s)) return '#16192e';
    if (/background(?:-color)?:\s*(?:white|#fff(?:fff)?)\b/i.test(s))     return '#1e213a';
    if (/background(?:-color)?:\s*rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.9/i.test(s)) return '#1e213a';
    return null;
  }

  /* ---- Применить тёмные inline стили ---- */
  function applyDarkInline() {
    darkApplied = [];
    document.querySelectorAll('[style]').forEach(function (el) {
      var styleAttr = el.getAttribute('style');
      if (!styleAttr) return;

      var saved = { el: el };
      var changed = false;

      // Фон
      var darkBg = getDarkBg(styleAttr);
      if (darkBg) {
        saved.background = el.style.background;
        el.style.background = darkBg;
        changed = true;
      }

      // Цвет текста
      var col = (el.style.color || '').trim().toLowerCase();
      if (col && TEXT_COLOR_MAP[col]) {
        saved.color = el.style.color;
        el.style.color = TEXT_COLOR_MAP[col];
        changed = true;
      }

      if (changed) darkApplied.push(saved);
    });
  }

  /* ---- Вернуть оригинальные inline стили ---- */
  function revertDarkInline() {
    darkApplied.forEach(function (saved) {
      if (saved.background !== undefined) saved.el.style.background = saved.background;
      if (saved.color !== undefined)      saved.el.style.color      = saved.color;
    });
    darkApplied = [];
  }

  /* ---- Обновить иконку кнопки ---- */
  function updateBtn(isDark) {
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    var icon = btn.querySelector('.toggle-icon');
    var label = btn.querySelector('.toggle-label');
    if (icon)  icon.textContent  = isDark ? '☀️' : '🌙';
    if (label) label.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  }

  /* ---- Применить тему ---- */
  function setTheme(isDark, save) {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      applyDarkInline();
    } else {
      document.documentElement.removeAttribute('data-theme');
      revertDarkInline();
    }
    if (save) localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    updateBtn(isDark);
  }

  /* ---- Создать кнопку переключения ---- */
  function createToggleBtn() {
    if (document.getElementById('theme-toggle-btn')) return;

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.setAttribute('title', 'Переключить тему');
    btn.innerHTML =
      '<span class="toggle-icon">' + (isDark ? '☀️' : '🌙') + '</span>' +
      '<span class="toggle-label">' + (isDark ? 'Светлая тема' : 'Тёмная тема') + '</span>';

    btn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(!dark, true);
    });

    document.body.appendChild(btn);
  }

  /* ---- Инициализация ---- */
  function init() {
    // Тема уже установлена на html (anti-FOUC скрипт), применяем inline стили
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) applyDarkInline();

    // Создаём кнопку
    createToggleBtn();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
