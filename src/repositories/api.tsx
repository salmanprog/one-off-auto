const api = {
    login: {
      url: 'user/login',
      method: "POST",
    },
    logout: {
      url: 'user/logout',
      method: "POST",
    },
    get_dashboard: {
      url: 'user/dashboard',
      method: "GET",
    },
    create_users: {
      url: 'user',
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
    get_vehicle_details: {
      url: 'vehicle/{id}',
      method: "GET",
    },
    update_vehicle: {
      url: 'vehicle/{id}',
      method: "PUT",
    },
    delete_vehicle: {
      url: 'vehicle/{id}',
      method: "DELETE",
    },
  };
  
  export default api;