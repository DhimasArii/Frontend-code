import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import theme from "../../components/color";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

import Navbar from "../../components/Navbar";

const Forgot = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setData({
      ...data,
      showConfirmPassword: !data.showConfirmPassword,
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

    //cek valid confirmPassword
    if (name === "confirmPassword") {
      if (!value.trim()) {
        setError({
          ...error,
          confirmPassword: "confirmPassword tidak boleh kosong",
        });
      } else if (value.length < 8) {
        setError({
          ...error,
          confirmPassword: "confirmPassword minimal 8 karakter",
        });
      } else {
        setError({
          ...error,
          confirmPassword: "", // Reset pesan error jika valid
        });
      }
    }
  };

  const handleReset = () => {
    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleClick = async () => {
    handleReset();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !data.name.trim() &&
      !data.email.trim() &&
      !data.password.trim() &&
      !data.confirmPassword.trim()
    ) {
      setError({
        name: "Nama tidak boleh kosong",
        email: "Email tidak boleh kosong",
        password: "Password tidak boleh kosong",
        confirmPassword: "Confirm Password tidak boleh kosong",
      });
    } else if (!data.name.trim() && !data.email.trim()) {
      setError({
        name: "Nama tidak boleh kosong",
        email: "Email tidak boleh kosong",
      });
    } else if (!data.email.trim() && !data.password.trim()) {
      setError({
        email: "Email tidak boleh kosong",
        password: "Password tidak boleh kosong",
      });
    } else if (!data.password.trim() && !data.confirmPassword.trim()) {
      setError({
        password: "Password tidak boleh kosong",
        confirmPassword: "Confirm Password tidak boleh kosong",
      });
    } else if (!data.confirmPassword.trim() && !data.name.trim()) {
      setError({
        confirmPassword: "Confirm Password tidak boleh kosong",
        name: "Nama tidak boleh kosong",
      });
    } else if (!data.name.trim()) {
      setError({
        name: "Nama tidak boleh kosong",
      });
    } else if (!data.email.trim()) {
      setError({
        email: "Email tidak boleh kosong",
      });
    } else if (!data.password.trim()) {
      setError({
        password: "Password tidak boleh kosong",
      });
    } else if (!data.confirmPassword.trim()) {
      setError({
        confirmPassword: "Confirm Password tidak boleh kosong",
      });
    } else if (!emailRegex.test(data.email)) {
      setError({
        email: "Format email tidak valid",
      });
    } else if (data.confirmPassword !== data.password) {
      setError({
        password: "Password dan Confirm Password harus sama",
        confirmPassword: "Password dan Confirm Password harus sama",
      });
    } else {
      try {
        const response = await axios.post(
          "https://localhost:7175/api/User/CreateUser",
          {
            email: data.email,
            passwords: data.password,
            role: "user", // Sesuaikan dengan role yang sesuai
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        alert("Data telah terkirim \nTolong cek email untuk aktivasi");

        // Lakukan aksi selanjutnya setelah validasi sukses
        setIsLoggedIn(true);
        // Redirect ke halaman Landing setelah login berhasil
        navigate("/email-confirmation");
      } catch (error) {
        console.error(error);
        alert("Register gagal!\nSilahkan cek kembali data anda!");
      }
    }
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Navbar />

        {/* body */}
        <div className="flex items-center flex-col mt-96">
          <div className="flex flex-col gap-16 items-right gap-60">
            <div className="flex flex-col gap-60">
              <div className="flex flex-col gap-16">
                <div className="mr-415 font-montserrat items-center flex font-500 gap-10">
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
                    inputProps={{ type: "email" }}
                  />
                </div>
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="password"
                    onChange={handleInput}
                    error={error.password}
                    helperText={error.password}
                    type={data.showPassword ? "text" : "password"}
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    size="small"
                    color="green"
                    value={data.password}
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
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="confirmPassword"
                    onChange={handleInput}
                    error={error.confirmPassword}
                    helperText={error.confirmPassword}
                    type={data.showConfirmPassword ? "text" : "password"}
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    size="small"
                    color="green"
                    value={data.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {data.showConfirmPassword ? (
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

            <div className="flex items-right flex-row gap-24">
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
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-40 font-400 text-16 font-montserrat mb-92">
            Have account? &nbsp;
            <Link to="/Login" style={{ textDecoration: "none", color: "blue" }}>
              Login here
            </Link>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Forgot;
