'use strict';

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
Route.post('login', 'LoginController.login');

Route.group(() => {
  Route.on('/signup').render('admin.createUser');
  Route.post('/signup', 'LoginController.signup');
}).middleware(['signupPermission']);

Route.get('logout', 'LoginController.logout');

Route.group(() => {
  Route.get('panel', 'PanelController.showPanel');
  Route.get('/panel/signupPermission', 'PanelController.changeSignupPermission');
  Route.on('/panel/createUser').render('admin.createUser');
  Route.post('/panel/createUser', 'LoginController.signup');

  Route.get('/panel/users/:id', 'UserController.showUser');
  Route.post('/panel/users/:id/change-password', 'UserController.changePassword');
  Route.get('/panel/users/:id/delete-user', 'UserController.deleteUser');

  Route.on('/panel/createPost').render('admin.createPost');
  Route.post('/panel/createPost', 'PostController.createPost');
  Route.get('/panel/posts/:id', 'PostController.showPost');
  Route.post('/panel/posts/:id/edit', 'PostController.editPost');
}).middleware(['customAuth']);
