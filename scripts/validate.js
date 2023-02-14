

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
  this._inputErrorClass = inputErrorClass;
  this._errorClass = settings.errorClass;

  this._inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  this._buttonElement = formElement.querySelector(this.submitButtonSelector);
  this._formList = Array.from(document.querySelectorAll(settings.formSelector)); 
  }

enableValidation = (settings) => {
    
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disabledButton(formElement, settings);})
})
};


_showInputError = () => {
  (formElement, inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass); console.log(errorElement.classList)
  };
}

_hideInputError = () => (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

_checkInputValidity = () => {
  (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
}

_setEventListeners = () => {
  (formElement) => {

    toggleButtonState(this.inputList, this.buttonElement);

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
}

_hasInvalidInput = () => {
  (inputList, inputElement) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

_toggleButtonState = () => {
  (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
      } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }
}

_disabledButton = () => {
  (formElement, settings) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
}




}




/*

//Входящие параметры
const settings = {
  formSelector: '.form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__input-error_visible'
};
*/

/*
const enableValidation = (settings) => {

  //Показать ошибку
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass); console.log(errorElement.classList)
  };

  //Спрятать ошибку
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

  //Проверка валидности 
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };


  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);



    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

  const hasInvalidInput = (inputList, inputElement) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
      } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //Функция деактивирует кнопку сабмит после ввода карточки
  const disabledButton = (formElement, settings) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    buttonElement.classList.add(settings.inactiveButtonClass);
  }

  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disabledButton(formElement, settings);

    });

    setEventListeners(formElement);
  });
}

enableValidation(settings);

*/

/*
-------------------------------------------------------------------

//Входящие параметры
const settings = {
  formSelector: '.form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__input-error_visible'
};

const enableValidation = (settings) => {

  //Показать ошибку
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass); console.log(errorElement.classList)
  };

  //Спрятать ошибку
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

  //Проверка валидности 
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };


  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);



    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

  const hasInvalidInput = (inputList, inputElement) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.setAttribute('disabled', '');
      } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  const disabledButton = (formElement, settings) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
  //Функция деактивирует кнопку сабмит после ввода карточки
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      disabledButton(formElement, settings);

    });

    setEventListeners(formElement);
  });
}

enableValidation(settings);

*/