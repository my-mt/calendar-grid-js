function showEvent(idEvent) {
    var dataEvent = dataEvents.filter(function(data) {
        return (data.id == idEvent);
    });
    var event = dataEvent[0];
    var table = '<table class="table"><tr><td>';
    table += event.date_time + '</td';
    table
    
    $("#eventModal .modal-title").text('').text(dataEvent[0].event_name);
    $("#eventModal .modal-body h3").text('').text(dataEvent[0].result);
    $("#eventModal").modal('show');
}

var dataEvents = [
    {"id": 1, "event_id": 126, "user_id": 39, "note": "", "date_time": "2018-04-01 22:34", "result": 8, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": "", "background": "#1834FF", "event_name": "My event"},
    {"id": 2, "event_id": 127, "user_id": 39, "note": "", "date_time": "2018-04-04 22:34", "result": "", "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": "", "background": "#FF1840", "event_name": "My event2"},
    {"id": 3, "event_id": 126, "user_id": 39, "note": "", "date_time": "2018-04-01 22:34", "result": 8, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": "", "background": "#1834FF", "event_name": "My event3"},
    {"id": 4, "event_id": 127, "user_id": 39, "note": "", "date_time": "2018-04-06 22:34", "result": 11, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": "", "background": "#FF1840", "event_name": "My event4"},
    {"id": 5, "event_id": 128, "user_id": 39, "note": "", "date_time": "2018-04-01 22:34", "result": 1, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": "", "background": "#156E07", "event_name": "My event5"},
    {"id": 6, "event_id": 129, "user_id": 39, "note": "", "date_time": "2018-04-30 22:34", "result": 1234, "price": 250, "additionally": "\u0421\u043d\u0435\u0433\u043e\u0432\u0438\u043a", "source": "", "background": "#10514E", "event_name": "My event6"},
];

$(function() {
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

        // отфильровываем события текущей даты
        var dataEventsDay = dataEvents.filter(function(data) {
            return (data.date_time.substring(0, 10) == curDateStr);
        });
        
        
        
        var dataEventsDayObj = {};

        dataEventsDay.forEach(function(item) {
            if (!Array.isArray(dataEventsDayObj[item.event_id]))
                dataEventsDayObj[item.event_id] = [];
            dataEventsDayObj[item.event_id].push(item.id);
        });
//        console.log(dataEventsDayObj);
        
        for (key in dataEventsDayObj) {
            console.log(dataEventsDayObj[key ]);
        }


        var eventsList = '';
        if (dataEventsDay.length > 0) {
            dataEventsDay.forEach(function(item, i) {
                var sizeEventItem = 'size-' + (item.result + '').length;
                eventsList += '<span onclick="showEvent(' + item.id + ')" class="event-item ' + sizeEventItem + '" style="background-color: ' + item.background + '">' + item.result + '</span>';
            });
        }

        var today = '';
        if (i != D1.getDate())
            today = ' today ';

        calendar1 += '<td><div class="main">';
        calendar1 += '<div class="date' + today + '">' + i + '</div>' + eventsList;
        calendar1 += '</div></td>';

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
    calendar2 += '<tbody>' + calendar1 + '</tbody></table>';
    $("#calendar-tadev").append(calendar2);

});