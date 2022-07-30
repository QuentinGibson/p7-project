import React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <section className="bg-indigo-600 {-- h-screen --}">
      <div className="mx-auto flex justify-center lg:items-center h-full">
        <Outlet />
      </div>
    </section>
  );
};
export default AuthLayout;
