import { useState, useEffect } from "react";
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import ImageHeaderKelas from "../../assets/image-header-kelas.png";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper, FormControl } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import theme from "../../components/color";
import CardComponent from "../../components/CardComponents";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useParams } from "react-router-dom";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import Footer from "../../components/Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DetailKelas = ({ isLoggedIn, setIsLoggedIn }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const [schedule, setSchedule] = React.useState("");
  const handleSelect = (event) => {
    setSchedule(event.target.value);
  };

  const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
  const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => setDetail(json));
  }, [id]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    navigate("/login");
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <NavbarLogIn handleLogout={handleLogout} />
        ) : (
          <NavbarLogOut />
        )}

        {/* body */}
        <div className="flex flex-col items-center w-100">
          <div
            id="frame1563"
            className="flex flex-col items-center gap-40 wx-70"
          >
            <div
              id="frame1560"
              className="flex flex-row mt-46 text-24 font-600 mx-70 w-100 font-montserrat gap-40"
            >
              <img
                src="/images/image-course.png"
                style={{ width: 400, height: 266.67 }}
              />
              <div id="frame1559" className="flex gap-60 flex-col">
                <div id="frame1556" className="flex flex-col gap-32">
                  <div id="frame1555" className="flex flex-col gap-16">
                    <div id="frame1554" className="flex flex-col gap-8">
                      <div className="font-400 text-16 font-montserrat text-gray">
                        English
                      </div>
                      <div className="font-600 text-24 font-montserrat ">
                        Basic English for Junior
                      </div>
                      <div
                        className="font-600 text-24"
                        style={{ color: "#EA9E1F" }}
                      >
                        IDR 400.000
                      </div>
                    </div>
                  </div>
                  <div id="frame1508" className="">
                    <FormControl
                      sx={{ m: 1, minWidth: 300, fontFamily: "Montserrat" }}
                    >
                      <Select
                        value={schedule}
                        onChange={handleSelect}
                        displayEmpty
                        autoWidth
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="">
                          <em style={{ fontFamily: "Montserrat" }}>
                            Select Schedule
                          </em>
                        </MenuItem>
                        <MenuItem value={1}>Monday, 25 July 2022</MenuItem>
                        <MenuItem value={2}>Tuesday, 26 July 2022</MenuItem>
                        <MenuItem value={3}>Wednesday, 27 July 2022</MenuItem>
                        <MenuItem value={4}>Thursday, 28 July 2022</MenuItem>
                        <MenuItem value={5}>Friday, 29 July 2022</MenuItem>
                        <MenuItem value={6}>Saturday, 30 July 2022</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div id="frame1558" className="flex flex-row gap-16">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "yellow.main",
                      padding: "10px,20px",
                      width: "233.5px",
                      height: "40px",
                      fontSize: "16px",
                      fontWeight: "500",
                      fontFamily: "Montserrat",
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "yellow.light",
                      },
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green.main",
                      padding: "10px,20px",
                      width: "233.5px",
                      height: "40px",
                      fontSize: "16px",
                      fontWeight: "500",
                      fontFamily: "Montserrat",
                      textTransform: "none",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "green.light",
                      },
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
            <div id="frame1562" className="flex flex-col gap-16">
              <div className="font-600 text-24 font-montserrat">
                Description
              </div>
              <div id="frame1561" className="flex flex-col gap-24">
                <div className="font-400 text-16 font-montserrat">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
                <div className="font-400 text-16 font-poppins">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </div>
            </div>
          </div>
          <hr
            style={{
              width: "100vw",
              height: "1px",
              borderColor: "#E0E0E0",
              margin: "80px 0 0 0",
              borderStyle: "solid",
              borderWidth: "1px 0 0 0",
            }}
          />

          <div
            id="frame1546"
            className="flex flex-col items-center mt-80 gap-60 mx-91"
          >
            <div className="text-green font-600 font-montserrat text-24">
              Another class for you
            </div>
            <div>
              <Grid container columnSpacing={2} rowSpacing={5}>
                {data.slice(0, 3).map((item, index) => {
                  console.log(index);
                  return (
                    <Grid key={index} xs={4} maxWidth={350}>
                      <CardComponent
                        title={item.title}
                        body={item.title}
                        image={item.url}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default DetailKelas;
