const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const popupOn = document.querySelector('.popup');

const nameInput = document.querySelector('.popup__form-input_type_name'); 
const jobInput = document.querySelector('.popup__form-input_type_job'); 

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popupOn.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

//Открытие попапа
editButton.addEventListener('click', openPopup);

function closePopup() {
  popupOn.classList.remove('popup_opened');
}

//Закрытие  попапа
closeButton.addEventListener('click', closePopup);



/*Отправка формы*/

let formElement = document.querySelector('.popup__form-mesto');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);