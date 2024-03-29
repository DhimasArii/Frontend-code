import Button from "@mui/material/Button";
import "../components/style.css";
import ImageNavbar from "../assets/image-navbar-confirm.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import IconShopingCart from "../assets/icon_shopping_cart.png";
import IconPerson from "../assets/icon_person.png";
import IconLogout from "../assets/icon_logout.png";

const Navbar2 = ({ handleLogout }) => {
  return (
    <>
      {/* navbar */}
      <div
        id="frame1517"
        className="flex items-center justify-sb t-0 l-0 r-0 padding-nv"
      >
        <div id="frame1518" className="flex items-center py-10 pl-10">
          <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
            <div id="frame1738" className="flex items-center">
              <div className="mr-10-5">
                <img src={ImageNavbar} alt="" />
              </div>
              <div className="font-400 text-24 font-montserrat">Language</div>
            </div>
          </Link>
        </div>
        <div id="frame1516" className="flex items-center gap-40">
          <Link to="/checkout">
            <img src={IconShopingCart} alt="" />
          </Link>
          <div className="text-16 font-montserrat text-green">My Class</div>
          <div className="text-16 font-montserrat text-green">Invoice</div>
          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: 20,
              borderColor: "#000000",
            }}
          />
          <img src={IconPerson} alt="" />
          <Link to="/" onClick={handleLogout}>
            <img src={IconLogout} alt="" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
