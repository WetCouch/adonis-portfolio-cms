'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');

Route.get('login', 'LoginController.showLogin');
Route.get('logout', 'LoginController.logout');
Route.post('login', 'LoginController.login');

Route.get('panel', 'UserController.showPanel').middleware(['customAuth']);

Route.get('users/:id', 'UserController.showUser').middleware(['customAuth']);
Route.post('users/:id/change-password', 'UserController.changePassword').middleware(['customAuth']);
