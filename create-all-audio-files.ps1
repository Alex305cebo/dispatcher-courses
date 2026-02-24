# Скрипт для создания аудио файлов для всех фраз (последние 6 слов)

# Минимальный MP3 заголовок
$mp3Header = [byte[]](0xFF, 0xFB, 0x90, 0x00)

# Создать папку audio если не существует
if (-not (Test-Path "audio")) {
    New-Item -ItemType Directory -Path "audio" | Out-Null
}

# Список всех фраз с названиями файлов (последние 6 слов)
$audioFiles = @(
    # ДИСПЕТЧЕР - Приветствия (greetings)
    "disp_load_from_X_to_Y_posted_on_DAT.mp3",
    "disp_posting_for_load_from_X_to_Y.mp3",
    "disp_load_from_X_to_Y_still_available.mp3",
    "disp_load_from_X_to_Y_shipment_still_available.mp3",
    "disp_load_from_X_to_Y_still_open.mp3",
    "disp_load_going_from_X_to_Y_available.mp3",
    "disp_load_from_X_to_Y_on_board_open.mp3",
    "disp_load_from_X_to_Y_still_available2.mp3",
    
    # БРОКЕР - Ответы на приветствие
    "broker_yes_its_still_available_load_number.mp3",
    "broker_yes_still_open_whats_your_MC_number.mp3",
    "broker_yes_available_can_I_get_MC.mp3",
    "broker_yes_still_here_your_MC_number_please.mp3",
    "broker_yes_open_may_I_have_MC.mp3",
    "broker_affirmative_available_whats_your_MC_number.mp3",
    "broker_yes_its_open_your_MC_number_please.mp3",
    "broker_correct_available_can_I_get_MC.mp3",
    
    # ДИСПЕТЧЕР - Подтверждение оборудования
    "disp_53_foot_reefer_with_temperature_control.mp3",
    "disp_53_foot_flatbed_with_straps_chains.mp3",
    "disp_53_foot_dry_van_air_ride_suspension.mp3",
    "disp_53_foot_refrigerated_trailer_ready_to_go.mp3",
    "disp_53_foot_flatbed_trailer_ready_to_go.mp3",
    "disp_53_foot_dry_van_ready_to_go.mp3",
    "disp_we_can_cover_this_with_reefer.mp3",
    "disp_we_can_cover_this_with_flatbed.mp3",
    "disp_we_can_cover_this_with_dry_van.mp3",
    "disp_53_foot_reefer_unit_handle_this.mp3",
    "disp_53_foot_flatbed_with_tarps_handle_this.mp3",
    "disp_53_foot_dry_van_lift_gate_this.mp3",
    "disp_refrigerated_trailer_thats_perfect_for_this.mp3",
    "disp_flatbed_thats_perfect_for_this.mp3",
    "disp_dry_van_thats_perfect_for_this.mp3",
    
    # БРОКЕР - Детали груза (первый набор с ставкой)
    "broker_pickup_8AM_delivery_5PM_rate_X_equipment.mp3",
    "broker_pickup_morning_end_of_day_rate_X_truck.mp3",
    "broker_pickup_8AM_delivery_5PM_rate_X_running.mp3",
    "broker_loading_8AM_unloading_5PM_rate_X_equipment.mp3",
    "broker_pickup_morning_8_delivery_5PM_rate_X_trailer.mp3",
    "broker_pickup_8AM_drop_off_5PM_rate_X_provide.mp3",
    
    # ДИСПЕТЧЕР - Вопрос о ставке
    "disp_posting_shows_X_final_rate_or_negotiation.mp3",
    "disp_rate_listed_X_flexibility_on_that_number.mp3",
    "disp_noticed_X_posted_can_we_discuss_rate.mp3",
    "disp_posted_rate_X_is_that_negotiable_all.mp3",
    "disp_see_X_posting_room_to_move_rate.mp3",
    "disp_rate_shows_X_firm_or_work_on_it.mp3",
    
    # БРОКЕР - Ответ на вопрос о ставке
    "broker_rate_X_as_posted_standard_this_route.mp3",
    "broker_X_budgeted_per_mile_fair_this_lane.mp3",
    "broker_offering_X_miles_thats_competitive_rate.mp3",
    "broker_posted_rate_X_works_out_per_mile.mp3",
    "broker_confirm_X_miles_thats_market_rate_now.mp3",
    "broker_at_X_distance_standard_pricing.mp3",
    "broker_rate_X_per_mile_market_is_paying.mp3",
    "broker_X_total_mile_distance_fair_rate.mp3",
    
    # ДИСПЕТЧЕР - Начало переговоров (counterOffer)
    "disp_distance_market_rates_need_at_least_X.mp3",
    "disp_operating_costs_miles_looking_at_X.mp3",
    "disp_distance_our_expenses_would_need_X.mp3",
    
    # БРОКЕР - Контр-предложение
    "broker_too_high_best_I_can_do_is_X.mp3",
    "broker_cant_go_high_how_about_X.mp3",
    "broker_above_budget_offer_X_best_price.mp3",
    "broker_cant_meet_number_X_highest_can_go.mp3",
    "broker_bit_steep_bump_it_up_to_X.mp3",
    "broker_hear_you_too_much_max_is_X.mp3",
    "broker_wish_I_could_X_ceiling_this_one.mp3",
    "broker_outside_range_go_up_to_X_it.mp3",
    
    # ДИСПЕТЧЕР - Компромисс (middleOffer)
    "disp_meet_middle_X_driver_already_in_city.mp3",
    "disp_settle_at_X_truck_nearby_on_time.mp3",
    "disp_agree_on_X_driver_local_ready_immediately.mp3",
    
    # БРОКЕР - Финальное согласие
    "broker_alright_X_deal_send_rate_confirmation.mp3",
    "broker_okay_do_X_book_it_sending_confirmation.mp3",
    "broker_fine_X_acceptable_paperwork_right_away.mp3",
    "broker_deal_at_X_email_confirmation_a_minute.mp3",
    "broker_you_got_X_rate_con_coming_now.mp3",
    "broker_lets_do_X_send_confirmation_right_now.mp3",
    "broker_okay_X_works_booking_rate_con_shortly.mp3",
    "broker_fair_enough_X_confirmation_in_moment.mp3"
)

# Создать все файлы
$created = 0
foreach ($filename in $audioFiles) {
    $filepath = "audio/$filename"
    
    # Проверить существует ли файл
    if (Test-Path $filepath) {
        Write-Host "Exists: $filename" -ForegroundColor Yellow
    } else {
        [System.IO.File]::WriteAllBytes("$PWD\$filepath", $mp3Header)
        Write-Host "Created: $filename" -ForegroundColor Green
        $created++
    }
}

Write-Host "`nTotal new files created: $created" -ForegroundColor Cyan
Write-Host "Total files: $($audioFiles.Count)" -ForegroundColor Cyan
