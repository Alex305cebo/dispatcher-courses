# -*- coding: utf-8 -*-
"""
Скрипт для автоматической генерации аудио файлов
Использует Google Text-to-Speech (gTTS)
"""

from gtts import gTTS
import os
import time

# Создать папку audio если не существует
if not os.path.exists('audio'):
    os.makedirs('audio')

# Все фразы для озвучки
phrases = {
    # ДИСПЕТЧЕР - Приветствия
    "disp_load_from_X_to_Y_posted_on_DAT.mp3": 
        "Good morning! This is John Smith from XYZ Transport. I'm calling about the load from Los Angeles to Phoenix that was posted on DAT. Is it still available?",
    
    "disp_posting_for_load_from_X_to_Y.mp3": 
        "Hi, this is Sarah Johnson with ABC Logistics. I saw your posting for a load from Chicago to Memphis. Is this load still open?",
    
    "disp_load_from_X_to_Y_still_available.mp3": 
        "Hello! My name is Mike Davis from Premier Carriers. I'm interested in the load from Dallas to Atlanta. Can you tell me if it's still available?",
    
    # БРОКЕР - Ответы на приветствие
    "broker_yes_its_still_available_load_number.mp3": 
        "Yes, it's still available. What's your MC number and load number?",
    
    "broker_yes_still_open_whats_your_MC_number.mp3": 
        "Yes, it's still open. What's your MC number please?",
    
    "broker_yes_available_can_I_get_MC.mp3": 
        "Yes, it's available. Can I get your MC number?",
    
    # ДИСПЕТЧЕР - Подтверждение оборудования
    "disp_53_foot_reefer_with_temperature_control.mp3": 
        "We have a 53-foot reefer with temperature control available.",
    
    "disp_53_foot_dry_van_air_ride_suspension.mp3": 
        "We have a 53-foot dry van with air-ride suspension available.",
    
    # БРОКЕР - Детали груза
    "broker_pickup_8AM_delivery_5PM_rate_X_equipment.mp3": 
        "Correct, 42,104 lbs of fresh vegetables. Pickup tomorrow at 8 AM, delivery same day by 5 PM. Rate: $1,850. What equipment do you have?",
    
    "broker_pickup_morning_end_of_day_rate_X_truck.mp3": 
        "Yes, 38,500 lbs of electronics. Pick up tomorrow morning, deliver by end of day. Rate: $2,100. What type of truck do you have?",
    
    # ДИСПЕТЧЕР - Вопрос о ставке
    "disp_posting_shows_X_final_rate_or_negotiation.mp3": 
        "Perfect, we can handle that. I see the posting shows $1,850. Is that your final rate, or is there room for negotiation?",
    
    "disp_rate_listed_X_flexibility_on_that_number.mp3": 
        "Excellent, we're equipped for that. The rate listed is $2,100. Is there any flexibility on that number?",
    
    # БРОКЕР - Ответ на вопрос о ставке
    "broker_rate_X_as_posted_standard_this_route.mp3": 
        "The rate is $1,850 as posted. It's a medium haul, pretty standard rate for this route.",
    
    "broker_X_budgeted_per_mile_fair_this_lane.mp3": 
        "$2,100 is what we have budgeted for this shipment. That's $2.69 per mile, which is fair for this lane.",
    
    # ДИСПЕТЧЕР - Начало переговоров
    "disp_distance_market_rates_need_at_least_X.mp3": 
        "I appreciate the offer, but considering the 780-mile distance and current market rates, we would need at least $2,200 to make this work for us.",
    
    "disp_operating_costs_miles_looking_at_X.mp3": 
        "Thank you for that. However, based on our operating costs and the 530 miles, we're looking at $1,950 for this shipment.",
    
    # БРОКЕР - Контр-предложение
    "broker_too_high_best_I_can_do_is_X.mp3": 
        "That's too high for us. Best I can do is $2,050.",
    
    "broker_cant_go_high_how_about_X.mp3": 
        "I can't go that high. How about $1,900?",
    
    "broker_above_budget_offer_X_best_price.mp3": 
        "That's above our budget. I can offer $2,100 as my best price.",
    
    # ДИСПЕТЧЕР - Компромисс
    "disp_meet_middle_X_driver_already_in_city.mp3": 
        "I understand your position. How about we meet in the middle at $2,125? My driver is already in Dallas and can pick up on time.",
    
    "disp_settle_at_X_truck_nearby_on_time.mp3": 
        "Let's find a compromise here. What if we settle at $1,925? We have a truck nearby and can guarantee on-time pickup.",
    
    # БРОКЕР - Финальное согласие
    "broker_alright_X_deal_send_rate_confirmation.mp3": 
        "Alright, $2,125 and we have a deal. I'll send the rate confirmation.",
    
    "broker_okay_do_X_book_it_sending_confirmation.mp3": 
        "Okay, I can do $1,925. Let's book it. Sending confirmation now.",
    
    "broker_fine_X_acceptable_paperwork_right_away.mp3": 
        "Fine, $2,100 is acceptable. I'll get the paperwork over to you right away.",
}

# Счетчики
total = len(phrases)
created = 0
failed = 0

print(f"\n🎙️  Starting audio generation for {total} phrases...\n")

# Генерируем каждый файл
for filename, text in phrases.items():
    try:
        filepath = os.path.join('audio', filename)
        
        # Проверяем существует ли файл
        if os.path.exists(filepath):
            print(f"⏭️  Skipped (exists): {filename}")
            continue
        
        # Создаем TTS объект
        tts = gTTS(
            text=text,
            lang='en',
            slow=False,
            tld='com'  # Американский акцент
        )
        
        # Сохраняем файл
        tts.save(filepath)
        created += 1
        print(f"✅ Created: {filename}")
        
        # Небольшая задержка чтобы не перегружать API
        time.sleep(0.5)
        
    except Exception as e:
        failed += 1
        print(f"❌ Failed: {filename} - {str(e)}")

# Итоги
print(f"\n{'='*60}")
print(f"✅ Successfully created: {created} files")
print(f"⏭️  Skipped (already exist): {total - created - failed} files")
print(f"❌ Failed: {failed} files")
print(f"{'='*60}\n")

if created > 0:
    print("🎉 Audio files are ready in the 'audio/' folder!")
    print("You can now use them on your website.")
