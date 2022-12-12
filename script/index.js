const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const addButton = document.querySelector('.popup__button-save');
const popupOn = document.querySelector('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formInput = document.querySelectorAll('.popup__form-input');

//Открытие попапа
editButton.addEventListener('click', () => {
  popupOn.classList.add('popup_opened');
  formInput[0].value = profileTitle.textContent;
  formInput[1].value = profileSubtitle.textContent;
});

//Закрытие  попапа
closeButton.addEventListener('click', () => {
  popupOn.classList.remove('popup_opened');
});

//Сохранение изменений
addButton.addEventListener('click', () => {
  popupOn.classList.remove('popup_opened');
  profileTitle.textContent = formInput[0].value;
  profileSubtitle.textContent = formInput[1].value;
});

/*Отправка формы*/
let formElement = document.querySelector('form');
let nameInput = formInput[0];
let jobInput = formInput[1];

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
