import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import ImageHeaderKelas from "../../assets/image-header-kelas.png";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import theme from "../../components/color";
import CardComponent from "../../components/CardComponents";
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

const Kelas = () => {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useCheckLogin();
  const { handleLogout } = useLogout();
  const api = import.meta.env.VITE_URL_API;

  const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
  const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/api/Course/GetAllCoursesByCategory/${category}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`${api}/api/Category/${category}`);
        setDetail(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchDetail();
  }, []);

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
          <img src={ImageHeaderKelas} style={{ width: "100%" }} />
          <div
            id="frame1736"
            className="flex flex-col items-center gap-16 wx-70"
          >
            <div className="mt-46 text-24 font-600 mx-70 w-100 font-montserrat P_font_size1">
              {detail.category_name}
            </div>
            <div className="text-16 font-400  mx-70 w-100 font-montserrat text-black-light P_font_size">
              {detail.category_description}
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
            <div className="text-green font-600 font-montserrat text-24 P_font_size1">
              Class you might like
            </div>
            <div>
              <Grid container columnSpacing={2} rowSpacing={5}>
                {data.map((item, index) => {
                  console.log(index);
                  return (
                    <Grid
                      key={index}
                      xl={data.length > 1 ? 4 : 12}
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

export default Kelas;
