import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
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
import { Form, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

import CardMyClass from "../../components/CardMyClass";

const MyClass = () => {
  const navigate = useNavigate();
  const [detailInvoiceData, setDetailInvoiceData] = useState([]);
  const { userData, fetchUserData } = useUserStore();
  const api = import.meta.env.VITE_URL_API;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, navigate);
    }
  }, [fetchUserData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${api}/api/MyClass/GetAllByUserId?user_id=${userData.id}`
        );
        setDetailInvoiceData(response.data);
        console.log(detailInvoiceData);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchData();
  }, [userData]);

  console.log(detailInvoiceData);

  const formattedDate = (courseDate) =>
    courseDate ? format(new Date(courseDate), "EEEE, dd MMMM yyyy") : "";

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
            "@media (max-width: 450px)": {
              paddingX: 0,
            },
          }}
        >
          <Grid
            container
            columnSpacing={1}
            rowSpacing={3}
            direction={"column"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              marginTop: "40px",
              paddingX: "71px",
            }}
          >
            {detailInvoiceData && detailInvoiceData.length > 0 ? (
              detailInvoiceData.map((item, index) => (
                <Grid
                  key={index}
                  item
                  xs={4}
                  sx={{ width: "100%" }}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <CardMyClass
                    category={item.my_class[0].category_name}
                    title={item.my_class[0].course_name}
                    image={item.my_class[0].course_image} // Assuming you have an image field in the data
                    schedule={formattedDate(item.my_class[0].course_date)}
                  />
                </Grid>
              ))
            ) : (
              <div style={{ cursor: "pointer" }}>
                <Link to="/">
                  Cartmu kosong. Klik di sini untuk menambahkan produk.
                </Link>
              </div>
            )}
          </Grid>
        </Box>
        <Footer />
      </ThemeProvider>
    </Container>
  );
};
export default MyClass;
