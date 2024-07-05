//generate login page

import React  from "react";
import {  Outlet,  } from "react-router-dom";
import * as Yup from "yup";

const AuthLayout: React.FC = () => {
  

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex justify-center items-center flex-col rounded-md bg-gray-800 shadow-md w-[90%] lg:w-[50%] py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
