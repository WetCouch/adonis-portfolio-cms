'use strict';

const Setting = use('App/Models/Setting');
const User = use('App/Models/User');

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

  async view ({ auth, view, response }) {
    try {
      await auth.check();
      response.redirect('panel');
    } catch (err) {
      const allowSignup = (await Setting.findOrCreate(
        { key: 'allow_signup' },
        { key: 'allow_signup', value: 'true' }
      )).toJSON();

      return view.render('admin.login', {allowSignup: allowSignup.value});
    }
  }


}

module.exports = LoginController;
