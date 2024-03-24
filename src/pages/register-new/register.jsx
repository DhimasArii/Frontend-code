import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../components/color";
import { useState } from "react";
import { Outlet, Link, useNavigate } from 'react-router-dom'

import Navbar from "../../components/Navbar";

const Forgot = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleReset = () => {
    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleClick = () => {
    handleReset();
    if (!data.name && !data.email && !data.password && !data.confirmPassword) {
      setError({
        name: "Nama tidak boleh kosong",
        email: "Email tidak boleh kosong",
        password: "Password tidak boleh kosong",
        confirmPassword: "Confirm Password tidak boleh kosong",
      });
    } else if (!data.name) {
      setError({
        name: "Nama tidak boleh kosong",
      });
    } else if (!data.email) {
      setError({
        email: "Email tidak boleh kosong",
      });
    } else if (!data.password) {
      setError({
        password: "Password tidak boleh kosong",
      });
    } else if (!data.confirmPassword) {
      setError({
        confirmPassword: "Confirm Password tidak boleh kosong",
      });
    } else {
      console.log(data);
    }
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Navbar/>

        {/* body */}
        <div className="flex items-center flex-col mt-96">
          <div className="flex flex-col gap-16 items-right gap-60">
            <div className="flex flex-col gap-60">
              <div className="flex flex-col gap-16">
                <div className="mr-415 font-montserrat flex font-500">
                  <div className="text-green text-24">Lets Join</div>
                  <div className="text-yellow text-36"> D’Language</div>
                </div>
                <div className="items-left font-400 font-montserrat text-16 text-gray">
                  Please register first
                </div>
              </div>

              <div className="flex items-center flex-col gap-24">
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="name"
                    onChange={handleInput}
                    error={error.name}
                    helperText={error.name}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    color="green"
                  />
                </div>
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="email"
                    onChange={handleInput}
                    error={error.email}
                    helperText={error.email}
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    size="small"
                    color="green"
                  />
                </div>
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="password"
                    onChange={handleInput}
                    error={error.password}
                    helperText={error.password}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    size="small"
                    color="green"
                  />
                </div>
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    onChange={handleInput}
                    error={error.confirmPassword}
                    helperText={error.confirmPassword}
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    size="small"
                    color="green"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-right flex-row gap-24">
              <div>
                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{
                    backgroundColor: "green.main",
                    padding: "10px",
                    width: "140px",
                    height: "38px",
                    fontSize: "15px",
                    fontWeight: "500",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                    lineHeight: "1",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "green.light",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-40 font-400 text-16 font-montserrat">
            Have account? &nbsp;
            <Link to="/register-new" style={{textDecoration:'none',color:'blue'}}>
              Login here
            </Link>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Forgot;
