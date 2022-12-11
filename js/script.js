/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */



'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll('.promo__adv img'), // можно без точки оброщаться к тегу img button если класс , Добавить точку
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector("form.add"),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');
    
        
    addForm.addEventListener('submit', (event)=>{
        event.preventDefault(); // страница не будет перезагружаться

        let newFilm = addInput.value; // записываем от пользователя ответ , переменная let Потому что изменяем строку через substring
        const favorite = checkbox.checked; // получаем true или false 

        if(newFilm){ //если получает пустую строчку False 

            if(newFilm.length > 14){ //проверка длины текста 
                newFilm = `${newFilm.substring(0,14)}...`// Отрезаем текст с 0 до 14 элемента в строке
            }

            if(favorite){// проверяем true or false
                console.log("Любимый фильм")// если добавили галочку чекбокса
            }

            movieDB.movies.push(newFilm); // вставляю фильм который записан в переменной newFilm
            sortArr(movieDB.movies); // делаем сортировку
            creatMovieList(movieDB.movies, movieList);// создаем структуру верстки для добовления фильма функция ниже
        }
        event.target.reset() // делаем обнуления поля ввода input
    })

    const deletAdv = (arr) => { // функция для удаления всей рекламы
        arr.forEach(i =>{
            i.remove();
        });
    }
    
    const makeChanger = () =>{ // работа с стилями  
        genre.textContent = 'драма';

        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }
    const sortArr = (arr) => {//  сортировка списка   
        arr.sort();
    }

    function creatMovieList(films, parent) {
        parent.innerHTML = "";// пустой блок для добовления верстки
        sortArr(films) // cортировка фильмов

        films.forEach((film, i) => {// проверка имеющихся фильмов и если есть присваивает к parent - это movieList cписок
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film} 
                <div class="delete"></div>
            </li>
            ` // добовление элементов
        });
        
        document.querySelectorAll('.delete').forEach((btn, i) => { // для удаления по кнопке  берем элемент delete, плдучаю элемент и его id [0] - в масиве
            btn.addEventListener('click', () =>{ // делаем прослушиваение кнопки по клику
                btn.parentElement.remove(); // удаляем его родителя 
                films.splice(i, 1) // удаляем с масива splice- метод которые вырезает определеный элемент из масива, 1 элемент какой 2рой склько
                creatMovieList(films, parent);// реурсия перезапись элементов
            })
        })
    }

    deletAdv(adv);
    makeChanger();
    creatMovieList(movieDB.movies, movieList);
    
})