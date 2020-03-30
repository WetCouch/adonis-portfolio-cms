'use strict';

const User = use('App/Models/User');

class UserController {
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
