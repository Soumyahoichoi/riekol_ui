import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
