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
  };
  
  
  export default api;