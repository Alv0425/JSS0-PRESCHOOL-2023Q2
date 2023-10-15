'use strict';

const review = `
60/60
[+10] Вёрстка
  [+5] реализован интерфейс игры
  [+5] в футере ссылка на гитхаб, год создания, ссылка на курс
[+10] Реализована логика игры. Цель игры -- сортировка цветых жидкостей по пробиркам.
[+10] По окончании игры выводится её результат (количество ходов).
[+10] Есть таблица с 10 лучшими результатами игры (с минимальным количеством ходов и максимальным количеством баллов).
[+10] Реализованы анимации, звуки, настройки уровня сложности. Можно добавить дополнительную пробирку в сложных случаях, с потерей в начисляемых баллах.

------
Water Sort Puzzle -- популярная головоломка, цель которой рассортировать цветные жидкости по пробиркам. Каждая жидкость в конце игры должна находиться в отдельной пробирке.
Переливать жидкость можно или в пустую пробирку, или на жидкость того же цвета, если в пробирке достаточно места.

Генерация уровней происходит случайным образом, но все уровни решаемы. За каждый удачный ход начисляется 10 или 15 баллов, в зависимости от количества используемых пустых пробирок.

Наилучшим результатом игры считается наименьшее количество ходов при наибольшем количестве набранных баллов. 10 лучших игр отображается в таблице. На маленьких экранах этот список открывается по нажатию на кнопку в виде звезды.
При желании эти игры можно пройти повторно, кликнув на соответствующую.

Вся история игр хранится в localstorage. В информации (кнопка i) можно найти кнопку для сброса истории игр (очищается localstorage).
`;

console.log(review);