import Button from "@mui/material/Button";
import "../components/style.css";
import ImageNavbar from "../assets/image-navbar-confirm.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import IconShopingCart from "../assets/icon_shopping_cart.png";
import IconPerson from "../assets/icon_person.png";
import IconLogout from "../assets/icon_logout.png";
import useStoreOrder from "../store/useStoreOrder";

const Navbar2 = ({ handleLogout }) => {
  const { sortOrder, setSortOrder } = useStoreOrder();
  const navigate = useNavigate();
  const handleCart = () => {
    setSortOrder("cart");
    navigate("/checkout");
    console.log(sortOrder);
  };
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
                <img src={ImageNavbar} alt="" className="P_image_size" />
              </div>
              <div className="font-400 text-24 font-montserrat P_font_size">
                Language
              </div>
            </div>
          </Link>
        </div>
        <div id="frame1516" className="flex items-center gap-40 P_gap_8">
          <Link to="/checkout" onClick={handleCart}>
            <img src={IconShopingCart} alt="" className="P_image_size" />
          </Link>
          <Link
            to={"/my-class"}
            style={{ textDecoration: "none", color: "inherit" }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            <div className="text-16 font-montserrat text-green P_font_size">
              My Class
            </div>
          </Link>
          <Link
            to={"/invoice"}
            style={{ textDecoration: "none", color: "inherit" }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            <div className="text-16 font-montserrat text-green P_font_size">
              Invoice
            </div>
          </Link>
          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: 20,
              borderColor: "#000000",
            }}
          />
          <img src={IconPerson} alt="" className="P_image_size" />
          <Link to="/" onClick={handleLogout}>
            <img src={IconLogout} alt="" className="P_image_size" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
