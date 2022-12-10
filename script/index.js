const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__button-close');
const popupOn = document.querySelector('.popup');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formInput = document.querySelectorAll('.popup__form-input');

//Открытие попапа
editButton.addEventListener('click', () => {
  popupOn.classList.add('popup_opened');
  });
  
//Закрытие  попапа
closeButton.addEventListener('click', () => {
  popupOn.classList.remove('popup_opened');
  });
  
/*При открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.*/  
formInput[0].value = profileTitle.textContent;
formInput[1].value = profileSubtitle.textContent;

/*Отправка формы*/
let formElement = document.querySelector('.popup__container');
let nameInput = formInput[0];
let jobInput = formInput[1];

function handleFormSubmit (evt) {
evt.preventDefault(); 
profileTitle.textContent = nameInput.value;
profileSubtitle.textContent = jobInput.value;
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
