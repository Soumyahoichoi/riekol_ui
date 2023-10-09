import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import "./styles.css";
import NavBar from "../components/Navbar/Navbar";
import { Divider } from "@nextui-org/react";

const Layout = () => {
  // const isLoggedIn = localStorage.getItem('isLoggedIn');

  // if (!isLoggedIn) {
  // 	return <Navigate to="/login" />;
  // }
  return (
    <main className="layout">
      {/* <NavBar /> */}
      <Divider />
      <div className="outletContainer">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
