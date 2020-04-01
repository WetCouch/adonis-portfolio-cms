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

  async showLogin ({ auth, view, response }) {
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

  async signup ({ request, response, view }) {
    const { username, email, password, repeatPassword } = request.all();
    const user = new User();
    try {
      if (password === repeatPassword) {
        user.username = username;
        user.email = email;
        user.password = password;
        await user.save();
        response.route('/panel');
      } else return view.render('admin.createUser', {passwordStatus: 'Passwords do not match'});
    } catch (err) {
      return err;
    }
  }
}

module.exports = LoginController;
