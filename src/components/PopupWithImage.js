import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImage = this._popup.querySelector('.popup__image-preview');
    this._popupName = this._popup.querySelector('.popup__image-view');
  }

  open(title, link) {
    this._popupImage.src = link;
    this._popupName.textContent = title;
    this._popupImage.alt = title;
    super.open();
  }
}