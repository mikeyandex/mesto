export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    const initProfile = fetch('https://mesto.nomoreparties.co/v1/cohort-61//users/me', {
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339'
      }
    })
    return initProfile.then(res => res.json());
  }

  getInitialCards() {
    const array = fetch('https://mesto.nomoreparties.co/v1/cohort-61/cards', {
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339'
      }
    })
    return array.then(res => res.json());
  }

  patchProfile() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-61/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: '',
        about: ''
      })
    })
  }

  addNewCard(data) {
    fetch('https://mesto.nomoreparties.co/v1/cohortId/cards', {
      method: 'POST',
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }




  // другие методы работы с API
}

