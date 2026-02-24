# Скрипт для переименования аудио файлов брокера (последние 4 слова)

# Старое имя -> Новое имя (последние 4 слова из фразы)
$renameMap = @{
    "broker_still_available.mp3" = "broker_is_it_still_available.mp3"
    "broker_still_open.mp3" = "broker_is_this_load_still_open.mp3"
    "broker_still_available2.mp3" = "broker_if_its_still_available.mp3"
    "broker_still_available3.mp3" = "broker_is_this_shipment_still_available.mp3"
    "broker_still_open2.mp3" = "broker_is_it_still_open.mp3"
    "broker_still_available4.mp3" = "broker_is_it_still_available2.mp3"
    "broker_still_open3.mp3" = "broker_is_this_still_open.mp3"
    "broker_still_available5.mp3" = "broker_is_it_still_available3.mp3"
    
    "broker_you_have.mp3" = "broker_what_equipment_do_you_have.mp3"
    "broker_you_have2.mp3" = "broker_what_type_of_truck_do_you_have.mp3"
    "broker_you_running.mp3" = "broker_what_equipment_are_you_running.mp3"
    "broker_your_equipment.mp3" = "broker_tell_me_about_your_equipment.mp3"
    "broker_you_have3.mp3" = "broker_what_kind_of_trailer_do_you_have.mp3"
    "broker_you_provide.mp3" = "broker_what_equipment_can_you_provide.mp3"
    
    "broker_by_5PM.mp3" = "broker_delivery_same_day_by_5PM.mp3"
    "broker_of_day.mp3" = "broker_deliver_by_end_of_day.mp3"
    "broker_by_5PM2.mp3" = "broker_delivery_by_5_PM.mp3"
    "broker_by_5PM3.mp3" = "broker_unloading_same_day_by_5PM.mp3"
    "broker_by_5PM4.mp3" = "broker_delivery_by_5_PM2.mp3"
    "broker_same_day.mp3" = "broker_drop_off_by_5PM_same_day.mp3"
    
    "broker_this_route.mp3" = "broker_standard_rate_for_this_route.mp3"
    "broker_this_lane.mp3" = "broker_fair_for_this_lane.mp3"
    "broker_competitive_rate.mp3" = "broker_thats_a_competitive_rate.mp3"
    "broker_per_mile.mp3" = "broker_that_works_out_to_per_mile.mp3"
    "broker_right_now.mp3" = "broker_market_rate_right_now.mp3"
    "broker_standard_pricing.mp3" = "broker_long_haul_standard_pricing.mp3"
    "broker_the_market.mp3" = "broker_what_the_market_is_paying.mp3"
    "broker_fair_rate.mp3" = "broker_thats_a_fair_rate.mp3"
    
    "broker_can_do.mp3" = "broker_best_I_can_do_is.mp3"
    "broker_about_X.mp3" = "broker_how_about_X.mp3"
    "broker_best_price.mp3" = "broker_as_my_best_price.mp3"
    "broker_can_go.mp3" = "broker_highest_I_can_go.mp3"
    "broker_to_X.mp3" = "broker_bump_it_up_to_X.mp3"
    "broker_max_is.mp3" = "broker_my_max_is_X.mp3"
    "broker_this_one.mp3" = "broker_my_ceiling_on_this_one.mp3"
    "broker_thats_it.mp3" = "broker_up_to_X_thats_it.mp3"
    
    "broker_rate_confirmation.mp3" = "broker_Ill_send_the_rate_confirmation.mp3"
    "broker_confirmation_now.mp3" = "broker_lets_book_it_sending_confirmation_now.mp3"
    "broker_right_away.mp3" = "broker_paperwork_over_to_you_right_away.mp3"
    "broker_a_minute.mp3" = "broker_confirmation_in_a_minute.mp3"
    "broker_your_way.mp3" = "broker_rate_con_coming_your_way_now.mp3"
    "broker_right_now2.mp3" = "broker_send_over_confirmation_right_now.mp3"
    "broker_a_minute2.mp3" = "broker_confirmation_to_you_in_a_moment.mp3"
    "broker_now2.mp3" = "broker_booking_it_now.mp3"
}

$renamed = 0
$failed = 0

foreach ($oldName in $renameMap.Keys) {
    $newName = $renameMap[$oldName]
    $oldPath = "audio/$oldName"
    $newPath = "audio/$newName"
    
    if (Test-Path $oldPath) {
        try {
            Rename-Item -Path $oldPath -NewName $newName -ErrorAction Stop
            Write-Host "Renamed: $oldName -> $newName" -ForegroundColor Green
            $renamed++
        } catch {
            Write-Host "Failed: $oldName - $($_.Exception.Message)" -ForegroundColor Red
            $failed++
        }
    } else {
        Write-Host "Not found: $oldName" -ForegroundColor Yellow
        $failed++
    }
}

Write-Host "`nRenamed: $renamed files" -ForegroundColor Cyan
Write-Host "Failed: $failed files" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
