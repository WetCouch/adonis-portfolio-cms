'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostImgSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.string('main_img');
    })
  }

  down () {
    this.table('post_imgs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PostImgSchema;
