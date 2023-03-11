import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleCardFormSubmit) {
    super(popupElement);    
    this._popupForm = popupElement;
    this._inputList = this._popupForm.querySelectorAll('.popup__form-input');
    this._submitButtonElement = this._popupForm.querySelector('.popup__button-save');
    this._handleCardFormSubmit = handleCardFormSubmit;
  }
  _getInputValues() {
    this._formValues = {};//Создаю пустой объект
    this._inputList.forEach(input => {
    this._formValues[input.name] = input.value});//и обхожу его циклом
    return this._formValues;

  }

  setEventListeners() {
    super.setEventListeners();    
    this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this._handleCardFormSubmit(this._getInputValues());
        this.close;  
        event.target.reset();     
      });
  }

  close() {
    super.close();    
  }

}
