# -*- coding: utf-8 -*-
import os
import re

# Список файлов для обработки
files_to_process = [
    'pages/modules.html',
    'pages/test-1.html',
    'pages/test-2.html',
    'pages/test-3.html',
    'pages/test-4.html',
    'pages/test-5.html',
    'pages/test-6.html',
    'pages/test-7.html',
    'pages/test-8.html',
    'pages/test-9.html',
    'pages/test-10.html',
    'pages/test-11.html',
    'pages/test-12.html',
]

nav_buttons = """<div style="display: flex; gap: 12px;">
                <a href="../course.html" class="btn btn-header" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); font-weight: 600; display: flex; align-items: center; gap: 8px; padding: 10px 18px; text-decoration: none; color: white; border-radius: 12px; transition: all 0.3s ease;">
                    <span style="font-size: 18px;">←</span>
                    <span style="font-size: 14px;">Назад</span>
                </a>
                <a href="../index.html" class="btn btn-header" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); font-weight: 600; display: flex; align-items: center; gap: 8px; padding: 10px 18px; text-decoration: none; color: white; border-radius: 12px; transition: all 0.3s ease;">
                    <span style="font-size: 18px;">🏠</span>
                    <span style="font-size: 14px;">Главная</span>
                </a>
            </div>"""

processed = 0
skipped = 0

for filepath in files_to_process:
    if not os.path.exists(filepath):
        print(f'File not found: {filepath}')
        skipped += 1
        continue
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        modified = False
        
        # Найти и заменить старую кнопку "Назад" на новые две кнопки
        # Паттерн для поиска старой кнопки
        old_button_patterns = [
            r'<a href="[^"]*" class="back-btn"[^>]*>.*?Назад.*?</a>',
            r'<a href="[^"]*" class="btn[^"]*"[^>]*>.*?← Назад.*?</a>',
        ]
        
        for pattern in old_button_patterns:
            if re.search(pattern, content, re.DOTALL):
                # Заменяем старую кнопку на новые две
                content = re.sub(pattern, nav_buttons, content, flags=re.DOTALL)
                modified = True
                print(f'{filepath}: Old button replaced with new nav buttons')
                break
        
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            processed += 1
            print(f'{filepath}: ✓ Updated')
        else:
            print(f'{filepath}: No old button found or already updated')
            skipped += 1
            
    except Exception as e:
        print(f'{filepath}: Error - {e}')
        skipped += 1

print(f'\n=== Summary ===')
print(f'Processed: {processed}')
print(f'Skipped: {skipped}')
print(f'Total: {processed + skipped}')
print('Done!')
