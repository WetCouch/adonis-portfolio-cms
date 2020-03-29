'use strict';

const User = use('App/Models/User');

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
      const users = (await User.all()).toJSON();

      return view.render('admin.panel', {users: users});
    } catch (err) {
      response.redirect('login');
    }
  }

  async showUser ({ params, view }) {
    try {
      const user = (await User.find(params.id)).toJSON();
      return view.render('admin.user', {user: user});
    } catch (err) {
      return err;
    }
  }

  async changePassword ({ params, request, view }) {
    const { password, repeatPassword } = request.all();

    try {
      const user = await User.find(params.id);
      const userData = user.toJSON();

      if (password === repeatPassword) {
        user.password = password;
        await user.save();
        return view.render('admin.user', {user: userData, changedStatus: 'New password saved'});
      } else return view.render('admin.user', {user: userData, changedStatus: 'Passwords do not match'});
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserController;
