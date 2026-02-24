# -*- coding: utf-8 -*-
import re

# Словарь замен кракозябр на правильный текст
replacements = {
    '������': 'Модуль',
    '����� ������': 'О чём модуль',
    '�� ����� ������': '📚 О чём модуль',
    '��������� ����': 'Следующие шаги',
    '�� ��������� ����': '🎯 Следующие шаги',
    '������ ����������': 'Совет начинающим',
    '�� ������ ����������': '💡 Совет начинающим',
    '��������� ������:': 'Следующий модуль:',
    '���������� ������': 'Предыдущий модуль',
    '����� � �������': 'Назад к модулям',
    '�� 10': 'из 10',
    '>': '→',
    '<': '←',
    '^': '↑',
}

# Обрабатываем модули 5-12
for module_num in range(5, 13):
    file_path = f'pages/module-{module_num}.html'
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Применяем все замены
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        # Сохраняем
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'✓ Модуль {module_num} обработан')
        
    except Exception as e:
        print(f'✗ Ошибка в модуле {module_num}: {e}')

print('\nВсе модули исправлены!')
