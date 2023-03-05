import FormValidator from './FormValidator.js';
import Card from './Сard.js';
import { initialCards } from './firstCards.js';

import Popup from './components/Popup.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/UserInfo.js';

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


//Вывожу первые 6 карточек

initialCards.reverse().forEach((item) => {
  const cardElement = assembleCard(item.name, item.link);
  prependCard(cardElement);
});

//Функция "собирает" карточку, остается только вставить ее
function assembleCard(name, link) {
  const card = new Card(name, link, '.clone-element', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

//Валидация формы профиля
const validatorProfile = new FormValidator(settings, document.querySelector('.popup__form-mesto'));
validatorProfile.enableValidation();

//Валидация формы карточки
const validatorAdd = new FormValidator(settings, document.querySelector('.popup__card-mesto'));
validatorAdd.enableValidation();

//Превью фотографий
function handleCardClick(title, link) {  
  const popupPreview = new PopupWithImage(popupPhoto); 
  popupPreview.open(link, title);
  popupPreview.setEventListeners();
}


function openPopup(popup) {
  const popupTemp = new Popup(popup);
  console.log(popup)
  popupTemp.open();
  popupTemp.setEventListeners();
};

function closePopup(popup) {
  const popupTemp = new Popup(popup);
  popupTemp.close();
}

//Вывод карточки на экран
function prependCard(card) {
  tableElements.prepend(card);
};
/*
//Экземпляр класса Section
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    
    const card = createCard(item, '.clone-element', handleCardClick);
    const element = card.createCard();
       
    cardList.addItem(element);
  }
}, tableElements);*/

//cardList.renderItems();


  //Экземпляр класса UserInfo
  const userProfile = new UserInfo({name: '.profile__title',
  job: '.profile__subtitle'});


  //Экземпляр класса PopupWithForm  
  const popupForm = new PopupWithForm(popupAdd, () =>  {
    //evt.preventDefault();
    const cardElement = assembleCard(titleInput.value, linkInput.value);
    prependCard(cardElement);
    console.log('вызов')
    //closePopup(popupAdd);
    //cardForm.reset();
    validatorAdd.toggleButtonState();//блокирую кнопку Submit при повторном открытии формы
  });
  //popupForm.setEventListeners();

  
//Открытие попапа редактирования
editButton.addEventListener('click', () => {
  openPopup(popupEdit);

  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});

//Открытие попапа карточки
addButton.addEventListener('click', () => {
  popupForm.open();
  popupForm.setEventListeners();
});

/*Отправка формы профиля*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const userData = userProfile.setUserInfo(nameInput.value, jobInput.value);
  profileTitle.textContent = userData.name;
  profileSubtitle.textContent = userData.job;

  closePopup(popupEdit)
}

profileForm.addEventListener('submit', handleProfileFormSubmit);