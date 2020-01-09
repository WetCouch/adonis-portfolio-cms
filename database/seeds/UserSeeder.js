'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Hash = use('Hash');

class UserSeeder {
  async run () {
    const User = use('App/Models/User');

    if (!await User.getCount()) {
      const sampleUser = new User();
      sampleUser.username = 'name';
      sampleUser.email = 'email@email.com';
      sampleUser.password = await Hash.make('admin');
      await sampleUser.save();
    }
  }
}

module.exports = UserSeeder
