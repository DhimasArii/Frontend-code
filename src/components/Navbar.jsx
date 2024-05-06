import Button from "@mui/material/Button";
import "../components/style.css";
import ImageNavbar from "../assets/image-navbar-confirm.png";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* navbar */}
      <div
        id="frame1517"
        className="flex items-center justify-sb t-0 l-0 r-0 padding-nv w-100 h-86"
      >
        <div id="frame1518" className="flex items-center py-10 pl-10">
          <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
            <div id="frame1738" className="flex items-center">
              <div className="mr-10-5">
                <img src={ImageNavbar} alt="" className="image_size" />
              </div>
              <div className="font-400 text-24 font-montserrat font_size">
                Language
              </div>
            </div>
          </Link>
        </div>
        <div id="frame1516" className="flex items-center">
          <div>
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "green.main",
                  padding: "10px 20px",
                  width: "86px",
                  height: "40px",
                  fontSize: "15px",
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  textTransform: "none",
                  lineHeight: "1",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "green.light",
                  },
                }}
              >
                Login
              </Button>
            </Link>
          </div>
          <div className="ml-16">
            <Link to="/register-new">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "yellow.main",
                  padding: "10px 20px",
                  width: "105px",
                  height: "40px",
                  fontSize: "15px",
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  textTransform: "none",
                  lineHeight: "1",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "yellow.light",
                  },
                }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
