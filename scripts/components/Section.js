/*
✔️  класс Section:
1. Аргументы: { items, renderer }, containerSelector
2. items - массив карточек
3. renderer - функция которая описывает логику создания новой карточки. То есть функция, которая принимает данные, необходимые для создания карточки. Затем внутри себя создает ее и добавляет в список через публичный метод этого списка. Функция не должна ничего возвращать, а просто создает карточку и добавляет в список (то есть там по идее не нужен return)
4. Внутри продумайте логику для отрисовки всех карточек, полученных через аргумент конструктора items, а также логику для отрисовки одной карточки (через аргумент, который получает сам метод отрисовки одной карточки). То есть по крайней мере, у вас должно быть два метода помимо конструктора.  

*/

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;//начальные карточки
    this._renderer = renderer;//функция, которая отвечает за создание и отрисовку данных на странице.

    this._container = document.querySelector(containerSelector);
    console.log(containerSelector)

    //this._container = document.querySelector(containerSelector);//селектор контейнера, в который нужно добавлять созданные элементы.
    
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }



  addItem(element) {
    this._container.prepend(element);
    /*this._container.prependCard(cardElement);*/
  }
}