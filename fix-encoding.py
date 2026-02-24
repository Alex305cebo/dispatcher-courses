# -*- coding: utf-8 -*-
import os

# Список файлов для исправления
files_to_fix = [
    'pages/module-3.html',
    'pages/module-4.html',
    'pages/module-5.html',
    'pages/module-6.html',
    'pages/module-7.html',
    'pages/module-8.html',
    'pages/module-9.html',
    'pages/module-10.html',
    'pages/module-11.html',
    'pages/module-12.html'
]

for file_path in files_to_fix:
    if os.path.exists(file_path):
        print(f'Исправляю: {file_path}')
        try:
            # Читаем файл с правильной кодировкой
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Сохраняем обратно в UTF-8
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f'✓ Готово: {file_path}')
        except Exception as e:
            print(f'✗ Ошибка в {file_path}: {e}')
    else:
        print(f'✗ Файл не найден: {file_path}')

print('\nВсе файлы обработаны!')
