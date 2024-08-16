import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Navigate, Outlet, Link } from "react-router-dom";
import Header from "../Header/Header";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { logout } from "../../features/auth/authSlice";

const Layout: React.FC = () => {
  

  return (
    <div>
      <Header />
      <Breadcrumbs />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
