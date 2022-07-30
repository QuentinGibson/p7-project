import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import AuthContext from "../../hooks/AuthContext";
function MasterLayout() {
  const [show, setShow] = useState(false);
  const { user_id, signout } = useContext(AuthContext);
  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [show]);
  return (
    <div>
      {/* Mobile */}
      <div
        className={
          show
            ? "w-full h-full absolute z-40  transform  translate-x-0 "
            : "   w-full h-full absolute z-40  transform -translate-x-full"
        }
      >
        <div
          className="bg-gray-800 opacity-50 inset-0 fixed w-full h-full"
          onClick={() => setShow(!show)}
        />
        <div className="w-64 absolute left-0 z-40 top-0 bg-gray-800 shadow flex-col justify-between transition duration-150 ease-in-out h-full">
          <div className="flex flex-col justify-between h-full">
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    aria-label="Home"
                    id="logo"
                    enableBackground="new 0 0 300 300"
                    height={43}
                    viewBox="0 0 300 300"
                    width={43}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        fill="#4c51bf"
                        d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                      />
                    </g>
                  </svg>
                  <p className="text-bold md:text2xl text-base pl-3 text-gray-800">
                    GroupMe
                  </p>
                </div>
                <div
                  id="cross"
                  className="  text-white"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>
              <ul className="f-m-m">
                <Link to="/">
                  <li className="text-white pt-8">
                    <div className="flex items-center">
                      <div className="md:w-6 md:h-6 w-5 h-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-home"
                          viewBox="0 0 20 20"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="5 12 3 12 12 3 21 12 19 12" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </div>
                      <p className="text-white ml-3 text-lg">Home</p>
                    </div>
                  </li>
                </Link>

                {user_id !== -1 ? (
                  <>
                    <Link to="/user">
                      <li className="text-white pt-8">
                        <div className="flex items-center">
                          <div className="md:w-6 md:h-6 w-5 h-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-user-circle"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="12" cy="12" r="9" />
                              <circle cx="12" cy="10" r="3" />
                              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                            </svg>
                          </div>
                          <p className="text-white ml-3 text-lg">User</p>
                        </div>
                      </li>
                    </Link>
                    <Link onClick={signout} to="/">
                      <li className="text-white pt-8">
                        <div className="flex items-center">
                          <div className="md:w-6 md:h-6 w-5 h-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-logout"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                              <path d="M7 12h14l-3 -3m0 6l3 -3" />
                            </svg>
                          </div>
                          <p className="text-white ml-3 text-lg">Logout</p>
                        </div>
                      </li>
                    </Link>
                  </>
                ) : (
                  <Link to="/auth/login">
                    <li className="text-white pt-8">
                      <div className="flex items-center">
                        <div className="md:w-6 md:h-6 w-5 h-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-user-circle"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="9" />
                            <circle cx="12" cy="10" r="3" />
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                          </svg>
                        </div>
                        <p className="text-white ml-3 text-lg">Sign In</p>
                      </div>
                    </li>
                  </Link>
                )}
                <a></a>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div>
        {/* Navigation starts */}
        <nav className="w-full bg-gray-800 shadow">
          <div className="container px-6 h-16 flex justify-between items-center xl:items-stretch mx-auto">
            <div className="flex items-center w-full">
              <div className="xl:mr-10 flex items-center">
                <a href="/">
                  <svg
                    aria-label="Home"
                    id="logo"
                    enableBackground="new 0 0 300 300"
                    height={44}
                    viewBox="0 0 300 300"
                    width={43}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g>
                      <path
                        fill="#667eea"
                        d="m234.735 35.532c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zm0 24c-4.412 0-8-3.588-8-8s3.588-8 8-8 8 3.588 8 8-3.588 8-8 8zm-62.529-14c0-2.502 2.028-4.53 4.53-4.53s4.53 2.028 4.53 4.53c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.027-4.53-4.529zm89.059 60c0 2.501-2.028 4.529-4.53 4.529s-4.53-2.028-4.53-4.529c0-2.502 2.028-4.53 4.53-4.53s4.53 2.029 4.53 4.53zm-40.522-5.459-88-51.064c-1.242-.723-2.773-.723-4.016 0l-88 51.064c-1.232.715-1.992 2.033-1.992 3.459v104c0 1.404.736 2.705 1.938 3.428l88 52.936c.635.381 1.35.572 2.062.572s1.428-.191 2.062-.572l88-52.936c1.201-.723 1.938-2.023 1.938-3.428v-104c0-1.426-.76-2.744-1.992-3.459zm-90.008-42.98 80.085 46.47-52.95 31.289-23.135-13.607v-21.713c0-2.209-1.791-4-4-4s-4 1.791-4 4v21.713l-26.027 15.309c-1.223.719-1.973 2.029-1.973 3.447v29.795l-52 30.727v-94.688zm0 198.707-80.189-48.237 51.467-30.412 24.723 14.539v19.842c0 2.209 1.791 4 4 4s4-1.791 4-4v-19.842l26.027-15.307c1.223-.719 1.973-2.029 1.973-3.447v-31.667l52-30.728v94.729z"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href="/"
                  className="text-base text-white font-bold tracking-normal leading-tight ml-3 hidden xl:block"
                >
                  GroupMe
                </a>
              </div>
              <div className="hidden xl:flex w-full">
                <ul className="flex items-center h-full w-full justify-between">
                  <div className="flex">
                    <li className="cursor-pointer h-full flex items-center text-sm text-white tracking-normal">
                      <Link to="/" className="flex items-center">
                        <span className="mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-home"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="5 12 3 12 12 3 21 12 19 12" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                          </svg>
                        </span>
                        Home
                      </Link>
                    </li>
                  </div>
                  <div>
                    {user_id !== -1 ? (
                      <div className="flex">
                        <li className="cursor-pointer h-full flex items-center text-sm text-white mx-3 tracking-normal">
                          <Link className="flex items-center" to="/user">
                            <span className="mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-user-circle"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="10" r="3" />
                                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                              </svg>
                            </span>
                            User
                          </Link>
                        </li>
                        <li className="cursor-pointer h-full flex items-center text-sm text-white mx-3 tracking-normal">
                          <Link
                            className="flex items-center"
                            onClick={signout}
                            to="/"
                          >
                            <span className="mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-logout"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 12h14l-3 -3m0 6l3 -3" />
                              </svg>
                            </span>
                            Logout
                          </Link>
                        </li>
                      </div>
                    ) : (
                      <li className="cursor-pointer h-full flex items-center text-sm text-white mx-3 tracking-normal">
                        <Link className="flex items-center" to="/auth/login">
                          <span className="mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-user-circle"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="12" cy="12" r="9" />
                              <circle cx="12" cy="10" r="3" />
                              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                            </svg>
                          </span>
                          Sign In
                        </Link>
                      </li>
                    )}
                  </div>
                </ul>
              </div>
            </div>
            <div className="visible xl:hidden flex items-center relative">
              <div
                className="xl:hidden"
                onClick={() => {
                  window.scrollTo(0, 0);
                  setShow(!show);
                }}
              >
                <svg
                  aria-label="Main Menu"
                  aria-haspopup="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-menu"
                  width={32}
                  height={32}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#fff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1={4} y1={8} x2={20} y2={8} />
                  <line x1={4} y1={16} x2={20} y2={16} />
                </svg>
              </div>
            </div>
          </div>
        </nav>
        <div className="w-full h-full py-12 bg-gray-200">
          <div className="container mx-auto px-6">
            <div className="flex min-h-screen w-full h-full justify-center flex-wrap rounded border-gray-300">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
