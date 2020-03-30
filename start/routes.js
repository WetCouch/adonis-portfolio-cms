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

Route.get('panel', 'PanelController.showPanel').middleware(['customAuth']);

Route.get('panel/users/:id', 'UserController.showUser').middleware(['customAuth']);
Route.post('panel/users/:id/change-password', 'UserController.changePassword').middleware(['customAuth']);

Route.on('/panel/createPost').render('admin.createPost').middleware(['customAuth']);
Route.post('/panel/createPost', 'PostController.createPost').middleware(['customAuth']);
