export const register = {
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
      message: "Email is not valid",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      message: "Password must include at least one number and one special character",
    },
  },
};
