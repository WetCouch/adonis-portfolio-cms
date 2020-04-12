'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments();
      table.string('title');
      table.text('description', 'longtext');
      table.enu('categoty', ['ux', 'dev', 'fullstack', 'photo', 'graphic']);
      table.timestamps();
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema;
