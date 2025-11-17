/*
|--------------------------------------------------------------------------
| Api Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
*/
import Route from '@ioc:Adonis/Core/Route'

//guest routes
Route
  .group(() => {

    Route.post('generate-video-thumb','Api/GeneralController.generateVideoThumb').as('generate-video-thumb');

    Route.post('user/resend/code','Api/UsersController.resendCode').as('user.resent-code').middleware('apiAuth')
    Route.post('user/verify/code','Api/UsersController.verifyCode').as('user.verify-code').middleware('apiAuth')
    Route.post('user/social-login','Api/UsersController.socialLogin').as('user.social-login')
    Route.post('user/change-password','Api/UsersController.changePassword').as('user.change-password').middleware('apiAuth')
    Route.post('user/forgot-password','Api/UsersController.forgotPassword').as('user.forgot-password')
    Route.post('user/login','Api/UsersController.login').as('user.login');
    Route.get('user/verify/:email','Api/UsersController.verifyEmail').as('verifyEmail');
    // Vehicle
    Route.get('user/vehicle', 'Api/VehicleController.userVehicleListing').as('user.vehicle');
    Route.get('user/vehicle/:slug', 'Api/VehicleController.viewUserVehicle').as('view.user.vehicle');
    Route.get('user/related/vehicle/:slug', 'Api/VehicleController.userRelatedVehicle').as('user.related.vehicle');
    // Application Setting
    Route.route('application/setting',['GET','POST'],'Api/ApplicationSettingController.getSetting').as('application.setting');
    //Contact Us
    Route.resource('contact-us', 'Api/ContactUsController').except(['update','destroy']);
    //Subcriber
    Route.resource('subscribe/user', 'Api/UserSubscriberController').except(['update','destroy']);
    // Vehicle Make
    Route.resource('user/user-vehicle-make', 'Api/VehicleMakeController').except(['create','update','destroy']);
    // Vehicle Model
    Route.resource('user/user-vehicle-model', 'Api/VehicleModelController').except(['create','update','destroy']);
    // Vehicle Year
    Route.resource('user/user-vehicle-year', 'Api/VehicleYearController').except(['create','update','destroy']);

    // Vehicle Driver Type
    Route.resource('user/vehicle-driver-type', 'Api/VehicleDriverTypeController').except(['create','update','destroy']);
    // Vehicle Motor Size
    Route.resource('user/vehicle-motor-size', 'Api/VehicleMotorSizeController').except(['create','update','destroy']);
    // Vehicle Transmission Type
    Route.resource('user/vehicle-transmission-type', 'Api/VehicleTransmissionTypeController').except(['create','update','destroy']);
    // Vehicle Fuel Type
    Route.resource('user/vehicle-fuel-type', 'Api/VehicleFuelTypeController').except(['create','update','destroy']);
    // Vehicle Seller Type
    Route.resource('user/vehicle-seller-type', 'Api/VehicleSellerTypeController').except(['create','update','destroy']);
    // Vehicle Statuses
    Route.resource('user/vehicle-statues', 'Api/VehicleStatusController').except(['create','update','destroy']);
    // Vehicle Suspension Type
    Route.resource('user/vehicle-suspension-type', 'Api/VehicleSuspensionTypeController').except(['create','update','destroy']);
    // Vehicle HP Output Range
    Route.resource('user/vehicle-hp-output', 'Api/VehicleHpOutRangeController').except(['create','update','destroy']);
    // Vehicle Uses
    Route.resource('user/vehicle-uses', 'Api/VehicleUsesController').except(['create','update','destroy']);
    // Vehicle Documentation
    Route.resource('user/vehicle-documentation-type', 'Api/VehicleDocumentationController').except(['create','update','destroy']);
    // Blog
    Route.resource('user/blogs', 'Api/BlogController').except(['create','update','destroy']);
    // Named as api.users.index, api.users.store
    Route.resource('user', 'Api/UsersController')
      .except(['destroy'])
      .middleware({
        index: ['apiAuth'],
        show: ['apiAuth'],
        update: ['apiAuth'],
      })
  })
  .prefix('api')
  .as('api')
  .middleware(['apiAuthorization'])

// authentication routes
Route
  .group(() => {

    //User
    Route.get('view/user','Api/UsersController.userDetail').as('user.detail');
    Route.post('user/logout','Api/UsersController.userLogout').as('user.logout');
    
    // Media
    Route.resource('media', 'Api/MediaController').except(['update','destroy'])

    // Vehicle Category
    Route.resource('vehicle-category', 'Api/VehicleCategoryController').except(['create','update','destroy'])

    // Vehicle
    Route.resource('vehicle', 'Api/VehicleController');

    // Vehicle Favourite
    Route.resource('vehicle_favourite', 'Api/VehicleFavouriteController').except(['update','destroy']);

    // Vehicle Make
    Route.resource('vehicle-make', 'Api/VehicleMakeController');

    // Vehicle Model
    Route.resource('vehicle-model', 'Api/VehicleModelController');

    // Vehicle Year
    Route.resource('vehicle-year', 'Api/VehicleYearController');
    
    //Notifications
    Route.post('notification/test-notification','Api/NotificationController.sendTestNotification').as('test-notification');

    // Chat
    Route.get('chat/listing','Api/ChatGroupController.chatListing').as('chat-listing');
    Route.get('chat/unread-messages','Api/ChatController.unreadMessages').as('unread-messages');
    Route.post('chat/user-in-chatRoom','Api/ChatGroupController.userInChatRoom').as('user-in-chatRoom');
    // Route.post('gateway/customer','Api/GatewayController.customer').as('gateway-customer');
    // Route.post('gateway/card','Api/GatewayController.customerCard').as('gateway-card');
    // Route.post('gateway/card/default','Api/GatewayController.makeDefaultCard').as('gateway-default-card');
    // Route.post('gateway/card/delete','Api/GatewayController.deleteGatewayCard').as('gateway-delete-card');
    // Route.post('gateway/charge','Api/GatewayController.gatewayCharge').as('gateway-charge');

  })
  .prefix('api')
  .as('api')
  .middleware(['apiAuthorization','apiAuth'])

