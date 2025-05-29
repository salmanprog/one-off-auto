import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useFetch } from "../hooks/request";
import { useNavigate } from 'react-router';
import Helper from "../helpers";

const SignIn = () => {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const { loading, postData } = useFetch("login", "submit");
  let navigate = useNavigate();
  const onSubmit = (values) => {
    const additionalParams = { device_type: "web", device_token: "1234567890" };
    const updatedValues = { ...values, ...additionalParams };
    const callback = (receivedData) => {
      Helper.setStorageData("session", receivedData.data);
      return navigate("/");
    };
    postData(updatedValues, callback);
  };

  return (
    <div className="flex h-screen items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Enter a valid email address'
                  }
                })}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register('password', {
                  required: 'Password is required'
                })}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-oneoffautos-blue focus:ring-oneoffautos-blue border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="#" className="font-medium text-oneoffautos-blue hover:text-oneoffautos-blue-darker">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-oneoffautos-blue hover:bg-oneoffautos-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oneoffautos-blue"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-oneoffautos-blue hover:text-oneoffautos-blue-darker">
            Sign up for a new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
