export default class UserInfo {
  constructor({name, job}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {

    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    }

    return userInfo;
  }


  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;

    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    }

    return userInfo;
    
  }

}