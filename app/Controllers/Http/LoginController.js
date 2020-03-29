'use strict';

class LoginController {
  async login ({ auth, request, response }) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
      response.redirect('panel');
    } catch (err) {
      return err;
    }
  }

  async logout ({ auth, response }) {
    await auth.logout();
    response.redirect('login');
  }

  async showLogin ({ auth, view, response }) {
    try {
      await auth.check();
      response.redirect('panel');
    } catch (err) {
      return view.render('admin.login');
    }
  }
}

module.exports = LoginController;
