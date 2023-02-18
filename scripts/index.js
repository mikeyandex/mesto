
import FormValidator from './validate.js';
//import constants from './constants.js';
import Card from './card.js';
//import settings from './validate.js';
import { initialCards } from './firstCards.js';
/*import { editButton, addButton, closeButtons, cardPreview, cardPreviewTitle,
tableElements, templateElement, templateCard, popupEdit, popupAdd, popupPhoto,
popups, nameInput, jobInput, titleInput, linkInput, profileTitle, profileSubtitle,
profileForm, cardForm } from './constants';*/


const settings = {
  formSelector: '.form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__input-error_visible'
};



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
export { editButton, addButton, closeButtons, cardPreview, cardPreviewTitle,
  tableElements, templateElement, templateCard, popupEdit, popupAdd, popupPhoto,
  popups, nameInput, jobInput, titleInput, linkInput, profileTitle, profileSubtitle,
  profileForm, cardForm }







//Вывожу первые 6 карточек
initialCards.reverse().forEach((item) => {
  const card = new Card(item.name, item.link, '.clone-element', handleCardClick);
  const cardElement = card.createCard();

  prependCard(cardElement);
});

//Превью фотографий
function handleCardClick(link, title) {
  cardPreview.src = link;
  cardPreview.alt = title;
  cardPreviewTitle.textContent = title;
  openPopup(popupPhoto);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  //Вешаю слушатель на Escape
  document.addEventListener('keydown', clickEscape);


};

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

  const validatorProfile = new FormValidator(settings, document.querySelector('.popup__form-mesto'));
  validatorProfile.enableValidation();
});

addButton.addEventListener('click', () => {
  openPopup(popupAdd);

  const validatorAdd = new FormValidator(settings, document.querySelector('.popup__card-mesto'));
  validatorAdd.enableValidation();
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
  const card = new Card(titleInput.value, linkInput.value, '.clone-element', handleCardClick);
  const cardElement = card.createCard();
  prependCard(cardElement);
  closePopup(popupAdd);
  cardForm.reset();
}

cardForm.addEventListener('submit', handleCardFormSubmit);

//--------------------------------------------------------



