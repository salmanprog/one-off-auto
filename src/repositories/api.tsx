const api = {
    login: {
      url: 'user/login',
      method: "POST",
    },
    logout: {
      url: 'user/logout',
      method: "POST",
    },
    get_user_detail: {
      url: 'view/user',
      method: "GET",
    },
    get_users: {
      url: 'user',
      method: "GET",
    },
    get_dashboard: {
      url: 'admin/dashboard',
      method: "GET",
    },
    create_users: {
      url: 'user',
      method: "POST",
    },
    update_users: {
      url: 'user',
      method: "PUT",
    },
    users_change_password: {
      url: 'user/change-password',
      method: "POST",
    },
    get_vehicle_categories: {
      url: 'vehicle-category',
      method: "GET",
    },
    create_vehicle: {
      url: 'vehicle',
      method: "POST",
    },
    get_vehicle_list: {
      url: 'vehicle',
      method: "GET",
    },
    get_vehicle_make_list: {
      url: 'user/user-vehicle-make',
      method: "GET",
    },
    get_vehicle_model_list: {
      url: 'user/user-vehicle-model',
      method: "GET",
    },
    get_vehicle_year_list: {
      url: 'user/user-vehicle-year',
      method: "GET",
    },
    user_vehicle_list: {
      url: 'user/vehicle',
      method: "GET",
    },
    get_vehicle_details: {
      url: 'vehicle/{id}',
      method: "GET",
    },
    get_vehicle_make: {
      url: 'vehicle-make',
      method: "GET",
    },
    update_vehicle: {
      url: 'vehicle',
      method: "PUT",
    },
    delete_vehicle: {
      url: 'vehicle',
      method: "DELETE",
    },
    get_related_vehicle: {
      url: 'user/related/vehicle',
      method: "GET",
    },
    chat_unread_messages: {
      url: 'chat/unread-messages',
      method: "GET",
    },
    user_in_chatroom: {
      url: 'chat/user-in-chatRoom',
      method: "POST",
    },
    upload_media: {
      url: 'media',
      method: "POST",
    },
    chat_listing: {
      url: 'chat/listing',
      method: "GET",
    },
    user_subscribe: {
      url: 'subscribe/user',
      method: "POST",
    },
    user_subscribe_list: {
      url: 'subscribe/user',
      method: "GET",
    },
    contact_us: {
      url: 'contact-us',
      method: "POST",
    },
    contact_us_list: {
      url: 'contact-us',
      method: "GET",
    },
    forgot_password: {
      url: 'user/forgot-password',
      method: "POST",
    },
    get_application_setting: {
      url: 'application/setting',
      method: "GET",
    },
    update_application_setting: {
      url: 'application/setting',
      method: "POST",
    },
    verify_user: {
      url: 'user/verify',
      method: "GET",
    },
    vehicle_driver_type: {
      url: 'user/vehicle-driver-type',
      method: "GET",
    },
    vehicle_motor_size: {
      url: 'user/vehicle-motor-size',
      method: "GET",
    },
    vehicle_transmission_type: {
      url: 'user/vehicle-transmission-type',
      method: "GET",
    },
    vehicle_fuel_type: {
      url: 'user/vehicle-fuel-type',
      method: "GET",
    },
    vehicle_seller_type: {
      url: 'user/vehicle-seller-type',
      method: "GET",
    },
    vehicle_statues: {
      url: 'user/vehicle-statues',
      method: "GET",
    },
    vehicle_suspension_type: {
      url: 'user/vehicle-suspension-type',
      method: "GET",
    },
    vehicle_hp_output: {
      url: 'user/vehicle-hp-output',
      method: "GET",
    },
    vehicle_uses: {
      url: 'user/vehicle-uses',
      method: "GET",
    },
    vehicle_documentation_type: {
      url: 'user/vehicle-documentation-type',
      method: "GET",
    },
    vehicle_favourite: {
      url: 'vehicle_favourite',
      method: "GET",
    },
    blog_categories: {
      url: 'admin/blog-category',
      method: "GET",
    },
    blog_category_add: {
      url: 'admin/blog-category',
      method: "POST",
    },
    blog_category_update: {
      url: 'admin/blog-category',
      method: "PUT",
    },
    blog_category_delete: {
      url: 'admin/blog-category',
      method: "DELETE",
    },
    blog: {
      url: 'admin/blog',
      method: "GET",
    },
    blog_add: {
      url: 'admin/blog',
      method: "POST",
    },
    blog_update: {
      url: 'admin/blog',
      method: "PUT",
    },
    blog_delete: {
      url: 'admin/blog',
      method: "DELETE",
    },
    blog_list: {
      url: 'user/blogs',
      method: "GET",
    },
  };
  
  export default api;