import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import './index.css'; // добавьте импорт главного файла стилей 


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


//Валидация формы профиля
const validatorProfile = new FormValidator(settings, document.querySelector('.popup__form-mesto'));
validatorProfile.enableValidation();

//Валидация формы карточки
const validatorAdd = new FormValidator(settings, document.querySelector('.popup__card-mesto'));
validatorAdd.enableValidation();

//Экземпляр класса PopupPopupWithImage 
const popupPreview = new PopupWithImage(popupPhoto);
popupPreview.setEventListeners();

//Превью фотографий
const handleCardClick = (title, link) => {
  popupPreview.open(link, title);
}

//Функция создает карточку перед выводом на экран 
function createCard(name, link) {
  const newCard = new Card(name, link, '.clone-element', handleCardClick);
  const cardElement = newCard.createCard();
  return cardElement
};

//Экземпляр класса Section
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardList.addItem(cardElement);
  }
}, '.elements');
cardList.renderItems();


//Экземпляр класса UserInfo
const userProfile = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle'
});

//Попап редактирования профиля
const popupEditProfile = new PopupWithForm(popupEdit, () => {
  userProfile.setUserInfo(nameInput.value, jobInput.value);
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

//Попап добавления карточки 
const popupAddCard = new PopupWithForm(popupAdd, () => {
/*
  const newCard = new Card(titleInput.value, linkInput.value, '.clone-element', handleCardClick);
  const cardElement = newCard.createCard();*/
  const cardElement = createCard(titleInput.value, linkInput.value);
  cardList.addItem(cardElement);
  popupAddCard.close();
  validatorAdd.toggleButtonState();//блокирую кнопку Submit при повторном открытии формы
});
popupAddCard.setEventListeners();


//Открытие попапа редактирования
editButton.addEventListener('click', () => {
  popupEditProfile.open();
  validatorProfile.resetValidation();
  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});

//Открытие попапа карточки
addButton.addEventListener('click', () => {
  popupAddCard.open();
  validatorAdd.resetValidation();
});