export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //При статусе ОК возвращаю JSON, иначе вывожу ошибку в консоль
  _getJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  //Получаю профайл
  getUserInfo() {
    const initProfile = fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339'
      }
    })
    return initProfile.then(this._getJson);
  }
  
  //Массив карточек на сервере
  getInitialCards() {
    const array = fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339'
      }
    })
    return array.then(this._getJson);
  }
  //Изменение данных профиля
  patchProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
    .then(this._getJson)
  }

  //Добавляю новую карточку
  addNewCard(sourceName, sourceLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: '0a100dcc-5407-41fd-b761-d5e72771a339',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: sourceName,
        link: sourceLink
      })
      
    })
    .then(this._getJson)

    }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._fetchUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._getJson);
  }

  //Ставлю лайк
  like(id) {
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers
    })
      .then(this._getJson);
  }

  //Убираю лайк
  removeLike(id) {
    return fetch(`${this._fetchUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(this._getJson);
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        //https://tophallclub.ru/wp-content/uploads/8/6/c/86cdc2ca8beca9c6a90d71fb10efeab6.png
        
        avatar: avatar["avatar-url"]
      }),
    })
    .then(this._getJson);
  }


}

