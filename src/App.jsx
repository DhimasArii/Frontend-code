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
import Invoice from "./pages/invoice/invoice";
import DetailInvoice from "./pages/detail-invoice/detailInvoice";
import PurchaseSuccess from "./pages/PurchaseSuccess/index";
import MyClass from "./pages/my-class/my-class";

//admin
import User from "./pages/Admin/pages/User/User";
import Category from "./pages/Admin/pages/Category/Category";
import Checkout1 from "./pages/Admin/pages/UserCheckout/UserCheckout";
import Course from "./pages/Admin/pages/Course/Course";
import Invoice1 from "./pages/Admin/pages/UserInvoice/UserInvoice";
import MyClass1 from "./pages/Admin/pages/MyClass/MyClass";
import PaymentMethod from "./pages/Admin/pages/PaymentMethod/PaymentMethod";
import Schedule from "./pages/Admin/pages/Schedule/Schedule";
import Register from "./pages/Admin/pages/Register/Register";
import Login1 from "./pages/Admin/pages/Login/AdminLogin";

import { Routes, Route, ScrollRestoration } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route
        path="/new-password"
        element={<Reset setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route path="/email-confirmation" element={<EmailConfirmation />} />
      <Route
        path="/menu-kelas/:category"
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
        path="/checkout"
        element={
          <Checkout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/invoice"
        element={
          <Invoice isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/detail-invoice/:invoice_id"
        element={
          <DetailInvoice
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />
      <Route
        path="/my-class"
        element={
          <MyClass isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        }
      />
      <Route
        path="/PurchaseSuccess"
        element={
          <PurchaseSuccess
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />
      <Route path="/admin/user" element={<User />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/admin/user-checkout" element={<Checkout1 />} />
      <Route path="/admin/course" element={<Course />} />
      <Route path="/admin/user-invoice" element={<Invoice1 />} />
      <Route path="/admin/my-class" element={<MyClass1 />} />
      <Route path="/admin/payment-method" element={<PaymentMethod />} />
      <Route path="/admin/schedule" element={<Schedule />} />
      <Route path="/admin/register" element={<Register />} />
      <Route path="/admin/login" element={<Login1 />} />
    </Routes>
  );
}

export default App;
