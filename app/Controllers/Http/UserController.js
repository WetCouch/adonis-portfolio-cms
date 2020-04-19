'use strict';

const User = use('App/Models/User');

class UserController {

  async post ({ params, request, response, view }) {

    const { username, email, password, repeatPassword } = request.all();
    let user;

    if (params.id) user = await User.find(params.id);
    else user = new User();

    try {
      user.username = username;
      user.email = email;

      if (!password && params.id) return view.render('admin.pages.user', {user: user.toJSON(), passwordStatus: 'New credentials saved'});
      else if (password && password === repeatPassword) {

        user.password = password;
        await user.save();

        if (params.id) return view.render('admin.pages.user', {user: user.toJSON(), passwordStatus: 'New password saved'});
        else response.route('/panel/users/' + user.id);

      } else return view.render('admin.pages.user', {user: params.id ? user : undefined, passwordStatus: 'Passwords do not match'});
    } catch (err) {
      return err;
    }
  }

  async edit ({ params, view }) {
    try {
      const user = (await User.find(params.id)).toJSON();
      return view.render('admin.pages.user', {user: user});
    } catch (err) {
      console.log(err);
    }
  }

  async delete ({ params, response }) {
    try {
      const user = await User.find(params.id);
      await user.delete();
      response.route('/panel');
    } catch (err) {
      return err;
    }
  }
}

module.exports = UserController;
