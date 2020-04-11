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

  async showPost ({ params, view }) {
    try {
      const post = (await Post.find(params.id)).toJSON();
      return view.render('admin.editPost', {post: post});
    } catch (err) {
      return err;
    }
  }

  async editPost ({ params, response, request }) {
    const { title, description, body } = request.all();

    try {
      const post = await Post.find(params.id);
      post.title = title;
      post.description = description;
      post.body = body;
      await post.save();

      response.route('/panel')
    } catch (err) {
      return err;
    }
  }

  async index ({ view }) {
    try {
      const posts = (await Post.all()).toJSON();

      return view.render('site.pages.blog', { posts: posts })
    } catch (err) {
      return err;
    }
  }
}

module.exports = PostController;
