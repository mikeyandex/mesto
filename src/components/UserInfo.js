export default class UserInfo {
  constructor({name, job, avatar}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);  
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }


  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
  
changeAvatarInfo(data) {
  this._avatar.src = data.avatar;
}

}