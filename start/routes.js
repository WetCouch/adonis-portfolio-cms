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

//Client-side
Route.on('/').render('site.pages.home');
Route.get('/blog', 'PostController.index');
Route.get('/blog/:id', 'PostController.view');
Route.get('/portfolio', 'ProjectController.index');



//Login
Route.get('login', 'LoginController.showLogin');
Route.post('login', 'LoginController.login');
Route.group(() => {
  Route.on('/signup').render('admin.createUser');
  Route.post('/signup', 'LoginController.signup');
}).middleware(['signupPermission']);
Route.get('logout', 'LoginController.logout');



//Administration panel
Route.group(() => {
  Route.get('panel', 'PanelController.show');
  Route.get('/panel/signupPermission', 'PanelController.changeSignupPermission');
  Route.on('/panel/createUser').render('admin.createUser');
  Route.post('/panel/createUser', 'LoginController.signup');

  Route.get('/panel/users/:id', 'UserController.showUser');
  Route.post('/panel/users/:id/change-password', 'UserController.changePassword');
  Route.get('/panel/users/:id/delete-user', 'UserController.deleteUser');

  Route.on('/panel/posts/create').render('admin.pages.post');
  Route.post('/panel/posts/create', 'PostController.post');
  Route.get('/panel/posts/:id', 'PostController.edit');
  Route.post('/panel/posts/:id/edit', 'PostController.post');

  Route.on('/panel/createProject').render('admin.createProject');
  Route.post('/panel/createProject', 'ProjectController.create');
  Route.get('/panel/projects/:id', 'ProjectController.view');
}).middleware(['customAuth']);
