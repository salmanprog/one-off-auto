import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "../components/layouts/MainLayout";
import { useFetch } from "../hooks/request";

const ForgotPassword = () => {
  const { loading, postData } = useFetch("forgot_password", "submit");
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // Prevent default form submission
    const fd = new FormData();
    fd.append("email", email); // Append email to form data

    const callback = (receivedData) => {
      console.log(receivedData); // Handle response
    };

    postData(fd, callback); // Post data
  };

  return (
    <MainLayout>
      <div className="flex h-screen items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Forgot your password?
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handle input change
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-oneoffautos-blue focus:border-oneoffautos-blue focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-oneoffautos-blue hover:bg-oneoffautos-blue-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oneoffautos-blue"
              >
                {loading ? "Sending..." : "Send reset password"}
              </button>
            </div>
          </form>
          <div className="text-center text-sm text-gray-600">
            <Link to="/signin" className="font-medium text-oneoffautos-blue hover:text-oneoffautos-blue-darker">
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
