class User {
  constructor(user) {
    this.email = user.email
    this.username = user.username
    this.password_digest = user.password_digest
    this.message = user.message
  }
}