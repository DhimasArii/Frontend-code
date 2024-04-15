import { Container } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../../components/style.css";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import theme from "../../components/color";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import Footer from "../../components/Footer";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Form, useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import CardMyClass from "../../components/CardMyClass";

const MyClass = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const handleLogout = () => {
    // setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Silakan login terlebih dahulu.");
          return;
        }

        const response = await axios.get("https://dummyjson.com/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDataUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle error, such as redirecting to login page or displaying an error message
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (dataUser.id) {
          const response = await axios.get(
            `https://dummyjson.com/cart/user/${dataUser.id}`
          );
          setData(response.data.carts[0].products);
          console.log(response.data.carts[0].products);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        // Handle error, such as displaying an error message or retrying the request
      }
    };

    fetchCartData();
  }, [dataUser]);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {localStorage.getItem("token") ? (
          <NavbarLogIn handleLogout={handleLogout} />
        ) : (
          <NavbarLogOut />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "40px",
            paddingX: "71px",
          }}
        >
          <Grid container columnSpacing={1} rowSpacing={3} direction={"column"}>
            {(() => {
              if (!data || data.length === 0) {
                return (
                  <div style={{ cursor: "pointer" }}>
                    <Link to="/">
                      Cartmu kosong. Klik di sini untuk menambahkan produk.
                    </Link>
                  </div>
                );
              } else {
                return data.map((item, index) => (
                  <Grid
                    key={index}
                    xs={4}
                    sx={{ width: "100%" }}
                    display={"flex"}
                    flexDirection={"row"}
                  >
                    <CardMyClass
                      category={item.title}
                      title={item.title}
                      image={item.thumbnail}
                      schedule={item.price}
                    />
                  </Grid>
                ));
              }
            })()}
          </Grid>
        </Box>
        <Footer />
      </ThemeProvider>
    </Container>
  );
};
export default MyClass;
