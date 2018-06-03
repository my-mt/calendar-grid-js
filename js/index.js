$(function() {
    var dataEvents = [
        {"id": 3669, "event_id": 126, "user_id": 39, "note": "", "date_time": "2018-04-01", "result": 1, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": ""},
        {"id": 3669, "event_id": 126, "user_id": 39, "note": "", "date_time": "2018-04-01", "result": 0, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": ""},
        {"id": 3669, "event_id": 126, "user_id": 39, "note": "", "date_time": "2018-04-30", "result": 0, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": ""}
    ];

    var D1 = new Date(1523642400 * 1000);
    var month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]; // название месяца, вместо цифр 0-11

// Определить месяц, который будем выводить - Апрель-3 2018г.
    var monthP = 3;
    var MonthStr = (monthP + 1 < 10) ? '0' + (monthP + 1) : monthP + 1;
    var yearP = 2018;
    var D1last = new Date(yearP, monthP + 1, 0).getDate(); // последний день месяца
    var D1Nlast = new Date(yearP, monthP, D1last).getDay(); // день недели последнего дня месяца
    var D1Nfirst = new Date(yearP, monthP, 1).getDay(); // день недели первого дня месяца

    var calendar1 = '<tr>';
// пустые клетки до первого дня текущего месяца
    if (D1Nfirst != 0) {
        for (var i = 1; i < D1Nfirst; i++)
            calendar1 += '<td>';
    } else { // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток 
        for (var i = 0; i < 6; i++)
            calendar1 += '<td>';
    }

// функция сравнения дат Unix time
    function comparingDatesUnix(year1, month1, day1, sec) {
        var date2 = new Date(sec * 1000);
        var year2 = date2.getFullYear();
        var month2 = date2.getMonth();
        var day2 = date2.getDate();
        if (year1 === year2 && month1 === month2 && day1 == day2)
            return true;
        else
            return false;
    }

// функция сравнения дат 2018-12-31 23:12:13
    function comparingDates(year1, month1, day1, date2) {
        var year2 = date2.substring(0, 4) + 0;
        var month2 = date2.substring(5, 7) - 1;
        var day2 = date2.substring(9, 10) + 0;
        if (year1 === year2 && month1 === month2 && day1 == day2)
            return true;
        else
            return false;
    }


// дни месяца

    for (var i = 1; i <= D1last; i++) {
        var curDayStr = (i < 10) ? '0' + i : i;
        var curDateStr = yearP + '-' + MonthStr + '-' + curDayStr;

        var dataEventsDey = dataEvents.filter(function(data) {
            return (data.date_time == curDateStr);
        });

        console.log(i);
        console.log(dataEventsDey);

        var eventsList = '';
        if (dataEventsDey.length > 0) {
            dataEventsDey.forEach(function(item, i) {
                eventsList += ' ' + item.result;
            });
        }

        if (i != D1.getDate()) {
            calendar1 += '<td><div class="main"><div>';
            calendar1 += i + eventsList;
            calendar1 += '</div></div></td>';
        } else {
            calendar1 += '<td id="today"><div class="main"><div>';  // сегодняшней дате можно задать стиль CSS
            calendar1 += i + eventsList;
            calendar1 += '</div></div></td>';
        }
        if (new Date(D1.getFullYear(), D1.getMonth(), i).getDay() == 0) {  // если день выпадает на воскресенье, то перевод строки
            calendar1 += '<tr>';
        }
    }

// пустые клетки после последнего дня месяца
    if (D1Nlast != 0) {
        for (var i = D1Nlast; i < 7; i++)
            calendar1 += '<td>';
    }


    var calendar2 = '<table><thead><tr><td colspan="4">' + D1.getFullYear() + '</td><td colspan="3">' + month[D1.getMonth()] + '</td></tr><tr><td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td></tr></thead>';
    calendar2 += calendar1 + '</tbody></table>';
    $("#calendar-tadev").append(calendar2);

});