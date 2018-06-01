$(function() {
    var D1 = new Date();
    console.log(D1);
    D1last = new Date(D1.getFullYear(), D1.getMonth() + 1, 0).getDate(), // последний день месяца
            D1Nlast = new Date(D1.getFullYear(), D1.getMonth(), D1last).getDay(), // день недели последнего дня месяца
            D1Nfirst = new Date(D1.getFullYear(), D1.getMonth(), 1).getDay(), // день недели первого дня месяца
            calendar1 = '<tr>',
            month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]; // название месяца, вместо цифр 0-11

// пустые клетки до первого дня текущего месяца
    if (D1Nfirst != 0) {
        for (var i = 1; i < D1Nfirst; i++)
            calendar1 += '<td>';
    } else { // если первый день месяца выпадает на воскресенье, то требуется 7 пустых клеток 
        for (var i = 0; i < 6; i++)
            calendar1 += '<td>';
    }

// дни месяца
    for (var i = 1; i <= D1last; i++) {
        if (i != D1.getDate()) {
            calendar1 += '<td><div class="main"><div>';
            calendar1 += i;
            calendar1 += '</div></div></td>';
        } else {
            calendar1 += '<td id="today"><div class="main"><div>';  // сегодняшней дате можно задать стиль CSS
            calendar1 += i;
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