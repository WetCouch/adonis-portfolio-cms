'use strict';

const Project = use('App/Models/Project');
const Drive = use('Drive');

class ProjectController {
  async create ({ response, request }) {
    const { title, description, category } = request.all();

    try {
      // const preview = request.file('preview', {
      //   types: ['image'],
      //   size: '2mb',
      //   extnames: ['png', 'jpg', 'jpeg']
      // });

      const fileUploadOpts = {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      };

      const project = new Project();

      request.multipart.file('preview', fileUploadOpts, async (file) => {
        await Drive.disk('s3').put(file.clientName, file.stream, {
          ContentType: file.headers['content-type'],
          ACL: 'public-read'
        });

        project.preview = file.clientName;
        console.log(project.preview);
      });

      await request.multipart.process();

      project.title = title;
      project.description = description;
      project.category = category;
      await project.save();
      response.route('/panel')
    } catch (err) {
      return err;
    }
  }

  async showPost ({ params, view }) {
    try {
      const project = (await Project.find(params.id)).toJSON();
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

module.exports = ProjectController;
