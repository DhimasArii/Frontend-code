import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../components/color";
import { useState } from "react";

const CreatePassword = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
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
        {/* navbar */}
        <div className="flex items-center justify-sb t-0 l-0 r-0 padding-nv">
          <div className="flex items-center">
            <div className="mr-10-5">
              <img src={ImageNavbar} alt="" />
            </div>
            <div className="font-400 text-24 font-montserrat">Language</div>
          </div>
          <div className="flex items-center">
            <div>
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
            </div>
            <div className="ml-16">
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
            </div>
          </div>
        </div>

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
                    id="outlined-basic"
                    label="New Password"
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
                    label="Confirm New Password"
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
