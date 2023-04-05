import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupElement) {
    super(popupElement);    
    this._popupForm = popupElement;
    
    this._submitButtonElement = this._popupForm.querySelector('.popup__button-save');
  }

  setEventListeners() {
    super.setEventListeners();    
    this._popupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        this.close;      
      });
  }

}
