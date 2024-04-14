import React from "react";
import Footer from "../../components/Footer";
import Container from "@mui/material/Container";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper, FormControl } from "@mui/material";
import theme from "../../components/color";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const invoice = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    navigate("/login");
  };

  const data = [
    {
      no: 1,
      noInvoice: "DLA00003",
      date: "12 Juli 2023",
      totalCourse: 2,
      totalPrice: "IDR 700.00",
      action: (
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
          Details
        </Button>
      ),
    },
    {
      no: 2,
      noInvoice: "DLA00003",
      date: "12 Juli 2023",
      totalCourse: 1,
      totalPrice: "IDR 700.00",
      action: (
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
          Details
        </Button>
      ),
    },
    {
      no: 3,
      noInvoice: "DLA00003",
      date: "12 Juli 2023",
      totalCourse: 1,
      totalPrice: "IDR 700.00",
      action: (
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
          Details
        </Button>
      ),
    },
  ];
  return (
    <Container>
      <ThemeProvider theme={theme}>
        {localStorage.getItem("token") ? (
          <NavbarLogIn handleLogout={handleLogout} />
        ) : (
          <NavbarLogOut />
        )}

        {/* body */}
        <div className="flex flex-col w-100">
          <div
            id="frame1732"
            className="flex flex-col gap-32"
            style={{
              paddingTop: "46px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            <div id="frame1410" className="flex flex-row gap-8 ">
              <div className="font-600 text-16 font-montserrat text-gray">
                Home -
              </div>
              <div className="font-600 text-16 font-montserrat text-yellow">
                Invoice
              </div>
            </div>

            <div id="frame1731" className="flex flex-col gap-24">
              <div
                className="font-600 text-20 font-montserrat"
                style={{ color: "#4F4F4F" }}
              >
                Menu Invoice
              </div>

              <table
                className=""
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px", // row gap
                  borderCollapse: "collapse",
                }}
              >
                <tr
                  style={{
                    backgroundColor: "#226957",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                  className="font-600 text-16 font-montserrat"
                >
                  <th style={{ padding: "20px" }}>No</th>
                  <th style={{ padding: "20px" }}>No. Invoice</th>
                  <th style={{ padding: "20px" }}>Date</th>
                  <th style={{ padding: "20px" }}>Total Course</th>
                  <th style={{ padding: "20px" }}>Total Price</th>
                  <th style={{ padding: "20px" }}>Action</th>
                </tr>
                {data.map((val, key) => {
                  return (
                    <tr
                      key={key}
                      style={{
                        textAlign: "center",
                        backgroundColor: key === 1 ? "#EA9E1F33" : "inherit",
                        color: "#4F4F4F",
                      }}
                      className="font-500 text-16 font-montserrat"
                    >
                      <td style={{ padding: "20px 20px 20px 0" }}>{val.no}</td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {val.noInvoice}
                      </td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {val.date}
                      </td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {val.totalCourse}
                      </td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {val.totalPrice}
                      </td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {val.action}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default invoice;
