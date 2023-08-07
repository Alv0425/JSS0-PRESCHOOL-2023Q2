console.log('%cLibrary #1, фиксированная верстка по макету из Figma', 'font-weight:700; color:blue;');
console.log('Оценка 100/100. ')

let p1 = '1. Верстка валидная: +10 \n';
let p2 = '2. Верстка семантическая: +16: \n';
let p21 = ' ---> <header>, <main>, <footer> +2 \n'; 
let p22 = ' ---> 6 элементов <section> +2 \n';
let p23 = ' ---> только один заголовок <h1> +2 \n';
let p24 = ' ---> один элемент <nav> в хедере +2 \n';
let p25 = ' ---> панель навигации, ссылки \n     на соцсети в футере оформлены\n     в виде ul > li > a +2\n';
let p26 = ' ---> кнопки button +2\n ---> два инпута типа text в Library cards, \n     4 инпута radio в Favorites +2 \n';
p2=p2+p21+p22+p23+p24+p25+p26; 

let p3 = '3. Вёрстка соответствует макету +54:\n отклонения по PP не превышают 10px\n';
let p31 = ' ---> блок <header> +8: расстояние между \n     элементами меню 30px, при наведении \n     кнопки плавно меняют цвет.\n';
let p32 = ' ---> секция Welcome +4\n';
let p33 = ' ---> секция About: +6: скрытые картинки слайдера \n     спрятаны через display: none;\n     область нажатия на кнопки пагинации\n     увеличена до размера 26*26px \n';
let p34 = ' ---> секция Favorites +8: картинки\n     добавлены для всех секций \n';
let p35 = ' ---> секция Coffee Shop +6 \n' ;
let p36 = ' ---> секция Library Card +8 \n';
let p37 = ' ---> блок Footer +8 \n';
p3 = p3 + p31+p32+p33+p34+p35+p36+p37;

let p4 = '4. Общие требования к верстке +20 \n'
let p41 = ' ---> для построения сетки используется flex \n'
let p42 = ' ---> верстка центрирована оберткой и не\n     съезжает при уменьшении масштаба\n'
let p43 = ' ---> иконки добавлены в формате .svg\n'
let p44 = ' ---> изображения добавлены в формате .jpg\n'
let p45 = ' ---> есть favicon\n'
let p46 = ' ---> плавная прокрутка по якорям\n'
let p47 = ' ---> в футере есть ссылка на GitHub\n'
let p48 = ' ---> там же есть ссылка на rss курс\n'
let p49 = ' ---> интерактивность кнопок согласно макету (меняют цвет при hover)\n'
let p50 = ' ---> плавное изменение внешнего вида элемента\n     при наведении и клике не\n     влияет на соседние элементы\n'
p4 = p4+p41+p42+p43+p44+p45+p46+p47+p48+p49+p50;

let review = p1+p2+p3+p4;

console.log(review);



const navBar = document.getElementById("navbar");
const navButton = document.getElementById('navbutton');
const navLinks = document.querySelectorAll('li a');
const navCont = document.getElementById("navcontainer");
const userButton = document.getElementById("user-button");

let navBarstatus = 0;

navButton.addEventListener('click', () => {
    if (navBarstatus == 0){  
        navBar.classList.remove("navbar-closed");
        navBar.classList.add("navbar-open");
        navButton.classList.add("close");
        navBarstatus = 1;
        document.body.style.overflow = "hidden";
    } else {
        navBar.classList.remove("navbar-open");
        navBar.classList.add("navbar-closed");
        navButton.classList.remove("close");
        navBarstatus = 0;
        document.body.style.overflow = "auto";
    }
});

document.addEventListener('touchend', (event) => {
    if (navBarstatus == 1){
        if (!navBar.contains(event.target) && !navButton.contains(event.target)) {
            navBar.classList.remove("navbar-open");
            navBar.classList.add("navbar-closed");
            navButton.classList.remove("close");
            navBarstatus = 0;
            document.body.style.overflow = "auto";
        }
    }
    
});

document.addEventListener('click', (event) => {
    if (navBarstatus == 1){
        if (!navBar.contains(event.target) && !navButton.contains(event.target)) {
            navBar.classList.remove("navbar-open");
            navBar.classList.add("navbar-closed");
            navButton.classList.remove("close");
            navBarstatus = 0;
            document.body.style.overflow = "auto";
        }
    }
    
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navBar.classList.remove("navbar-open");
        navBar.classList.add("navbar-closed");
        navButton.classList.remove("close");
        navBarstatus = 0;
        document.body.style.overflow = "auto";
    });
});