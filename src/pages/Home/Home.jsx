import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    toast.success("Logged In :)");
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>Home</div>;
};

export default Home;
