import { useEffect, useState } from "react";

const useCheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return { isLoggedIn, setIsLoggedIn };
};

export default useCheckLogin;
