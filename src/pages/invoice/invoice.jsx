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
  const api = import.meta.env.VITE_URL_API;
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
          `${api}/api/Invoice/GetAllByUserId?user_id=${userData.id}`
        );
        setInvoiceData(response.data);
        console.log(invoiceData);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchInvoiceData();
  }, [userData]);

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
          <div
            id="frame1732"
            className="flex flex-col gap-32 px-70 mt-46 P_padding_x"
          >
            <div id="frame1410" className="flex flex-row gap-8 ">
              <div className="font-600 text-16 font-montserrat text-gray P_font_size">
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
              <div className="font-600 text-16 font-montserrat text-yellow P_font_size">
                Invoice
              </div>
            </div>

            <div id="frame1731" className="flex flex-col gap-24">
              <div
                className="font-600 text-20 font-montserrat P_font_size1"
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
                  width: "100%", // Mengatur lebar tabel menjadi responsif
                }}
              >
                <tr
                  style={{
                    backgroundColor: "#226957",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                  className="font-600 text-16 font-montserrat table-row"
                >
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    No
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    No. Invoice
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Date
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Total Course
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Total Price
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Action
                  </th>
                </tr>
                {invoiceData.map((val, key) => (
                  <tr
                    key={key}
                    style={{
                      textAlign: "center",
                      backgroundColor: key % 2 === 0 ? "inherit" : "#EA9E1F33",
                      color: "#4F4F4F",
                    }}
                    className="font-500 text-16 font-montserrat table-row"
                  >
                    <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                      {key + 1}
                    </td>
                    <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                      {val.invoice_number}
                    </td>
                    <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                      {format(new Date(val.invoice_date), "dd MMMM yyyy")}
                    </td>
                    <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                      {val.total_course}
                    </td>
                    <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                      {Intl.NumberFormat("id-ID").format(val.total_price)}
                    </td>
                    <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
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
