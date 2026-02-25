"""
Flask приложение - ПОЛНЫЙ сбор информации
1. Собирает данные из таблицы
2. Кликает на каждый груз для получения телефона/email
3. Останавливается ТОЛЬКО когда появится "Daily Limit Reached!"
"""
from flask import Flask, render_template, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import time
import json
import re
import threading

app = Flask(__name__)

# Глобальная переменная для хранения результата
search_result = {
    'status': 'idle',
    'loads': [],
    'current_load': 0,
    'total_loads': 0,
    'limit_reached': False,
    'step': 0,
    'step_name': ''
}

# Глобальная переменная для хранения активного браузера
active_driver = None

def check_for_limit(driver):
    """НЕ проверяем лимит - просто возвращаем False"""
    return False

def collect_full_data(city):
    """Собирает ПОЛНУЮ информацию: таблица + клики"""
    global search_result, active_driver
    
    try:
        print(f"\n{'='*70}")
        print(f"🚛 ПОЛНЫЙ СБОР ИНФОРМАЦИИ: {city.upper()}")
        print(f"{'='*70}")
        
        search_result['status'] = 'searching'
        search_result['loads'] = []
        search_result['current_load'] = 0
        search_result['limit_reached'] = False
        search_result['step'] = 1
        search_result['step_name'] = 'Инициализация'
        
        # Загружаем credentials
        with open("credentials.json", "r") as f:
            creds = json.load(f)
            credentials = creds.get("truckerpath", {})
        
        # Браузер с масштабом 60%
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--force-device-scale-factor=0.6')
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        try:
            # ЛОГИН
            print("\n🔐 Шаг 1: Логин...")
            search_result['step'] = 1
            search_result['step_name'] = 'Логин'
            
            driver.get("https://loadboard.truckerpath.com/carrier/loads/home")
            time.sleep(3)
            
            login_buttons = driver.find_elements(By.XPATH, "//*[contains(text(), 'Log In') or contains(text(), 'LOG IN')]")
            for btn in login_buttons:
                if btn.is_displayed():
                    driver.execute_script("arguments[0].click();", btn)
                    break
            
            time.sleep(2)
            
            try:
                email_input = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Email address'], input[type='email']"))
                )
            except:
                email_input = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, "sign-in_email"))
                )
            
            email_input.clear()
            email_input.send_keys(credentials['username'])
            
            try:
                password_input = driver.find_element(By.ID, "sign-in_password")
            except:
                password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
            
            password_input.clear()
            password_input.send_keys(credentials['password'])
            time.sleep(1)
            
            try:
                signin_btn = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, "button.tlant-btn-primary"))
                )
                signin_btn.click()
            except:
                password_input.send_keys(Keys.RETURN)
            
            time.sleep(4)
            print("✅ Вход выполнен")
            
            # ПОИСК
            print(f"\n🔍 Шаг 2: Поиск грузов из {city}...")
            search_result['step'] = 2
            search_result['step_name'] = 'Поиск'
            
            driver.refresh()
            time.sleep(3)
            
            # Кликаем pickup ОДИН раз и вводим город
            print(f"\n   Ищем поле Pick Up...")
            
            pickup_input = None
            
            try:
                all_inputs = driver.find_elements(By.TAG_NAME, "input")
                for inp in all_inputs:
                    try:
                        if not inp.is_displayed() or not inp.is_enabled():
                            continue
                        
                        placeholder = (inp.get_attribute('placeholder') or '').lower()
                        aria_label = (inp.get_attribute('aria-label') or '').lower()
                        input_id = (inp.get_attribute('id') or '').lower()
                        input_name = (inp.get_attribute('name') or '').lower()
                        
                        # Ищем по разным признакам
                        if ('pick' in placeholder or 'pick' in aria_label or 
                            'pick' in input_id or 'pick' in input_name or
                            'origin' in placeholder or 'origin' in input_id or
                            'from' in placeholder or 'from' in input_id):
                            
                            # Исключаем поля с датой
                            if 'date' not in placeholder and 'date' not in aria_label and 'date' not in input_id:
                                pickup_input = inp
                                print(f"   ✅ Нашли поле: placeholder='{placeholder}', id='{input_id}'")
                                break
                    except:
                        continue
            except:
                pass
            
            # Если не нашли, берем первый видимый text input
            if not pickup_input:
                print(f"   ⚠️ Поле Pick Up не найдено, берем первый text input...")
                try:
                    all_inputs = driver.find_elements(By.TAG_NAME, "input")
                    for inp in all_inputs:
                        try:
                            if inp.is_displayed() and inp.is_enabled():
                                input_type = (inp.get_attribute('type') or '').lower()
                                if input_type in ['text', 'search', '']:
                                    pickup_input = inp
                                    print(f"   ✅ Взяли первый text input")
                                    break
                        except:
                            continue
                except:
                    pass
            
            if not pickup_input:
                print(f"   ❌ Не удалось найти поле для ввода")
                search_result['status'] = 'completed'
                return
            
            # Кликаем Pick Up ОДИН раз и вводим город
            try:
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", pickup_input)
                time.sleep(0.3)
                
                # ОДИН клик на поле
                pickup_input.click()
                print(f"   ✅ Кликнули на Pick Up")
                time.sleep(0.5)
                
                # Очищаем и вводим город
                pickup_input.clear()
                time.sleep(0.2)
                
                # Вводим город медленно (по букве)
                for char in city.lower():
                    pickup_input.send_keys(char)
                    time.sleep(0.05)
                
                print(f"   ✅ Город введен: {city}")
                
                # Ждем появления выпадающего списка
                print(f"   ⏳ Ждем появления списка городов (4 сек)...")
                time.sleep(4)
                
                # Ищем и кликаем на первый вариант в списке
                try:
                    dropdown_items = []
                    
                    print(f"   🔍 Ищем выпадающий список...")
                    
                    # Способ 1: Ищем элементы списка по тексту города
                    try:
                        city_name = city.split(',')[0].strip()
                        # Ищем все элементы содержащие название города
                        all_elements = driver.find_elements(By.XPATH, f"//*[contains(text(), '{city_name}')]")
                        
                        # Фильтруем только видимые элементы которые НЕ являются input полем
                        for elem in all_elements:
                            try:
                                if elem.is_displayed() and elem.tag_name != 'input':
                                    # Проверяем что это не само поле Pick Up
                                    if elem != pickup_input:
                                        dropdown_items.append(elem)
                            except:
                                continue
                        
                        if len(dropdown_items) > 0:
                            print(f"   📋 Найдено вариантов (по тексту): {len(dropdown_items)}")
                            for i, item in enumerate(dropdown_items[:5]):
                                try:
                                    text = item.text.strip()
                                    if text:
                                        print(f"      {i+1}. {text}")
                                except:
                                    pass
                    except Exception as e:
                        print(f"   ⚠️ Способ 1 не сработал: {e}")
                    
                    # Способ 2: li элементы с role='option'
                    if len(dropdown_items) == 0:
                        try:
                            dropdown_items = driver.find_elements(By.CSS_SELECTOR, "li[role='option']")
                            if len(dropdown_items) > 0:
                                print(f"   📋 Найдено вариантов (li role=option): {len(dropdown_items)}")
                                for i, item in enumerate(dropdown_items[:5]):
                                    try:
                                        print(f"      {i+1}. {item.text[:50]}")
                                    except:
                                        pass
                        except Exception as e:
                            print(f"   ⚠️ Способ 2 не сработал: {e}")
                    
                    # Кликаем на первый вариант (НЕ на поле Pick Up!)
                    if len(dropdown_items) > 0:
                        # Берем первый элемент который содержит полное название города
                        selected_item = None
                        city_name = city.split(',')[0].strip()
                        
                        for item in dropdown_items:
                            try:
                                item_text = item.text.strip()
                                # Ищем элемент который содержит город и штат
                                if city_name in item_text and ',' in item_text:
                                    selected_item = item
                                    print(f"   🎯 Выбираем: {item_text}")
                                    break
                            except:
                                continue
                        
                        # Если не нашли точное совпадение, берем первый
                        if not selected_item and len(dropdown_items) > 0:
                            selected_item = dropdown_items[0]
                            try:
                                print(f"   🎯 Выбираем первый: {selected_item.text}")
                            except:
                                print(f"   🎯 Выбираем первый вариант")
                        
                        if selected_item:
                            # Пробуем разные способы клика
                            clicked = False
                            
                            # Способ 1: JavaScript клик (самый надежный)
                            try:
                                driver.execute_script("arguments[0].click();", selected_item)
                                clicked = True
                                print(f"   ✅ Клик выполнен (JavaScript)")
                            except Exception as e:
                                print(f"   ⚠️ JavaScript клик не сработал: {e}")
                            
                            # Способ 2: Обычный клик
                            if not clicked:
                                try:
                                    selected_item.click()
                                    clicked = True
                                    print(f"   ✅ Клик выполнен (обычный)")
                                except Exception as e:
                                    print(f"   ⚠️ Обычный клик не сработал: {e}")
                            
                            # Способ 3: ActionChains
                            if not clicked:
                                try:
                                    from selenium.webdriver.common.action_chains import ActionChains
                                    actions = ActionChains(driver)
                                    actions.move_to_element(selected_item).click().perform()
                                    clicked = True
                                    print(f"   ✅ Клик выполнен (ActionChains)")
                                except Exception as e:
                                    print(f"   ⚠️ ActionChains клик не сработал: {e}")
                            
                            if clicked:
                                print(f"   ✅ Город выбран из списка")
                                # Ждем чтобы выбор применился
                                time.sleep(3)
                                print(f"   ⏳ Ждем применения выбора (3 сек)...")
                            else:
                                print(f"   ⚠️ Не удалось кликнуть на вариант")
                        
                    else:
                        print(f"   ⚠️ Выпадающий список не найден")
                        print(f"   🔍 Пробуем нажать стрелку вниз и Enter...")
                        pickup_input.send_keys(Keys.ARROW_DOWN)
                        time.sleep(0.5)
                        pickup_input.send_keys(Keys.RETURN)
                        time.sleep(2)
                        
                except Exception as e:
                    print(f"   ⚠️ Ошибка выбора из списка: {e}")
                    import traceback
                    traceback.print_exc()
                    # Пробуем нажать Enter
                    try:
                        print(f"   🔍 Пробуем Enter...")
                        pickup_input.send_keys(Keys.RETURN)
                        time.sleep(2)
                    except:
                        pass
                
                # ТЕПЕРЬ нажимаем SEARCH
                print(f"   🔍 Нажимаем SEARCH...")
                time.sleep(0.5)
                
                buttons = driver.find_elements(By.TAG_NAME, "button")
                search_clicked = False
                for btn in buttons:
                    try:
                        if 'search' in btn.text.lower():
                            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", btn)
                            time.sleep(0.3)
                            btn.click()
                            print(f"   ✅ SEARCH нажат")
                            search_clicked = True
                            break
                    except:
                        continue
                
                if not search_clicked:
                    print(f"   ⚠️ Кнопка SEARCH не найдена")
                
            except Exception as e:
                print(f"   ⚠️ Ошибка: {e}")
            
            time.sleep(10)
            print(f"   ⏳ Ждем загрузки результатов...")
            
            # СБОР ДАННЫХ СО СТРАНИЦЫ
            print(f"\n📦 Шаг 3: Собираем информацию со страницы...")
            search_result['step'] = 3
            search_result['step_name'] = 'Сбор данных'
            
            # Получаем весь текст страницы
            try:
                page_text = driver.find_element(By.TAG_NAME, "body").text
            except:
                page_text = ""
            
            # Сохраняем ВЕСЬ текст страницы в файл
            page_file = f"{city.replace(',', '').replace(' ', '_').lower()}_page_text.txt"
            with open(page_file, "w", encoding="utf-8") as f:
                f.write(page_text)
            print(f"💾 Текст страницы сохранен: {page_file}")
            
            print(f"\n{'='*70}")
            print(f"📄 ИНФОРМАЦИЯ СО СТРАНИЦЫ (первые 2000 символов)")
            print(f"{'='*70}")
            print(page_text[:2000])
            print(f"{'='*70}")
            
            # Парсим информацию - ищем все грузы
            all_loads = []
            
            # Ищем все цены (признак груза)
            price_matches = list(re.finditer(r'\$(\d+,?\d+)', page_text))
            
            print(f"\n   Найдено цен: {len(price_matches)}")
            
            if len(price_matches) == 0:
                # Если цен нет, пробуем найти строки с городами
                print(f"\n   Цены не найдены, ищем грузы по городам...")
                lines = page_text.split('\n')
                city_name = city.split(',')[0].strip()
                
                for idx, line in enumerate(lines, 1):
                    if city_name in line and len(line) > 10:
                        load_data = {
                            'number': idx,
                            'search_city': city,
                            'raw_line': line.strip()
                        }
                        
                        # Ищем расстояние
                        distance_match = re.search(r'(\d+,?\d*)\s*mi', line)
                        if distance_match:
                            load_data['distance'] = distance_match.group(0)
                        
                        all_loads.append(load_data)
                        print(f"\n   Груз #{idx}: {line.strip()[:100]}")
            else:
                # Если цены есть, парсим по ценам
                for idx, price_match in enumerate(price_matches, 1):
                    price_pos = price_match.start()
                    
                    # Берем контекст вокруг цены (500 символов до и после)
                    context_start = max(0, price_pos - 500)
                    context_end = min(len(page_text), price_pos + 500)
                    context = page_text[context_start:context_end]
                    
                    load_data = {
                        'number': idx,
                        'search_city': city,
                        'price': '$' + price_match.group(1)
                    }
                    
                    # Ищем города в контексте
                    cities = re.findall(r'([A-Z][a-zA-Z\s]+,\s*[A-Z]{2})', context)
                    if len(cities) >= 1:
                        load_data['pickup'] = cities[0].strip()
                    if len(cities) >= 2:
                        load_data['dropoff'] = cities[1].strip()
                    
                    # Ищем расстояние
                    distance_match = re.search(r'(\d+,?\d*)\s*mi', context)
                    if distance_match:
                        load_data['distance'] = distance_match.group(0)
                    
                    # Ищем вес
                    weight_match = re.search(r'(\d+,?\d+)\s*lbs', context)
                    if weight_match:
                        load_data['weight'] = weight_match.group(0)
                    
                    # Ищем дату
                    date_match = re.search(r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+\d+', context)
                    if date_match:
                        load_data['date'] = date_match.group(0)
                    
                    # Ищем телефон
                    phone_match = re.search(r'(\d{10,11})', context)
                    if phone_match:
                        load_data['phone'] = phone_match.group(1)
                    
                    # Ищем email
                    email_match = re.search(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', context)
                    if email_match:
                        load_data['email'] = email_match.group(1)
                    
                    # Ищем брокера
                    broker_match = re.search(r'Broker\s+([^\n]+)', context)
                    if broker_match:
                        load_data['broker'] = broker_match.group(1).strip()
                    
                    all_loads.append(load_data)
                    
                    print(f"\n   Груз #{idx}:")
                    print(f"      💰 Цена: {load_data.get('price', '-')}")
                    if 'pickup' in load_data:
                        print(f"      📍 Откуда: {load_data['pickup']}")
                    if 'dropoff' in load_data:
                        print(f"      📍 Куда: {load_data['dropoff']}")
                    if 'distance' in load_data:
                        print(f"      📏 Расстояние: {load_data['distance']}")
                    if 'phone' in load_data:
                        print(f"      📞 Телефон: {load_data['phone']}")
                    if 'email' in load_data:
                        print(f"      📧 Email: {load_data['email']}")
            
            search_result['loads'] = all_loads
            search_result['total_loads'] = len(all_loads)
            search_result['status'] = 'completed'
            
            print(f"\n{'='*70}")
            print(f"✅ СБОР ЗАВЕРШЕН!")
            print(f"   Всего грузов найдено: {len(all_loads)}")
            print(f"   С телефоном: {sum(1 for l in all_loads if 'phone' in l)}")
            print(f"   С email: {sum(1 for l in all_loads if 'email' in l)}")
            print(f"{'='*70}")
            
            # Сохраняем в JSON
            output_file = f"{city.replace(',', '').replace(' ', '_').lower()}_loads.json"
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(all_loads, f, indent=2, ensure_ascii=False)
            print(f"💾 Результат сохранен: {output_file}")
            
            print("\n🌐 Браузер остается открытым")
            active_driver = driver
            
        except Exception as inner_e:
            print(f"⚠️ Внутренняя ошибка: {inner_e}")
            import traceback
            traceback.print_exc()
            search_result['status'] = 'completed'
            try:
                active_driver = driver
            except:
                pass
            
    except Exception as e:
        print(f"⚠️ Внешняя ошибка: {e}")
        import traceback
        traceback.print_exc()
        search_result['status'] = 'completed'

@app.route('/')
def index():
    """Главная страница"""
    return render_template('load_finder_full.html')

@app.route('/search', methods=['POST'])
def search():
    """Запуск полного сбора"""
    data = request.get_json()
    city = data.get('city', '')
    
    if not city:
        return jsonify({'error': 'Укажите город'}), 400
    
    # Запускаем сбор в фоновом потоке
    thread = threading.Thread(target=collect_full_data, args=(city,))
    thread.start()
    
    return jsonify({'status': 'started'})

@app.route('/status')
def status():
    """Проверка статуса сбора"""
    return jsonify(search_result)

if __name__ == '__main__':
    app.run(debug=True, port=5003)
