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
Route.get('login', 'LoginController.view');
Route.post('login', 'LoginController.login');
Route.group(() => {
  Route.on('/signup').render('admin.pages.user');
  Route.post('/signup', 'UserController.post');
}).middleware(['signupPermission']);
Route.get('logout', 'LoginController.logout');



//Administration panel
Route.group(() => {
  Route.get('panel', 'PanelController.view');
  Route.get('/panel/signupPermission', 'PanelController.changeSignupPermission');

  Route.on('/panel/users/create').render('admin.pages.user');
  Route.post('/panel/users/create', 'UserController.post');
  Route.get('/panel/users/:id', 'UserController.edit');
  Route.post('/panel/users/:id', 'UserController.post');
  Route.get('/panel/users/:id/delete', 'UserController.delete');

  Route.on('/panel/posts/create').render('admin.pages.post');
  Route.post('/panel/posts/create', 'PostController.post');
  Route.get('/panel/posts/:id', 'PostController.edit');
  Route.post('/panel/posts/:id/edit', 'PostController.post');

  Route.on('/panel/projects/create').render('admin.pages.project');
  Route.post('/panel/projects/create', 'ProjectController.post');
  Route.get('/panel/projects/:id', 'ProjectController.view');
  Route.post('/panel/projects/:id/edit', 'ProjectController.post');
}).middleware(['customAuth']);
