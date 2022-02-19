import React from "react";

function Login() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-dense-blue px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center ">
          Login to your account
        </h3>
        <form className="w-64 mt-6">
          <div>
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="username@company.domain"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-baseline justify-between mt-6">
            <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Login
            </button>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
