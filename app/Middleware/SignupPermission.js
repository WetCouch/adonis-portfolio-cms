'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Setting = use('App/Models/Setting');

class SignupPermission {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response }, next) {
    try {
      const allowSignup = await Setting.findBy('key', 'allow_signup');
      if (allowSignup.value === 'false') response.route('/login');
    } catch(err) {
      return err;
    }
    await next();
  }
}

module.exports = SignupPermission;
