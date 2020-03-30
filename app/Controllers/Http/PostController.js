'use strict';

const Post = use('App/Models/Post');

class PostController {
  async createPost ({ response, request, auth }) {
    const { title, description, body } = request.all();

    try {
      const post = new Post();
      post.title = title;
      post.description = description;
      post.body = body;
      post.user_id = auth.user.id;
      await post.save();
      response.route('/panel')
    } catch (err) {
      return err;
    }
  }
}

module.exports = PostController;
