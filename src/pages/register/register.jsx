import "./register.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { Container } from "@mui/material";

const Register = () => {
  return (
    <Container>
      {/* navbar */}
      <div className="flex items-center justify-sb t-0 l-0 r-0 padding-nv">
        <div className="flex items-center">
          <div className="mr-10-5">
            <img src={ImageNavbar} alt="" />
          </div>
          <div className="font-400 text-24">Language</div>
        </div>
        <div className="flex items-center">
          <div>
            <button className="py-10 px-20 rad-8 bg-green border-none text-white font-500">
              Login
            </button>
          </div>
          <div className="ml-16">
            <button className="py-10 px-20 rad-8 bg-yellow border-none text-white font-500">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="flex items-center flex-col body">
        <div className="flex flex-col items-center">
          <div className="mr-415 mb-60">Create Password</div>
          <div className="w-100 mb-24">
            <input
              className="w-100 input"
              type="password"
              id="password"
              placeholder="New Password"
            />
          </div>
          <div className="w-100 mb-40">
            <input
              className="w-100"
              type="password"
              id="ConfirmNewPassword"
              placeholder="Confirm New Password"
            />
          </div>
          <div className="flex">
            <div>
              <button>Cancle</button>
            </div>
            <div>
              <button>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
