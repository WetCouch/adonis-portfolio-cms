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

class UserSeeder {
  async run () {
    const User = use('App/Models/User');
    // console.log(await User.getCount());
    if (!await User.getCount()) {
      const sampleUser = new User();
      sampleUser.username = 'name';
      sampleUser.email = 'email@email.com';
      sampleUser.password = 'admin';
      await sampleUser.save();
    }
  }
}

module.exports = UserSeeder;
