
export default class Card {
  constructor(titleInput, linkInput, cardSelector) {
    this._name = titleInput;
		this._link = linkInput;
    this._cardSelector = cardSelector;
    console.log(this._cardSelector)
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
  console.log(this._link)
  this._element.querySelector('.element__image-title').textContent = this._name;
  
  /*
  this._hasDeleteBtn();
  this._setEventListeners();
  */

  return this._element;


};  
}

