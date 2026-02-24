# -*- coding: utf-8 -*-
import codecs

# Словарь с правильными заголовками модулей
modules_info = {
    5: {
        'title': 'Модуль 5: Взаимодействие с брокерами',
        'subtitle': 'Коммуникативные навыки и переговоры',
        'h1': 'Взаимодействие с брокерами'
    },
    6: {
        'title': 'Модуль 6: Работа с водителями',
        'subtitle': 'Координация перевозчиков и водителей',
        'h1': 'Работа с водителями'
    },
    7: {
        'title': 'Модуль 7: Документооборот и отчётность',
        'subtitle': 'Управление документами и учётом рейсов',
        'h1': 'Документооборот и отчётность'
    },
    8: {
        'title': 'Модуль 8: Решение проблем и конфликтов',
        'subtitle': 'Управление сложными ситуациями',
        'h1': 'Решение проблем и конфликтов'
    },
    9: {
        'title': 'Модуль 9: Финансы и учёт',
        'subtitle': 'Управление финансами перевозок',
        'h1': 'Финансы и учёт'
    },
    10: {
        'title': 'Модуль 10: Построение карьеры диспетчера',
        'subtitle': 'Развитие и масштабирование бизнеса',
        'h1': 'Построение карьеры диспетчера'
    },
    11: {
        'title': 'Модуль 11: Дополнительные темы',
        'subtitle': 'Специализированные знания',
        'h1': 'Дополнительные темы'
    },
    12: {
        'title': 'Модуль 12: Итоговая аттестация',
        'subtitle': 'Проверка знаний и сертификация',
        'h1': 'Итоговая аттестация'
    }
}

for module_num in range(5, 13):
    file_path = f'pages/module-{module_num}.html'
    info = modules_info[module_num]
    
    try:
        # Читаем оригинальный файл
        with codecs.open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
        # Заменяем кракозябры на правильный текст в заголовках
        content = content.replace(
            f'<title>������ {module_num}:',
            f'<title>{info["title"]} |'
        )
        
        # Заменяем в badge
        content = content.replace(
            f'<span>������ {module_num} �� 10</span>',
            f'<span>Модуль {module_num} из 10</span>'
        )
        
        # Заменяем кнопку назад
        content = content.replace(
            '����� � �������',
            'Назад к модулям'
        )
        
        # Заменяем h1
        if '������' in content:
            # Находим и заменяем h1
            import re
            content = re.sub(
                r'<h1>[^<]+</h1>',
                f'<h1>{info["h1"]}</h1>',
                content,
                count=1
            )
        
        # Заменяем subtitle
        content = content.replace(
            '<p class="subtitle">������',
            f'<p class="subtitle">{info["subtitle"]}'
        )
        
        # Заменяем "О чём модуль"
        content = content.replace('����� ������', 'О чём модуль')
        content = content.replace('�� ����� ������', '📚 О чём модуль')
        
        # Заменяем "Следующие шаги"
        content = content.replace('��������� ����', 'Следующие шаги')
        content = content.replace('�� ��������� ����', '🎯 Следующие шаги')
        
        # Заменяем "Совет начинающим"
        content = content.replace('������ ����������', 'Совет начинающим')
        content = content.replace('�� ������ ����������', '💡 Совет начинающим')
        
        # Заменяем кнопки навигации
        content = content.replace('��������� ������:', 'Следующий модуль:')
        content = content.replace('���������� ������', 'Предыдущий модуль')
        
        # Заменяем стрелки
        content = content.replace('>', '→')
        content = content.replace('<', '←')
        
        # Заменяем кнопку "Наверх"
        content = content.replace('^', '↑')
        
        # Сохраняем исправленный файл
        with codecs.open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'✓ Модуль {module_num} исправлен')
        
    except Exception as e:
        print(f'✗ Ошибка в модуле {module_num}: {e}')

print('\nВсе модули обработаны!')
