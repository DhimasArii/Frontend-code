import React from "react";
import User from "../pages/User/User";
import { Outlet, Link, useNavigate } from "react-router-dom";

const SideMenu = () => {
  return (
    <>
      <div
        className="flex flex-col font-montserrat"
        style={{ padding: "80px 50px 0", gap: "20px" }}
      >
        <div>
          <Link to={"/User"} style={{ textDecoration: "none" }}>
            User
          </Link>
        </div>
        <div>
          <Link to={"/Category"} style={{ textDecoration: "none" }}>
            Category
          </Link>
        </div>
        <div>
          <Link to={"/Course"} style={{ textDecoration: "none" }}>
            Course
          </Link>
        </div>
        <div>
          <Link to={"/UserCheckout"} style={{ textDecoration: "none" }}>
            Checkout
          </Link>
        </div>
        <div>
          <Link to={"/UserInvoice"} style={{ textDecoration: "none" }}>
            Invoice
          </Link>
        </div>
        <div>
          <Link to={"/MyClass"} style={{ textDecoration: "none" }}>
            MyClass
          </Link>
        </div>
        <div>
          <Link to={"/PaymentMethod"} style={{ textDecoration: "none" }}>
            PaymentMethod
          </Link>
        </div>
        <div>
          <Link to={"/Schedule"} style={{ textDecoration: "none" }}>
            Schedule
          </Link>
        </div>

        <div>
          <Link to={"/Register"} style={{ textDecoration: "none" }}>
            Register
          </Link>
        </div>
        <div>
          <Link to={"/AdminLogin"} style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
