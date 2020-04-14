'use strict';

const Post = use('App/Models/Post');
const Drive = use('Drive');

class PostController {
  async create ({ response, request, auth }) {

    try {
      const fileUploadOpts = {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      };

      const post = new Post();
      const body = {};

      await request.multipart.field((name, value) => {
        body[name] = value;
      });

      request.multipart.file('main_img', fileUploadOpts, async (file) => {
        await Drive.disk('s3').put(file.clientName, file.stream, {
          ContentType: file.headers['content-type'],
          ACL: 'public-read'
        });

        post.main_img = Drive.disk('s3').getUrl(file.clientName);
      });

      await request.multipart.process();

      post.title = body.title;
      post.description = body.description;
      post.body = body.body;
      post.user_id = auth.user.id;
      await post.save();

      response.route('/panel')

    } catch (err) {
      console.log(err);
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
