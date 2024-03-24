import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../components/color";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [data, setData] = useState({
    email: "",
  });

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
  };

  const [error, setError] = useState({
    email: "",
  });

  const handleReset = () => {
    setError({
      email: "",
    });
  };

  const handleClick = () => {
    handleReset();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim()) {
      setError({
        email: "Email tidak boleh kosong",
      });
    } else if (!emailRegex.test(data.email)) {
      setError({
        email: "Format email tidak valid",
      });
    } else {
      // Lakukan aksi selanjutnya setelah validasi sukses
      console.log("Form valid,\n Email :", data.email);
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
                <div className="mr-415 font-montserrat text-24">
                  Reset Password
                </div>
                <div className="items-left font-400 font-montserrat text-16 text-gray">
                  Please enter your email address
                </div>
              </div>

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
            </div>

            <div className="flex items-right flex-row gap-24">
              <div>
                <Link to="/login">
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
                <Link to="/new-password">
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Forgot;
