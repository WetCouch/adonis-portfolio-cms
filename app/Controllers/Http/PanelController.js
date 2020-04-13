'use strict';

const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Setting = use('App/Models/Setting');
const Project = use('App/Models/Project');


class PanelController {
  async showPanel ({ view }) {
    try {
      const users = (await User.all()).toJSON();
      const posts = (await Post.all()).toJSON();
      const projects = (await Project.all()).toJSON();
      let signupPermissionText;

      const allowSignup = (await Setting.findOrCreate(
        { key: 'allow_signup' },
        { key: 'allow_signup', value: 'true' }
      )).toJSON();

      if (allowSignup.value === 'true') signupPermissionText = 'Disallow Sign Up';
      else signupPermissionText = 'Allow Sign Up';

      return view.render('admin.panel', {users: users, posts: posts, projects: projects, signupPermission: signupPermissionText});
    } catch (err) {
      return err;
    }
  }

  async changeSignupPermission ({ response }) {
    const allowSignup = await Setting.findBy('key', 'allow_signup');
    if (allowSignup.value === 'true') allowSignup.value = 'false';
    else allowSignup.value = 'true';

    try {
      await allowSignup.save();
      response.route('/panel');
    } catch (err) {
      return err;
    }

  }
}

module.exports = PanelController;
