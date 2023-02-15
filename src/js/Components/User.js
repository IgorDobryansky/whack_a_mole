export default class User {
  constructor({ name, id, email }) {
    this.userName = name;
    this.userId = id;
    this.userEmail = email;
  }

  get getUserName() {
    return this.userName;
  }

  get getUserId() {
    return this.userId;
  }

  get getUserEmail() {
    return this.userEmail;
  }

  get userInfo() {
    return `Ім'я користувача: ${this.userName}.\nАйді користувача: ${this.userId}.\nЕмейл користувача: ${this.userEmail}`;
  }
}
