import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleCardFormSubmit) {
    super(popupSelector);
    
    this._popupForm = document.querySelector('.popup__card-mesto');
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
    this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleCardFormSubmit(this._getInputValues());       
      });
  }

  close() {
    super.close();
    console.log(this._popupForm)
    this._popupForm.reset();
  }

}
