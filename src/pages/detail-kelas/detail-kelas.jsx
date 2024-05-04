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
import {
  InputAdornment,
  Box,
  Paper,
  FormControl,
  Alert,
  AlertTitle,
  Snackbar,
} from "@mui/material";
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
import useUserStore from "../../store/useUserStore";
import useStoreOrder from "../../store/useStoreOrder";
import useStoreTempBuyNow from "../../store/useStoreTempBuyNow";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DetailKelas = () => {
  const { userData, fetchUserData } = useUserStore();
  const { setSortOrder } = useStoreOrder();
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [dataCheckout, setCheckout] = useState([]);
  const { id } = useParams();
  const [schedule, setSchedule] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [myClassScheduleList, setMyClassScheduleList] = useState([]);
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const { buyNowData, setBuyNowData } = useStoreTempBuyNow();
  const handleSelect = (event) => {
    setSchedule(event.target.value);
    console.log(event.target.value);
  };
  const navigate = useNavigate();
  const { isLoggedIn } = useCheckLogin();
  const { handleLogout } = useLogout();
  const [isAlertAddToCartOpen, setIsAlertAddToCartOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");

  const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
  const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, navigate);
    }
  }, [fetchUserData, navigate]);

  useEffect(() => {
    console.log(userData); // Tampilkan userData setelah perubahan
  }, [userData]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (userData.id) {
          const response = await axios.get(
            `https://localhost:7175/api/Checkout/GetAllByUserId?user_id=${userData.id}`
          );
          setCheckout(response.data[0]);
          console.log(dataCheckout);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        // Handle error, such as displaying an error message or retrying the request
      }
    };

    fetchCartData();
  }, [schedule, userData]);

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
    const fetchCategory = async () => {
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

    fetchCategory();
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

  useEffect(() => {
    const fetchMyClassScheduleData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7175/api/MyClass/GetAllByUserId?user_id=${userData.id}`
        );
        const filteredMyClassScheduleData = response.data.filter((item) =>
          item.my_class.some((course) => course.course_id === id)
        );
        setMyClassScheduleList(filteredMyClassScheduleData);
        console.log(myClassScheduleList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMyClassScheduleData();
  }, [id, detail]);

  //filter hanya menampilkan schedule yang tidak ada di my_class
  useEffect(() => {
    const filteredData = scheduleList.filter(
      (schedule) =>
        !myClassScheduleList.some(
          (detail) => detail.schedule_id === schedule.schedule_id
        )
    );

    // Update state with filtered data
    setFilteredSchedule(filteredData);
    console.log(filteredSchedule);
  }, [myClassScheduleList, scheduleList]);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  const handleAddToCart = async () => {
    try {
      if (schedule) {
        // Periksa apakah schedule_id sudah ada di detail_checkout
        const isScheduleExists = dataCheckout.checkout_detail.some(
          (detail) => detail.schedule_id === schedule
        );

        if (isScheduleExists) {
          // Tampilkan alert atau pesan lainnya bahwa schedule sudah ada di cart
          setAlertMessage("Schedule already exists in cart.");
          setAlertSeverity("warning");
          setIsAlertAddToCartOpen(true);
        } else {
          const data = {
            checkout_id: dataCheckout.checkout_id,
            schedule_id: schedule,
            checklist: false,
          };

          const response = await axios.post(
            "https://localhost:7175/api/Checkout/AddDetailCheckout",
            data
          );
          console.log(response.data); // Tampilkan respons dari API jika diperlukan
          // Lakukan hal lain jika ada

          setAlertMessage("Berhasil add to cart");
          setAlertSeverity("success");
          setIsAlertAddToCartOpen(true);
        }
      } else {
        setAlertMessage("Please select schedule!");
        setAlertSeverity("warning");
        setIsAlertAddToCartOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Penanganan error jika diperlukan
    }
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertAddToCartOpen(false);
  };

  const handleClickBuyNow = async () => {
    try {
      if (schedule) {
        // Periksa apakah schedule_id sudah ada di detail_checkout
        const isScheduleExists = dataCheckout.checkout_detail.some(
          (detail) => detail.schedule_id === schedule
        );

        if (isScheduleExists) {
          // Tampilkan alert atau pesan lainnya bahwa schedule sudah ada di cart
          setAlertMessage(
            "Schedule already exists in cart. Please check your cart!"
          );
          setAlertSeverity("warning");
          setIsAlertAddToCartOpen(true);
        } else {
          const tempBuyNow = {
            user_id: userData.id,
            schedule_id: schedule,
          };
          setBuyNowData(tempBuyNow);
          setSortOrder("buy_now");

          navigate("/checkout"); // Navigasi ke halaman checkout setelah pembelian
        }
      } else {
        setAlertMessage("Please select schedule!");
        setAlertSeverity("warning");
        setIsAlertAddToCartOpen(true);
      }
    } catch (error) {
      console.error("Error buying now:", error);
      // Penanganan error jika diperlukan
    }
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
                      sx={{
                        m: 1,
                        minWidth: 300,
                        height: 40,
                        fontFamily: "Montserrat",
                      }}
                    >
                      <Select
                        value={schedule}
                        onChange={handleSelect}
                        displayEmpty
                        // autoWidth
                        inputProps={{ "aria-label": "Without label" }}
                        sx={{ minHeight: 10 }}
                      >
                        <MenuItem disabled={!filteredSchedule.length} value="">
                          <em
                            className="font-400 font-montserrat text-15"
                            style={{ lineHeight: "18.29px", color: "#41454D" }}
                          >
                            {filteredSchedule.length
                              ? "Select Schedule"
                              : "Tidak ada schedule lagi, semua telah terbeli"}
                          </em>
                        </MenuItem>
                        {filteredSchedule.map((schedule, index) => (
                          <MenuItem key={index} value={schedule.schedule_id}>
                            <div
                              className="font-400 font-montserrat text-15"
                              style={{
                                lineHeight: "18.29px",
                                color: "#2B2E33",
                              }}
                            >
                              {format(
                                new Date(schedule.course_date),
                                "EEEE, d MMMM yyyy"
                              )}
                            </div>
                          </MenuItem>
                        ))}
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
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  {/* Tampilkan Alert */}
                  <Snackbar
                    open={isAlertAddToCartOpen}
                    autoHideDuration={2000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <Alert
                      onClose={handleCloseAlert}
                      severity={alertSeverity}
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      {alertMessage}
                    </Alert>
                  </Snackbar>

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
                    onClick={handleClickBuyNow}
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
