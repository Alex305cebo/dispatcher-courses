@echo off
chcp 65001 >nul
echo ========================================
echo Сохранение проекта на GitHub
echo ========================================
echo.

REM Настройка git конфигурации
echo [1/5] Настройка git конфигурации...
git config --global user.name "DispatcherCourses"
git config --global user.email "dersire.der@gmail.com"
echo Готово!
echo.

REM Коммит изменений
echo [2/5] Создание коммита...
git commit -m "Update: improved module tests and simulator interface - Added auto-transition in tests after 2 seconds - Color indication for correct/incorrect answers - Test statistics saved to localStorage - Removed numbers from simulator navigation - Improved button design for mobile and desktop - Filled all modules 2-10 with detailed information"
echo Готово!
echo.

REM Инструкции для создания репозитория
echo [3/5] ВАЖНО: Создайте репозиторий на GitHub
echo.
echo Откройте в браузере: https://github.com/new
echo.
echo Создайте новый репозиторий с любым именем (например: dispatcher-courses)
echo НЕ добавляйте README, .gitignore или лицензию!
echo.
pause
echo.

REM Запрос имени репозитория
echo [4/5] Введите данные репозитория:
echo.
set /p USERNAME="Введите ваш GitHub username: "
set /p REPONAME="Введите имя репозитория: "
echo.

REM Добавление remote и push
echo [5/5] Отправка кода на GitHub...
git remote add origin https://github.com/%USERNAME%/%REPONAME%.git
git branch -M main
git push -u origin main
echo.

echo ========================================
echo Готово! Проект сохранен на GitHub
echo Ссылка: https://github.com/%USERNAME%/%REPONAME%
echo ========================================
pause
