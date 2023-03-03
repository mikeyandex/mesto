/*
Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
*/
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleCardFormSubmit) {
    super(popupSelector);

    this._popupForm = document.querySelector('.popup_add');
    this._inputList = this._popupForm.querySelectorAll('.popup__form-input');
    this._submitButtonElement = this._popupForm.querySelector('.popup__button-save');
    this._handleCardFormSubmit = handleCardFormSubmit;

    
  }
  _getInputValues() {
    this._formValues = {};//Создаю пустой объект
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value});//и обхожу его циклом
    console.log(this._formValues)
    return this._formValues;

  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this)
      this._popup.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
  }

  close() {
    super.close();
    this._popupForm.reset;
  }

}