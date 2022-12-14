import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";

export default function LogIn() {
  const { login } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    login(email, password);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-12 px-2 sm:px-0"
      >
        <div className="pt-16 px-2 flex flex-col items-center justify-center">
          <h3 className="text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight">
            Login To Your Account
          </h3>
        </div>
        <div className="mt-12 w-full px-2 sm:px-6">
          <div className="flex flex-col mt-5">
            <label
              htmlFor="email"
              className="text-lg font-semibold leading-tight"
            >
              Email
            </label>
            <input
              required
              ref={emailRef}
              id="email"
              name="email"
              className="h-10 px-2 w-full text-white bg-indigo-700 rounded mt-2 focus:outline-none shadow"
              type="email"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label
              htmlFor="password"
              className="text-lg font-semibold fleading-tight"
            >
              Password
            </label>
            <input
              required
              ref={passwordRef}
              id="password"
              name="password"
              className="h-10 px-2 w-full text-white bg-indigo-700 rounded mt-2 focus:outline-none shadow"
              type="password"
            />
          </div>
        </div>
        <div className="px-2 sm:px-6">
          <button className="focus:outline-none w-full bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded text-indigo-600 px-8 py-3 text-sm mt-6">
            Login
          </button>
          <p className="mt-16 text-xs text-center">
            Don???t Have An Account?{" "}
            <Link className="underline" to="/auth/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
