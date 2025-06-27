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
  };
  
  export default api;