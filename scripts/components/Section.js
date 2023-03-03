export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;//функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = document.querySelector(containerSelector);//селектор контейнера, в который нужно добавлять созданные элементы.
  }

  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}