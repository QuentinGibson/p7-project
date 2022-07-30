import React, { useContext } from "react";
import AuthContext from "../../hooks/AuthContext";
import "react-confirm-alert/src/react-confirm-alert.css";
function User(props) {
  const { del } = useContext(AuthContext);
  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow rounded xl:flex lg:flex w-full">
        <div className="xl:w-full lg:w-full bg-gray-100 dark:bg-gray-800 py-8 border-gray-300 dark:border-gray-200 xl:border-r rounded-tl xl:rounded-bl rounded-tr xl:rounded-tr-none lg:border-r-2 border-b xl:border-b-0 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="mb-6 text-lg text-gray-800 dark:text-gray-100">
              {props.email}
            </p>
            <button
              onClick={del}
              className="bg-red-500 font-medium transition duration-150 ease-in-out hover:bg-red-700 rounded text-gray-800 px-6 py-2 text-sm border border-gray-300 dark:border-red-600 focus:outline-none"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
