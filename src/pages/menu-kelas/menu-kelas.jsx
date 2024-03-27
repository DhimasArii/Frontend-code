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

const Kelas = ({ isLoggedIn, setIsLoggedIn }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const { category } = useParams();

  const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
  const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        setData(response.data.products);
        console.log(response.data.products);
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
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/1"
        );
        const json = await response.json();
        setDetail(json);
        console.log(json);
      } catch (error) {
        console.error("Error fetching detail data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchDetail();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        {localStorage.getItem("token") ? (
          <NavbarLogIn handleLogout={handleLogout} />
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
            <div className="mt-46 text-24 font-600 mx-70 w-100 font-montserrat">
              {category}
            </div>
            <div className="text-16 font-400  mx-70 w-100 font-montserrat text-black-light">
              {detail.body}
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
              Class you might like
            </div>
            <div>
              <Grid container columnSpacing={2} rowSpacing={5}>
                {data.map((item, index) => {
                  console.log(index);
                  return (
                    <Grid key={index} xs={4} maxWidth={350}>
                      <CardComponent
                        title={item.title}
                        body={item.description}
                        image={item.thumbnail}
                        price={item.price}
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

export default Kelas;
