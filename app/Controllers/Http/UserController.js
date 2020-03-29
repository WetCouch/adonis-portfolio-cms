'use strict';

class UserController {
  async login ({ auth, request, response }) {
    const { email, password } = request.all();
    try {
      if (await auth.attempt(email, password)) return response.redirect('test');
    } catch (e) {
      console.log(e);
    }
  }

  async logout ({ auth, response }) {
    await auth.logout();
    return response.redirect('login');
  }

  show ({ auth, view, response }) {
    if (auth.user) return view.render('admin.test');
    else return response.redirect('login');
  }
}

module.exports = UserController;
