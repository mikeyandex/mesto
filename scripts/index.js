import FormValidator from './validate.js'; 
import Card from './card.js'; 
import settings from './validate.js';   

//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

//Просмотр карточки
const cardPreview = document.querySelector('.popup__image-preview');
const cardPreviewTitle = document.querySelector('.popup__image-view');

//Контейнер для карточек
const tableElements = document.querySelector('.elements');//Контейнер для карточек
const templateElement = document.querySelector('.clone-element');
const templateCard = templateElement.content.querySelector('.element');

//Определение попапов
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popups = document.querySelectorAll('.popup')

//Поля имя и занятие в popupEdit
const nameInput = document.querySelector('.popup__form-input_type_name');
const jobInput = document.querySelector('.popup__form-input_type_job');

//Поля название и линк в popupAdd
const titleInput = document.querySelector('.popup__form-input_type_title');
const linkInput = document.querySelector('.popup__form-input_type_link');

//Поля имя и занятие в профиле
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Формы
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];

//6 'карточек' при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Вывожу первые 6 карточек

initialCards.reverse().forEach((item) => {
/*
    // Создадим экземпляр карточки
    const card = new Card(item.text, item.image);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    document.body.append(cardElement);
  */

  const card = new Card(item.name, item.link, '.clone-element');
  const cardElement = card.createCard();
 
  prependCard(cardElement);
  
  
});

//console.log(templateElement.content)

//----------------------------
/*
//Удаление карточки
function addRemoveListener(inputCard) {
  const deleteButton = inputCard.querySelector('.element__trash');
  const deleteCard = () => {
    inputCard.remove();
  };
  deleteButton.addEventListener('click', deleteCard);
};

//Лайк
function addLikeListener(inputCard) {
  const likeButton = inputCard.querySelector('.element__like');
  const likeCard = () => {
    likeButton.classList.toggle('element__like_added');
  };
  likeButton.addEventListener('click', likeCard);
};

//Создаю новую карточку
function createCard(title, link) {
  const inputCard = templateCard.cloneNode(true);
  const cardImage = inputCard.querySelector('.element__image-mesto')
  cardImage.src = link;
  cardImage.alt = title;
  inputCard.querySelector('.element__image-title').textContent = title;

  addRemoveListener(inputCard);

  addLikeListener(inputCard);

  cardImage.addEventListener('click', () => {
    cardPreview.src = link;
    cardPreview.alt = title;
    cardPreviewTitle.textContent = title;
    openPopup(popupPhoto);
  });
  return inputCard;
};
*/

function openPopup(popup) {
  popup.classList.add('popup_opened');
  //Вешаю слушатель на Escape
  document.addEventListener('keydown', clickEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //Удаляю слушатель с Escape
  document.removeEventListener('keydown', clickEscape);
}

//Функция закрывает открытый попап на нажатию Эскейп
function clickEscape(event) {
  if (event.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


function prependCard(card) {
  tableElements.prepend(card);

};


//Открытие попапа редактирования
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});



//Закрытие попапов кнопкой Close или по нажатию на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (event.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})


/*Отправка формы профиля*/

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit)
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

/*Отправка формы карточки*/

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  prependCard(createCard(titleInput.value, linkInput.value));
  closePopup(popupAdd);
  cardForm.reset();
}

cardForm.addEventListener('submit', handleCardFormSubmit);

//--------------------------------------------------------

const formEditProfileValidator = new FormValidator(settings, profileForm);
formEditProfileValidator.enableValidation();

const formAddProfileValidator = new FormValidator(settings, cardForm);
formAddProfileValidator.enableValidation();

const newCard = new Card(titleInput, linkInput, templateElement);

//prependCard(newCard);