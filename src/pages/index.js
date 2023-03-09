import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import Popup from '../components/Popup.js';
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
const popup = document.querySelector('.popup');
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

//Экземпляр класса Popup 
const newPopup = new Popup(popup);
newPopup.setEventListeners();

//Экземпляр класса Section
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.name, item.link, '.clone-element', handleCardClick);
    const cardElement = newCard.createCard();
    cardList.addItem(cardElement);
  }
}, '.elements');
cardList.renderItems();

//Экземпляр класса UserInfo
const userProfile = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle'
});

//Экземпляр класса PopupWithForm  
const popupForm = new PopupWithForm(popupAdd, () => {
  const newCard = new Card(titleInput.value, linkInput.value, '.clone-element', handleCardClick);
  const cardElement = newCard.createCard();
  cardList.addItem(cardElement);
  popupForm.close();
  validatorAdd.toggleButtonState();//блокирую кнопку Submit при повторном открытии формы
});
popupForm.setEventListeners();


//Открытие попапа редактирования
editButton.addEventListener('click', () => {
  newPopup.open();  
  const userData = userProfile.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});


profileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  userProfile.setUserInfo(nameInput.value, jobInput.value);
  newPopup.close();
});


//Открытие попапа карточки
addButton.addEventListener('click', () => {
  popupForm.open();
});
