'use strict';

const User = use('App/Models/User');
const Post = use('App/Models/Post');


class PanelController {
  async showPanel ({ view, auth }) {
    try {
      const users = (await User.all()).toJSON();
      const posts = (await Post.all()).toJSON();

      return view.render('admin.panel', {users: users, posts: posts});
    } catch (err) {
      return err;
    }
  }
}

module.exports = PanelController;
