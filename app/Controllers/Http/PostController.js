'use strict';

const Post = use('App/Models/Post');
const Drive = use('Drive');

class PostController {

  async post ({ params, response, request, auth }) {
    try {
      const fileUploadOpts = {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      };

      let post;
      const body = {};

      if (params.id >= 0) post = await Post.find(params.id);
      else post = new Post();

      await request.multipart.field((name, value) => {
        body[name] = value;
      });

      await request.multipart.file('main_img', fileUploadOpts, async file => {
        if (file) {

          if (post.main_img) await Drive.disk('s3').delete(post.main_img);

          await Drive.disk('s3').put(file.clientName, file.stream, {
            ContentType: file.headers['content-type'],
            ACL: 'public-read'
          });

          post.main_img = file.clientName;
        }
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

  async edit ({ params, view }) {
    try {
      const post = (await Post.find(params.id)).toJSON();
      return view.render('admin.pages.post', {post: post});
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

  async view ({ params, view }) {
    try {
      const post = (await Post.find(params.id)).toJSON();
      return view.render('site.pages.post', {post: post});
    } catch (err) {
      return err;
    }
  }
}

module.exports = PostController;
