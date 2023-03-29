import FormValidator from '../components/FormValidator.js';
import Card from '../components/Сard.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import './index.css'; // добавьте импорт главного файла стилей 

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
const submitButtonAvatar = document.querySelector('.submit-avatar');
const changeAvatarButton = document.querySelector('.profile__avatar-button');
const initialButtonAvatarText = submitButtonAvatar.textContent;

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
const popupDelete = document.querySelector('.popup_confirm');
const popupAv = document.querySelector('.popup_avatar');

//Поля имя и занятие в popupEdit
const nameInput = document.querySelector('.popup__form-input_type_name');
const jobInput = document.querySelector('.popup__form-input_type_job');


//Кнопка смены аватара



//Поля название и линк в popupAdd
const titleInput = document.querySelector('.popup__form-input_type_title');
const linkInput = document.querySelector('.popup__form-input_type_link');

//Поля имя и занятие в профиле
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const avatar = document.querySelector('.profile__avatar');
console.log(avatar.sr) 
//Поле ввода аватара




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






//Создаю экземпляр АРI
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '0a100dcc-5407-41fd-b761-d5e72771a339',
    'Content-Type': 'application/json'
  }
});

//Экземпляр класса Section
const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link);
    cardList.addItem(cardElement);
  }
}, '.elements');

//Загружаю карточки с сервера.
api.getInitialCards().then((items) => {

  console.log(items.length)//items[5].likes.length

  cardList.renderItems(items)
  //.catch((error) => {console.log(error);})
})



//Загрузка информации о пользователе с сервера
api.getUserInfo().then((data) => {
  userProfile.setUserInfo(data.name, data.about, data.avatar)
  console.log(data)
})
  .catch((error) => {
    console.log(error);
  });




//Экземпляр класса UserInfo
const userProfile = new UserInfo({
  name: '.profile__title',
  job: '.profile__subtitle',
  avatar: '.profile__avatar',
});




//Попап редактирования профиля
const popupEditProfile = new PopupWithForm(popupEdit, () => {
  userProfile.setUserInfo(nameInput.value, jobInput.value);


  //Отправляю новый профайл на сервер

  api.patchProfile(nameInput.value, jobInput.value).then(() => {
    popupEditProfile.close();
  })
    .catch((error) => {
      console.log(error);
    })

});

popupEditProfile.setEventListeners();

//Функция создает карточку перед выводом на экран 
function createCard(name, link) {
  const newCard = new Card(name, link, '.clone-element', handleCardClick, toDelete, setLike, removeLike);
  const cardElement = newCard.createCard();
  return cardElement
};

const setLike = (id) => {
  api.like(id).then(() => {
    cardElement.like(id);
  })
    .catch((error) => {
      console.log(error);
    }
    )
};


const removeLike = (id) => {
  api.removeLike(id).then(() => {
    cardElement.like(id);
  })
    .catch((error) => {
      console.log(error);
    }
    )
};

//Создаю попап для согласия на удаление
const popupConfirm = new PopupWithForm(popupDelete);
const toDelete = () => {
  popupConfirm.open();
  popupConfirm.setEventListeners();
  api.deleteCard(id).then((data) => {

    //удаление карточки
    console.log(data)

  })

}



//Открыл попап аватар
changeAvatarButton.addEventListener(('click'), () => {
  popupAvatar.open();  
})

const avatarLink = document.getElementById('avatar-url-input');
const linkURL = avatarLink.textContent;
console.log(linkURL)


//Экземпляр попап аватар
const popupAvatar = new PopupWithForm(popupAv,
  (linkURL) => { 
    console.log(linkURL)   
    submitButtonAvatar.textContent = 'Сохранение...';
    return api.changeAvatar(linkURL)
      .then((data) => {
        userProfile.changeAvatarInfo(data);
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonAvatar.textContent = initialButtonAvatarText;
      });
  }
);




popupAvatar.setEventListeners();



//Попап добавления карточки 
const popupAddCard = new PopupWithForm(popupAdd, () => {

  const cardElement = createCard(titleInput.value, linkInput.value);
  api.addNewCard(titleInput.value, linkInput.value).then((data) => {
    cardList.addItem(cardElement);
    console.log(data)

  })
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



