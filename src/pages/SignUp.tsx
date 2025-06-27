import React from 'react';
import { Link } from 'react-router-dom';
import { register as validationRules } from "../config/form_validation_rules";
import { useFetch } from "../hooks/request";
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form'
import MainLayout from "../components/layouts/MainLayout";

const SignUp = () => {
  
  const {register,handleSubmit,formState: { errors }, watch,} = useForm();
  const { loading, postData } = useFetch("create_users", "submit", undefined);
  const password = watch("password", "");
  const navigate = useNavigate();
  const fd = new FormData();
  const onFinish = (values) => {
    for (const key in values) {
      fd.append(key, values[key]);
    }
    fd.append('user_group_id', '3');
    fd.append('device_type', 'android');
    fd.append('device_id', '1234567890');
    fd.append('device_token', '1234567890');
    const callback = (receivedData) => {
      return navigate("/signin");
    };
    postData(fd, callback, undefined);
  };
  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create a new account
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit(onFinish)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  {...register('name', validationRules.name)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
                {typeof errors.name?.message === 'string' && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', validationRules.email)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {typeof errors.email?.message === 'string' && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  {...register('password', validationRules.password)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {typeof errors.password?.message === 'string' && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div>
                <label htmlFor="confirm_password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  {...register("confirm_password", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                {typeof errors.confirm_password?.message === 'string' && (
  <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
)}
              </div>  
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-oneoffautos-blue hover:bg-oneoffautos-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oneoffautos-blue"
              >
                Sign up
              </button>
            </div>
          </form>
           <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-oneoffautos-blue hover:text-oneoffautos-blue-darker">
                Sign in
              </Link>
            </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUp; 