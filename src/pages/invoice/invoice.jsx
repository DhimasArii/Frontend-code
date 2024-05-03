import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Footer from "../../components/Footer";
import Container from "@mui/material/Container";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper, FormControl } from "@mui/material";
import theme from "../../components/color";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import useUserStore from "../../store/useUserStore";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Invoice = ({ isLoggedIn, setIsLoggedIn }) => {
  const { userData, fetchUserData } = useUserStore();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState([]);
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, navigate);
    }
  }, [fetchUserData, navigate]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7175/api/Invoice/GetAllByUserId?user_id=${userData.id}`
        );
        setInvoiceData(response.data);
        console.log(invoiceData);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoiceData();
  }, []);

  const handleDetailClick = (invoiceId) => {
    navigate(`/detail-invoice/${invoiceId}`);
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
        <div className="flex flex-col w-100">
          <div id="frame1732" className="flex flex-col gap-32 px-70 mt-46">
            <div id="frame1410" className="flex flex-row gap-8 ">
              <div className="font-600 text-16 font-montserrat text-gray">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                >
                  Home &gt;
                </Link>
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
                  <th style={{ padding: "20px 20px 20px 0" }}>No</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>No. Invoice</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Date</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Total Course</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Total Price</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Action</th>
                </tr>
                {invoiceData.map((val, key) => (
                  <tr
                    key={key}
                    style={{
                      textAlign: "center",
                      backgroundColor: key % 2 === 0 ? "inherit" : "#EA9E1F33",
                      color: "#4F4F4F",
                    }}
                    className="font-500 text-16 font-montserrat"
                  >
                    <td style={{ padding: "20px 20px 20px 0" }}>{key + 1}</td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.invoice_number}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {format(new Date(val.invoice_date), "dd MMMM yyyy")}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.total_course}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.total_price}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
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
                        onClick={() => handleDetailClick(val.invoice_id)}
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Invoice;
