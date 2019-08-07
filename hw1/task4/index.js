'use strict';

/*
4*.Пользователь, с помощью команды prompt, вводит номер билета - 6 цифр.
Программа определяет является ли счастливым данный билетик и выводит соответстующее сообщение в консоль.
Счастливый билет - билет, у которого сумма первых трех цифр равна сумме последних трех цифр номера билета.
Для выполнения задания необходимо использовать оператор % и ветвление.
Чтобы сравнить два значения, можно использовать if и else (курс основ программирования), например:
*/

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

if (n1 + n2 + n3 === n4 + n5 + n6) {
    alert('У вас счасливый билет!');
} else {
    alert('Увы! Попробуйте ещё раз!');
}