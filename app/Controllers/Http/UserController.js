'use strict';

class UserController {
  async login ({ auth, request, response }) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
      response.redirect('panel');
    } catch (e) {
      response.send(e);
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
    } catch (error) {
      return view.render('admin.login');
    }
  }

  async showPanel ({ auth, view, response }) {
    try {
      await auth.check();
      return view.render('admin.panel');
    } catch (error) {
      response.redirect('login');
    }
  }
}

module.exports = UserController;
