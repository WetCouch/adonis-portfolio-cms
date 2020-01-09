'use strict'

class UserController {
  async login ({ auth, request }) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return 'Logged in successfully'
  }

  show ({ auth }) {
    return auth.user
  }
}

module.exports = UserController
