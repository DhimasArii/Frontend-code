import "./App.css";
import React, { useState } from "react";
import Login from "./pages/login/login";
import Forgot from "./pages/reset-password/reset";
import Reset from "./pages/CreatePassword/reset";
import EmailConfirmation from "./pages/EmailConfirmation";
import Landing from "./pages/landing-page/landing";
import Kelas from "./pages/menu-kelas/menu-kelas";
import DetailKelas from "./pages/detail-kelas/detail-kelas";
import Regis from "./pages/register-new/register";
import Checkout from "./pages/Checkout/checkout";

import { Routes, Route, ScrollRestoration } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route
        path="/new-password"
        element={<Reset setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/email-confirmation" element={<EmailConfirmation />} />
      <Route
        path="/menu-kelas/:id"
        element={
          <Kelas isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/detail-kelas/:id"
        element={
          <DetailKelas isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/register-new"
        element={<Regis setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/checkout/user/:id"
        element={
          <Checkout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
    </Routes>
  );
}

export default App;
