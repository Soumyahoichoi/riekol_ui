import { Button } from "@nextui-org/react";
import React from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
