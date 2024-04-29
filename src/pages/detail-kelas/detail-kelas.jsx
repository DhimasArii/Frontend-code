import { useState, useEffect } from "react";
import { format } from "date-fns";
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
import axios from "axios";

import { useParams, Link, useNavigate } from "react-router-dom";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import Footer from "../../components/Footer";
import useCheckLogin from "../../hooks/useCheckLogin";
import useLogout from "../../hooks/useLogout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DetailKelas = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const [schedule, setSchedule] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const handleSelect = (event) => {
    setSchedule(event.target.value);
  };
  const navigate = useNavigate();
  const { isLoggedIn } = useCheckLogin();
  const { handleLogout } = useLogout();

  const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
  const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7175/api/Course/${id}`
        );
        if (!response.data || response.data.length === 0) {
          throw new Error("Data not found");
        }
        setDetail(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7175/api/Course/GetAllCoursesByCategory/${detail.category_id}`
        );
        const filteredData = response.data.filter(
          (item) => item.course_id !== detail.course_id
        );
        setData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchData();
  }, [detail]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7175/api/Schedule/GetByCourseId?course_id=${id}`
        );
        setScheduleList(response.data);
        console.log(scheduleList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScheduleData();
  }, [id, detail]);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <NavbarLogIn handleLogout={handleLogoutClick} />
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
                src={detail.course_image}
                style={{ width: 400, height: 266.67 }}
              />
              <div id="frame1559" className="flex gap-60 flex-col">
                <div id="frame1556" className="flex flex-col gap-32">
                  <div id="frame1555" className="flex flex-col gap-16">
                    <div id="frame1554" className="flex flex-col gap-8">
                      <div className="font-400 text-16 font-montserrat text-gray">
                        {detail.category_name}
                      </div>
                      <div className="font-600 text-24 font-montserrat ">
                        {detail.course_name}
                      </div>
                      <div
                        className="font-600 text-24"
                        style={{ color: "#EA9E1F" }}
                      >
                        IDR {detail.price}
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
                        {scheduleList.map((schedule, index) => (
                          <MenuItem key={index} value={schedule.schedule_id}>
                            {format(
                              new Date(schedule.course_date),
                              "EEEE, d MMMM yyyy"
                            )}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div id="frame1558" className="flex flex-row gap-16">
                  <Link to="/checkout">
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
                  </Link>

                  <Link to="/checkout">
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
                  </Link>
                </div>
              </div>
            </div>
            <div id="frame1562" className="flex flex-col gap-16">
              <div className="font-600 text-24 font-montserrat">
                Description
              </div>
              <div id="frame1561" className="flex flex-col gap-24">
                <div className="font-400 text-16 font-montserrat">
                  {detail.course_description}
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
                {data.slice(0, 8).map((item, index) => {
                  console.log(index);
                  return (
                    <Grid
                      key={index}
                      xs={data.length > 1 ? 4 : 12}
                      maxWidth={350}
                    >
                      <Link
                        to={`/detail-kelas/${item.course_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <CardComponent
                          title={item.category_name}
                          body={item.course_name}
                          image={item.course_image}
                          price={item.price}
                        />
                      </Link>
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
