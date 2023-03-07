export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;//начальные карточки
    this._renderer = renderer;//функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.reverse().forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}