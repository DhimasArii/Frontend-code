import { useState } from "react";
import useCheckLogin from "./useCheckLogin";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { isLoggedIn, setIsLoggedIn } = useCheckLogin();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, handleLogout };
};

export default useLogout;
