

const settings = {
  formSelector: '.form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__input-error_visible'
};


export default class FormValidator {
  constructor(settings, formElement) {//formElement - то, что валидируется (edit или photo)

  this._formSelector = settings.formSelector;

  this._inputSelector = settings.inputSelector;
  this._submitButtonSelector = settings.submitButtonSelector;
  this._inactiveButtonClass = settings.inactiveButtonClass,
  this._inputErrorClass = settings.inputErrorClass;
  this._errorClass = settings.errorClass;

  this._formElement = formElement;

  }


  //Показать ошибку
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass); 
  }

    //Спрятать ошибку
    _hideInputError(formElement, inputElement) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };

      //Проверка валидности 
    _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  _hasInvalidInput(inputList, inputElement) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

   
  _setEventListeners(formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
 
    this._toggleButtonState(inputList, buttonElement);


    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        console.log(inputElement)
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }  

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
      } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //Функция деактивирует кнопку сабмит после ввода карточки
  _disabledButton(formElement, settings) {
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  enableValidation() {
    this._setEventListeners();
    
  }

}