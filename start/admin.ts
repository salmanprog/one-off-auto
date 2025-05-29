/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.group( () => {
  Route.post('login', 'Api/Admin/AuthController.login').as('login');
  Route.put('crew_create_link', 'Api/UsersController.userVerifyLink').as('user.verify.link');
  Route.get('crew_get_link/:slug', 'Api/UsersController.getUserByLink').as('user.by.link');
  Route.resource('application-content', 'Api/Admin/ContentController')
      .middleware({
        index: ['apiAuth'],
  })
}).prefix('api/admin').middleware(['apiAuthorization'])


// authentication routes
Route
.group(() => {

  Route.resource('user', 'Api/Admin/AuthController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('users', 'Api/Admin/UsersController')
      .middleware({
        index: ['apiAuth'],
        update: ['apiAuth'],
  })
  Route.resource('contractor', 'Api/Admin/UsersController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('customer', 'Api/Admin/UsersController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('manager', 'Api/Admin/UsersController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('crew', 'Api/Admin/UsersController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('user_profiles', 'Api/Admin/UsersProfileController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('job', 'Api/Admin/JobController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('jobassignee', 'Api/Admin/JobAssigneeController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('services', 'Api/Admin/ServicesController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('product_category', 'Api/Admin/ProductCategoryController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('product', 'Api/Admin/ProductController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('orderproduct', 'Api/Admin/OrderProductsController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('order', 'Api/Admin/OrderController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('feedback_question', 'Api/Admin/FeedbackQuestionController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('user_feedbacks', 'Api/Admin/FeedbackUserController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.resource('building_types', 'Api/Admin/BuildingTypeController')
      .middleware({
        index: ['apiAuth'],
  })
  Route.get('dashboard','Api/Admin/UsersController.userDashboard').as('dashboard').middleware('apiAuth')
  Route.get('user-hierarchy','Api/Admin/UsersController.getChildUser').as('user-hierarchy').middleware('apiAuth')
  Route.get('assign/job','Api/Admin/JobAssigneeController.getCrewJob').as('crew.job').middleware('apiAuth')
  Route.get('assign/viewjob/:slug','Api/Admin/JobAssigneeController.getCrewJobBySlug').as('crew.viewjob').middleware('apiAuth')
  Route.get('status/job','Api/Admin/JobController.getTotalJobStatus').as('status.job').middleware('apiAuth')
  Route.post('assign/job','Api/Admin/JobAssigneeController.crewAssigne').as('assign.job').middleware('apiAuth')
  Route.post('user/change-password','Api/UsersController.changePassword').as('user.change-password').middleware('apiAuth')
  Route.post('logout','Api/Admin/AuthController.userLogout').as('logout');
  //User Generate Link
  Route.post('generate/link','Api/UsersController.userGeneratedLink').as('generated.link');
  Route.get('crew/link/list','Api/UsersController.getUserListLink').as('user.list.link');
  //Menu
  Route.route('application/setting',['GET','POST'],'Api/Admin/ApplicationSettingController.getSetting').as('application.setting');
  
})
.prefix('api/admin')
.as('api/admin')
.middleware(['apiAuthorization','apiAuth'])

Route.on('/admin/:module?/:action?/:slug?').render('admin.index');