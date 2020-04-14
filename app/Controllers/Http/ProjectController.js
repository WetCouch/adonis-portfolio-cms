'use strict';

const Project = use('App/Models/Project');
const Drive = use('Drive');

class ProjectController {
  async create ({ response, request }) {

    try {
      const fileUploadOpts = {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      };

      const project = new Project();
      const body = {};

      await request.multipart.field((name, value) => {
        body[name] = value;
      });

      request.multipart.file('preview', fileUploadOpts, async (file) => {
        await Drive.disk('s3').put(file.clientName, file.stream, {
          ContentType: file.headers['content-type'],
          ACL: 'public-read'
        });

        project.preview = Drive.disk('s3').getUrl(file.clientName);
      });

      await request.multipart.process();

      project.title = body.title;
      project.description = body.description;
      project.category = body.category;
      await project.save();
      response.route('/panel')

    } catch (err) {
      return err;
    }
  }

  async view ({ params, view }) {
    try {
      const project = (await Project.find(params.id)).toJSON();
      return view.render('admin.editProject', {project: project});
    } catch (err) {
      return err;
    }
  }

  async edit ({ params, response, request }) {
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
      const projects = (await Project.all()).toJSON();

      return view.render('site.pages.portfolio', { projects: projects })
    } catch (err) {
      return err;
    }
  }
}

module.exports = ProjectController;
