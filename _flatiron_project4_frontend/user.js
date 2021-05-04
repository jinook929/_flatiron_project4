class User {
  constructor(user) {
    this.email = user.email
    this.password_digest = user.password_digest
    this.message = user.message
  }

  get username() {
    return this.email.split("@")[0].toUpperCase()
  }
}