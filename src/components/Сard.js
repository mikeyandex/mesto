export default class Card {
  constructor(titleInput, linkInput, counterOfLikes, cardSelector, handleCardClick, toDelete, setLike, removeLike) {
    this._name = titleInput;
    this._link = linkInput;
    this._counterOfLikes = counterOfLikes;
/*
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id; //id карточки
    this._likes = data.likes;

    this._userId = userId; //мой id 
    this._isOwnerCard = data.owner._id === userId; //id владельца карточки*/

    this._cardSelector = cardSelector;


    
    this._toDelete = toDelete;
    this._handleCardClick = handleCardClick;
    this._setLike = setLike;
    this._removeLike = removeLike;
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
    this._likeCounter = this._element.querySelector('.element__counter');
    //this._likeCounter.textContent = this._likes.length;

    this._deleteButton = this._element.querySelector('.element__trash');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__image-title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  };

  like() {
    this._likeButton.classList.toggle('element__like_added');//Переключение лайков
    //this._likeCounter.textContent = 
  };

  _setEventListeners() {
    //Слушатель превью
    this._cardImage.addEventListener(`click`, () => this._handleCardClick(this._link, this._name));

    //Слушатель удаления карточки
    this._deleteButton.addEventListener(`click`, (event) => {
      this._toDelete();
    
      event.target.closest
      //this._element.remove();
    });
    

    //Слушатель лайка
    this._likeButton.addEventListener(`click`, () => {
      this._like();
    });
  }
  _toDelete() {
    this._element.remove();
  }
}

