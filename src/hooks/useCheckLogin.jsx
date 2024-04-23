import { useEffect, useState } from "react";

const useCheckLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
