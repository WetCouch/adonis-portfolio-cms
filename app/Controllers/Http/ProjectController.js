'use strict';

const Project = use('App/Models/Project');
const Drive = use('Drive');

class ProjectController {

  async post ({ params, response, request }) {
    try {
      const fileUploadOpts = {
        types: ['image'],
        size: '2mb',
        extnames: ['png', 'jpg', 'jpeg']
      };

      let project;
      const body = {};

      if (params.id >= 0) project = await Project.find(params.id);
      else project = new Project();

      await request.multipart.field((name, value) => {
        body[name] = value;
      });

      await request.multipart.file('preview', fileUploadOpts, async file => {
        if (file) {

          if (project.preview) await Drive.disk('s3').delete(project.preview);

          await Drive.disk('s3').put(file.clientName, file.stream, {
            ContentType: file.headers['content-type'],
            ACL: 'public-read'
          });

          project.preview = file.clientName;
        }
      });

      await request.multipart.process();

      project.title = body.title;
      project.project_url = body.project_url;
      project.description = body.description;
      project.category = body.category;

      await project.save();

      response.route('/panel/projects/' + project.id)

    } catch (err) {
      console.log(err);
    }
  }

  async view ({ params, view }) {
    try {
      const project = (await Project.find(params.id)).toJSON();
      return view.render('admin.pages.project', {project: project});
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
