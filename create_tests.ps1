$tests = @(
    @{
        num=2; title="FMCSA и DOT регламенты"; questions=@(
            @{q="Что означает FMCSA?"; a=@("Federal Motor Carrier Safety Administration", "Federal Motor Company Service Agency", "Federal Management Carrier System", "Federal Motor Control Safety Act"); c=0},
            @{q="Для чего нужен DOT номер?"; a=@("Для страховки", "Уникальная идентификация перевозчика", "Для оплаты налогов", "Для регистрации трака"); c=1},
            @{q="Минимальная страховка Liability для общих грузов:"; a=@("$100,000", "$500,000", "$750,000", "$1,000,000"); c=2},
            @{q="Что такое MC Authority?"; a=@("Водительские права", "Разрешение на коммерческие перевозки", "Страховой полис", "Номер трака"); c=1},
            @{q="Сколько стоит регистрация DOT номера?"; a=@("Бесплатно", "$100", "$300", "$500"); c=2},
            @{q="Как часто нужно обновлять DOT информацию?"; a=@("Каждый год", "Каждые 2 года", "Каждые 5 лет", "Никогда"); c=1},
            @{q="Что такое BOC-3?"; a=@("Тип страховки", "Назначение агента в каждом штате", "Водительские права", "Номер трака"); c=1},
            @{q="Минимальная страховка для HAZMAT грузов:"; a=@("$750,000", "$1,000,000", "$5,000,000", "$10,000,000"); c=2},
            @{q="Что такое CSA Program?"; a=@("Система мониторинга безопасности", "Страховая программа", "Программа обучения", "Тип лицензии"); c=0},
            @{q="Штраф за отсутствие страховки может достигать:"; a=@("$1,000", "$5,000", "$10,000", "$25,000"); c=3},
            @{q="Что означает Safety Rating 'Satisfactory'?"; a=@("Плохая оценка", "Удовлетворительная оценка безопасности", "Отличная оценка", "Средняя оценка"); c=1},
            @{q="Сколько времени занимает получение MC Authority?"; a=@("1-5 дней", "10-15 дней", "20-30 дней", "60-90 дней"); c=2},
            @{q="Что такое CDL Class A?"; a=@("Права для легковых авто", "Права для траков с прицепом", "Права для мотоциклов", "Права для автобусов"); c=1},
            @{q="Медицинский сертификат для водителей действителен:"; a=@("1 год", "2 года", "5 лет", "10 лет"); c=1},
            @{q="Штраф за нарушение HOS может достигать:"; a=@("$500", "$1,000", "$11,000", "$25,000"); c=2},
            @{q="Что такое HAZMAT Endorsement?"; a=@("Страховка", "Разрешение на перевозку опасных грузов", "Тип трака", "Номер компании"); c=1},
            @{q="Кто регулирует безопасность коммерческих перевозок?"; a=@("FBI", "FMCSA", "CIA", "DMV"); c=1},
            @{q="Что проверяет Drug Testing?"; a=@("Здоровье", "Наличие наркотиков", "Зрение", "Вес"); c=1},
            @{q="Cargo Insurance обычно покрывает:"; a=@("$50,000", "$100,000", "$500,000", "$1,000,000"); c=1},
            @{q="Штраф за превышение веса может достигать:"; a=@("$100", "$1,000", "$10,000", "$50,000"); c=2}
        )
    },
    @{
        num=3; title="Hours of Service (HOS)"; questions=@(
            @{q="Максимальное время вождения в день:"; a=@("8 часов", "10 часов", "11 часов", "14 часов"); c=2},
            @{q="14-Hour On-Duty Window означает:"; a=@("14 часов вождения", "14 часов с момента начала рабочего дня", "14 часов отдыха", "14 часов перерыва"); c=1},
            @{q="Обязательный перерыв после 8 часов вождения:"; a=@("15 минут", "30 минут", "1 час", "2 часа"); c=1},
            @{q="60/70-Hour Duty Limits означают:"; a=@("60 часов за 7 дней или 70 за 8 дней", "60 часов в месяц", "70 часов в неделю", "60 дней работы"); c=0},
            @{q="34-Hour Restart обнуляет:"; a=@("Счетчик 11 часов", "Счетчик 60/70 часов", "Все счетчики", "Ничего"); c=1},
            @{q="Что такое ELD?"; a=@("Электронное устройство логирования", "Тип страховки", "Водительские права", "Номер трака"); c=0},
            @{q="Минимальный отдых перед 11-часовым вождением:"; a=@("8 часов", "10 часов", "12 часов", "14 часов"); c=1},
            @{q="Можно ли водить после 14 часов On-Duty?"; a=@("Да", "Нет", "Только с разрешения", "Только 1 час"); c=1},
            @{q="30-минутный перерыв должен быть:"; a=@("За рулем", "Off-Duty или Sleeper Berth", "On-Duty", "Любой"); c=1},
            @{q="Sleeper Berth Provision позволяет:"; a=@("Не спать", "Разделить 10-часовой отдых", "Водить дольше", "Игнорировать HOS"); c=1},
            @{q="Штраф за нарушение HOS для водителя:"; a=@("$100-$500", "$500-$1,000", "$1,000-$11,000", "$25,000"); c=2},
            @{q="Кто обязан соблюдать HOS правила?"; a=@("Только водители", "Только компании", "Водители и компании", "Только брокеры"); c=2},
            @{q="Adverse Driving Conditions добавляют:"; a=@("1 час", "2 часа", "3 часа", "4 часа"); c=1},
            @{q="Short-Haul Exception позволяет:"; a=@("Не вести логи", "Водить 24 часа", "Игнорировать HOS", "Не отдыхать"); c=0},
            @{q="Personal Conveyance это:"; a=@("Коммерческое использование", "Личное использование трака", "Тип груза", "Страховка"); c=1},
            @{q="Yard Move это:"; a=@("Движение по территории склада", "Дальняя поездка", "Тип груза", "Отдых"); c=0},
            @{q="Waiting Time считается как:"; a=@("Off-Duty", "On-Duty", "Driving", "Sleeper"); c=1},
            @{q="Максимум часов On-Duty за 7 дней:"; a=@("50", "60", "70", "80"); c=1}
        )
    }
)

foreach ($test in $tests) {
    $html = @"
<!DOCTYPE html>
<html lang='ru'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Тест: Модуль $($test.num) - $($test.title) | Курсы - Диспетчера</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); min-height: 100vh; padding: 20px; display: flex; flex-direction: column; align-items: center; }
        .container { max-width: 900px; width: 100%; margin: 0 auto; }
        .header { background: white; padding: 30px 40px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .test-badge { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; padding: 10px 20px; border-radius: 25px; font-weight: 600; font-size: 18px; }
        .back-btn { padding: 10px 20px; background: #f3f4f6; color: #374151; text-decoration: none; border-radius: 8px; font-weight: 600; }
        h1 { color: #2d3748; font-size: 32px; margin-bottom: 10px; }
        .subtitle { color: #718096; font-size: 18px; }
        .progress-bar { background: #e5e7eb; height: 8px; border-radius: 10px; margin: 20px 0; }
        .progress-fill { background: linear-gradient(90deg, #16a34a, #22c55e); height: 100%; width: 0%; transition: width 0.3s ease; }
        .question-card { background: white; border-radius: 15px; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); display: none; }
        .question-card.active { display: block; }
        .question-number { color: #16a34a; font-size: 16px; font-weight: 600; margin-bottom: 10px; }
        .question-text { color: #2d3748; font-size: 22px; font-weight: 600; margin-bottom: 25px; }
        .answers { display: flex; flex-direction: column; gap: 12px; }
        .answer { background: #f7fafc; padding: 18px 20px; border-radius: 10px; border: 2px solid transparent; cursor: pointer; transition: all 0.3s ease; font-size: 17px; }
        .answer:hover { background: #edf2f7; border-color: #16a34a; }
        .answer.selected { background: #dcfce7; border-color: #16a34a; font-weight: 600; }
        .nav-buttons { display: flex; gap: 15px; margin-top: 25px; }
        .btn { padding: 14px 30px; border-radius: 10px; font-weight: 600; border: none; cursor: pointer; }
        .btn-primary { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: white; }
        .btn-secondary { background: white; color: #16a34a; border: 2px solid #16a34a; }
        .btn:disabled { opacity: 0.5; }
        .results { background: white; border-radius: 15px; padding: 40px; text-align: center; display: none; }
        .results.show { display: block; }
        .score { font-size: 72px; font-weight: bold; margin: 20px 0; }
        .score.pass { color: #16a34a; }
        .score.fail { color: #ef4444; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <div class='header-top'>
                <div class='test-badge'>📝 Тест: Модуль $($test.num)</div>
                <a href='modules.html' class='back-btn'>← Назад</a>
            </div>
            <h1>$($test.title)</h1>
            <p class='subtitle'>$($test.questions.Count) вопросов для проверки знаний</p>
            <div class='progress-bar'><div class='progress-fill' id='progressBar'></div></div>
        </div>
        <div id='questionsContainer'></div>
        <div class='results' id='results'>
            <h2 style='color: #2d3748; font-size: 32px; margin-bottom: 20px;'>Результаты теста</h2>
            <div class='score' id='scoreDisplay'></div>
            <p style='font-size: 24px; color: #2d3748; margin-bottom: 30px;' id='resultMessage'></p>
            <div class='nav-buttons'>
                <button class='btn btn-primary' onclick='location.href=\"module-$($test.num + 1).html\"'>Следующий модуль →</button>
                <button class='btn btn-secondary' onclick='location.reload()'>Пройти заново</button>
            </div>
        </div>
    </div>
    <script>
        const questions = [
"@

    foreach ($question in $test.questions) {
        $answersJson = ($question.a | ForEach-Object { "`"$_`"" }) -join ","
        $html += "            {q:`"$($question.q)`",a:[$answersJson],correct:$($question.c)},`n"
    }

    $html += @"
        ];
        let currentQuestion=0,answers=[],score=0;
        function initTest(){const container=document.getElementById('questionsContainer');questions.forEach((q,index)=>{const card=document.createElement('div');card.className='question-card'+(index===0?' active':'');card.innerHTML=``<div class='question-number'>Вопрос `${index+1} из `${questions.length}</div><div class='question-text'>`${q.q}</div><div class='answers'>`${q.a.map((answer,i)=>``<div class='answer' onclick='selectAnswer(`${index},`${i})'>`${answer}</div>``).join('')}</div><div class='nav-buttons'>`${index>0?``<button class='btn btn-secondary' onclick='prevQuestion()'>← Назад</button>``:''}`${index<questions.length-1?``<button class='btn btn-primary' onclick='nextQuestion()' id='nextBtn`${index}' disabled>Далее →</button>``:``<button class='btn btn-primary' onclick='finishTest()' id='nextBtn`${index}' disabled>Завершить</button>``}</div>``;container.appendChild(card);});}
        function selectAnswer(questionIndex,answerIndex){const card=document.querySelectorAll('.question-card')[questionIndex];card.querySelectorAll('.answer').forEach(div=>div.classList.remove('selected'));card.querySelectorAll('.answer')[answerIndex].classList.add('selected');answers[questionIndex]=answerIndex;document.getElementById(``nextBtn`${questionIndex}``).disabled=false;}
        function nextQuestion(){document.querySelectorAll('.question-card')[currentQuestion].classList.remove('active');currentQuestion++;document.querySelectorAll('.question-card')[currentQuestion].classList.add('active');updateProgress();}
        function prevQuestion(){document.querySelectorAll('.question-card')[currentQuestion].classList.remove('active');currentQuestion--;document.querySelectorAll('.question-card')[currentQuestion].classList.add('active');updateProgress();}
        function updateProgress(){document.getElementById('progressBar').style.width=((currentQuestion+1)/questions.length*100)+'%';}
        function finishTest(){score=0;questions.forEach((q,index)=>{if(answers[index]===q.correct)score++;});const percentage=Math.round((score/questions.length)*100);const passed=percentage>=70;document.getElementById('questionsContainer').style.display='none';document.getElementById('results').classList.add('show');const scoreDisplay=document.getElementById('scoreDisplay');scoreDisplay.textContent=percentage+'%';scoreDisplay.className='score '+(passed?'pass':'fail');document.getElementById('resultMessage').textContent=passed?``Поздравляем! Тест пройден (`${score}/`${questions.length})``:`Тест не пройден. Минимум 70% (`${score}/`${questions.length})``;}
        initTest();
    </script>
</body>
</html>
"@

    $html | Out-File -FilePath "pages/test-$($test.num).html" -Encoding UTF8
}

"Tests 2-3 created"
