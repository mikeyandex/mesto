const settings = {
  formSelector: '.form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: '.popup__button-save_disabled',
  inputErrorClass: '.popup__input-error_visible',
  errorClass: '.popup__form-input_type_error'
};

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorClass);

};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  formElement.classList.remove(settings.errorClass);
  errorElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {

  if (!inputElement.validity.valid) {
    console.log(inputElement.validity)
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
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);

    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);


  });
}

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(buttonElement)

  if (hasInvalidInput(inputList)) {

    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {

    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};


enableValidation(settings);
