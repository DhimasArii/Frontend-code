import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../components/color";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment, Box, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const CreatePassword = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [error, setError] = useState({
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

    //cek valid password
    if (name === "confirmPassword") {
      if (!value.trim()) {
        setError({
          ...error,
          confirmPassword: "Confirm Password tidak boleh kosong",
        });
      } else if (value.length < 8) {
        setError({
          ...error,
          confirmPassword: "Confirm Password minimal 8 karakter",
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
      password: "",
      confirmPassword: "",
    });
  };

  const handleClick = () => {
    handleReset();
    if (!data.password && !data.confirmPassword) {
      setError({
        password: "Password tidak boleh kosong",
        confirmPassword: "Confirm Password tidak boleh kosong",
      });
    } else if (data.confirmPassword !== data.password) {
      setError({
        password: "Password dan Confirm Password harus sama",
        confirmPassword: "Password dan Confirm Password harus sama",
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
      // Lakukan aksi selanjutnya setelah validasi sukses
      setIsLoggedIn(true);
      // Redirect ke halaman Landing setelah login berhasil
      navigate("/login");

      console.log(
        "Form ",
        setIsLoggedIn,
        "\n Password :",
        data.password,
        "\n Confirm Password :",
        data.confirmPassword
      );
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
              <div className="mr-415 font-montserrat text-24">
                Create Password
              </div>

              <div className="flex items-center flex-col gap-24">
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="password"
                    onChange={handleInput}
                    error={error.password}
                    helperText={error.password}
                    value={data.password}
                    type={data.showPassword ? "text" : "password"}
                    id="outlined-basic"
                    label="New Password"
                    variant="outlined"
                    size="small"
                    color="green"
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
                    value={data.confirmPassword}
                    type={data.showConfirmPassword ? "text" : "password"}
                    id="outlined-basic"
                    label="Confirm New Password"
                    variant="outlined"
                    size="small"
                    color="green"
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
                <Link to="/forgot-password">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "yellow.main",
                      padding: "10px",
                      width: "140px",
                      height: "38px",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "Montserrat",
                      textTransform: "none",
                      lineHeight: "18.29px",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "yellow.light",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
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
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default CreatePassword;
