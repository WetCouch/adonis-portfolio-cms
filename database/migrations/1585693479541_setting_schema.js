'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SettingSchema extends Schema {
  up () {
    this.create('settings', (table) => {
      table.increments();
      table.string('key');
      table.string('value');
      table.timestamps();
    })
  }

  down () {
    this.drop('settings')
  }
}

module.exports = SettingSchema;
