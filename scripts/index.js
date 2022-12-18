const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const saveButton = document.querySelector('.popup__button-save');
const popupOn = document.querySelector('.popup');

const nameInput = document.querySelector('.popup__form-input_type_name'); 
const jobInput = document.querySelector('.popup__form-input_type_job'); 

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formInput = document.querySelectorAll('.popup__form-input');

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

function saveChanges() {  
  profileTitle.textContent = nameInput.value;
  console.log(nameInput.value)
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

//Сохранение изменений

saveButton.addEventListener('click', saveChanges);


/*Отправка формы*/

let formElement = document.querySelector('form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);