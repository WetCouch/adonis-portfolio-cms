'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectLinkSchema extends Schema {
  up () {
    this.table('projects', table => {
      table.string('project_url');
    })
  }

  down () {
    this.table('project_links', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProjectLinkSchema;
