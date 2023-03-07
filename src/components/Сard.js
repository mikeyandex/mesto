export default class Card {
  constructor(titleInput, linkInput, cardSelector, handleCardClick) {
    this._name = titleInput;
    this._link = linkInput;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  // Получаю шаблон карточки
  _getTemplate() {
    this._card = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return this._card;
  }

  //Создаю новую карточку
  createCard() {
    this._element = this._getTemplate();//Вызов геттемплейт
    this._cardImage = this._element.querySelector('.element__image-mesto');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__trash');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__image-title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  _like() {
    this._likeButton.classList.toggle('element__like_added');
  };

  _setEventListeners() {
    //Слушатель превью
    this._cardImage.addEventListener(`click`, () => this._handleCardClick(this._link, this._name));
    //Слушатель удаления карточки
    this._deleteButton.addEventListener(`click`, () => {
      this._element.remove();
    });

    //Слушатель лайка
    this._likeButton.addEventListener(`click`, () => {
      this._like();
    });
  }
}

