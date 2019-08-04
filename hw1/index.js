'use strict';

//Задача 1
let t = prompt('Температура в градусах по Цельсию');
let f = Math.round((9 / 5) * t + 32);
alert(`Температура в градусах по Фаренгейту - ${f}`);

//Задача 2

let admin;
let name = 'Василий';

admin = name;
console.log(admin);

//Задача 3
/* Цифры складываются, строка просто приклеивается,
результат - строка */
console.log(10 + 10 + '10');
/*Всё просто склеивается, т.к. есть строка в середине */
console.log(10 + '10' + 10);
/* Унарный плюс превращает строку в число*/
console.log(10 + 10 + +'10');
/*Унарный минус привёл строку к числу, т.к. строка пустая, то результатом приведения
будет 0. Знак сохраняется, результат -Infinity*/
console.log(10 / -'');
/*NaN, 2,5 нельзя привести к числу, т.к. запятая не является отделением дробной части */
console.log(10 / +'2,5');

//Программа вычисления счастливого билета
//123456
let ticketNumber = +prompt('Введите номер билета');
let firstThree = parseInt(ticketNumber / 10 ** 3);
let lastThree = ticketNumber % 10 ** 3;
if (firstThree % 10 + parseInt(firstThree % 100 / 10) + parseInt(firstThree / 100) ===
    lastThree % 10 + parseInt(lastThree % 100 / 10) + parseInt(lastThree / 100)) {
    alert('У вас счасливый билет!');
} else {
    alert('Увы! Попробуйте ещё раз!');
}
//Решение 2
let number = parseInt(prompt('Введите номер билета')),
    n1 = number % 10,
    n2 = Math.floor(number / 10) % 10,
    n3 = Math.floor(number / 10 ** 2) % 10,
    n4 = Math.floor(number / 10 ** 3) % 10,
    n5 = Math.floor(number / 10 ** 4) % 10,
    n6 = Math.floor(number / 10 ** 5) % 10;

if (n1 + n2 + n3 === n4 + n5 +n6) {
    alert('У вас счасливый билет!');
} else {
    alert('Увы! Попробуйте ещё раз!');
}