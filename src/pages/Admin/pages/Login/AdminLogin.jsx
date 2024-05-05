import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../../../../components/style.css";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import theme from "../../../../components/color";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";

import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });

    //cek valid email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        setError({
          ...error,
          email: "Email tidak boleh kosong",
        });
      } else if (!emailRegex.test(value)) {
        setError({
          ...error,
          email: "Format email tidak valid",
        });
      } else {
        setError({
          ...error,
          email: "", // Reset pesan error jika valid
        });
      }
    }

    //cek valid password
    if (name === "password") {
      if (!value.trim()) {
        setError({
          ...error,
          password: "Password tidak boleh kosong",
        });
      } else if (value.length < 8) {
        setError({
          ...error,
          password: "Password minimal 8 karakter",
        });
      } else {
        setError({
          ...error,
          password: "", // Reset pesan error jika valid
        });
      }
    }
  };

  const handleReset = () => {
    setError({
      email: "",
      password: "",
    });
  };

  const handleClick = async () => {
    handleReset();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim() && !data.password.trim()) {
      setError({
        email: "Email tidak boleh kosong",
        password: "Password tidak boleh kosong",
      });
    } else if (!data.email.trim()) {
      setError({
        email: "Email tidak boleh kosong",
      });
    } else if (!emailRegex.test(data.email)) {
      setError({
        email: "Format email tidak valid",
      });
    } else if (!data.password.trim()) {
      setError({
        password: "Password tidak boleh kosong",
      });
    } else {
      try {
        const response = await axios.post(
          "https://localhost:7175/api/User/login",
          {
            email: data.email,
            passwords: data.password,
            // expiresInMins: 60, // optional
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        console.log(response.data.token);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);

          setIsLoggedIn(true);
        } else {
          console.error("Login failed:", response.data.error);
        }
        alert("Login Berhasil");
      } catch (error) {
        console.error(error);
        alert("Login gagal!\nSilahkan cek kembali email dan password anda!");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row">
        <SideMenu></SideMenu>
        <div className="flex flex-col">
          <Header></Header>
          <div
            className="flex items-center flex-col gap-60"
            style={{ padding: "20px" }}
          ></div>
          {/* body */}
          <div className="flex items-center flex-col mt-96">
            <div className="flex flex-col gap-16 items-right gap-60">
              <div className="flex flex-col gap-40">
                <div className="flex flex-col gap-16">
                  <div className="mr-429 font-montserrat text-24 text-green">
                    Welcome Back!
                  </div>
                  <div className="font-400 text-16 font-montserrat">
                    Please login first
                  </div>
                </div>

                <div className="flex items-left flex-col gap-24">
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="email"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      size="small"
                      color="green"
                      inputProps={{ type: "email" }}
                      error={!!error.email}
                      onChange={handleInput}
                      helperText={error.email}
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      id="outlined-basic-password"
                      name="password"
                      label="Password"
                      type={data.showPassword ? "text" : "password"}
                      size="small"
                      color="green"
                      error={!!error.password}
                      value={data.password}
                      onChange={handleInput}
                      helperText={error.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {data.showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& input[type="password"]::-ms-reveal': {
                          display: "none",
                        },
                        '& input[type="password"]::-ms-clear': {
                          display: "none",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-24">
                <div>
                  <Button
                    variant="contained"
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
                    onClick={handleClick}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-40 font-400 text-16 font-montserrat">
              Dont have account? &nbsp;
              <Link
                to="/Register"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Sign Up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
