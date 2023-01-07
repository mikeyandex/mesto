//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('.popup__button-close_type_edit');
const closeAddButton = document.querySelector('.popup__button-close_type_add');
const closePhotoButton = document.querySelector('.popup__button-close_type_photo');

const tableElements = document.querySelector('.elements');//Контейнер для карточек
const templateElement = document.querySelector('.clone-element');
const templateCard = templateElement.content.querySelector('.element')

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
  const card = newCard(item.name, item.link);
  enterCard(card);
});

function addRemoveListener(inputCard) {
  const deleteButton = inputCard.querySelector('.element__trash');
  const deleteCard = () => {
    inputCard.remove();
  };
  deleteButton.addEventListener('click', deleteCard);
};

function addLikeListener(inputCard) {
  const likeButton = inputCard.querySelector('.element__like');
  const likeCard = () => {
    likeButton.classList.toggle('element__like_added');
  };
  likeButton.addEventListener('click', likeCard);
};

function addPhotoListener(inputCard) {
  document.querySelector('.element__image-preview').src = link;
  document.querySelector('.popup__image-view').textContent = title;
  photo.addEventListener('click', () => { newCard(title, link); openPopup(popupPhoto); });

}

//Создаю новую карточку
function newCard(title, link) {
  const inputCard = templateCard.cloneNode(true);
  inputCard.querySelector('.element__image-mesto').src = link;
  inputCard.querySelector('.element__image-title').textContent = title;

  addRemoveListener(inputCard);

  addLikeListener(inputCard);

  const photo = inputCard.querySelector('.element__image-mesto');
  document.querySelector('.element__image-preview').src = link;
  document.querySelector('.popup__image-view').textContent = title;
  photo.addEventListener('click', () => { newCard(title, link); openPopup(popupPhoto); });

  return inputCard;
};

function openPopup(popupName) {
  if (popupName === popupEdit) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupName.classList.add('popup_opened');
  }
  else
    if (popupName === popupAdd) {
      popupName.classList.add('popup_opened');
    }
    else
      if (popupName === popupPhoto) {
        popupName.classList.add('popup_opened');
      }
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}
function enterCard(card) {
  tableElements.prepend(card);
};


//Открытие попапа редактирования и карточки
editButton.addEventListener('click', () => { openPopup(popupEdit); });
addButton.addEventListener('click', () => { openPopup(popupAdd); });


//Закрытие  попапов
closeEditButton.addEventListener('click', () => { closePopup(popupEdit); });
closeAddButton.addEventListener('click', () => { closePopup(popupAdd); });
closePhotoButton.addEventListener('click', () => { closePopup(popupPhoto); });


/*Отправка формы*/

formElement = document.querySelector('.popup__form-mesto');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEdit)
}

formElement.addEventListener('submit', handleFormSubmit);

/*Отправка формы add*/

addCard = document.querySelector('.popup__card-mesto');

function addCardSubmit(evt) {
  evt.preventDefault();
  enterCard(newCard(titleInput.value, linkInput.value));
  closePopup(popupAdd);
}

addCard.addEventListener('submit', addCardSubmit);