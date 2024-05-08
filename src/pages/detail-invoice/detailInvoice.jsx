import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Footer from "../../components/Footer";
import Container from "@mui/material/Container";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper, FormControl } from "@mui/material";
import theme from "../../components/color";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";

import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DetailInvoice = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { invoice_id } = useParams();
  const api = import.meta.env.VITE_URL_API;
  const [detailInvoiceData, setDetailInvoiceData] = useState([]);
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    navigate("/login");
  };
  console.log(invoice_id);

  useEffect(() => {
    const fetchDetailInvoice = async () => {
      try {
        const response = await axios.get(
          `${api}/api/Invoice/GetAllByInvoiceId?invoice_id=${invoice_id}`
        );
        setDetailInvoiceData(response.data[0]);
        console.log(detailInvoiceData);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchDetailInvoice();
  }, [invoice_id]);

  useEffect(() => {
    console.log(detailInvoiceData.detail_Invoices);
  }, [invoice_id]);
  const courseDate = detailInvoiceData.invoice_date || "";
  const formattedDate = courseDate
    ? format(new Date(courseDate), "dd MMMM yyyy")
    : "";

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
              <div className="font-600 text-16 font-montserrat text-gray P_font_size">
                <Link
                  to={"/invoice"}
                  style={{ textDecoration: "none", color: "inherit" }}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                >
                  Invoice &gt;
                </Link>
              </div>
              <div className="font-600 text-16 font-montserrat text-yellow P_font_size">
                Detail Invoice
              </div>
            </div>

            <div id="frame1731" className="flex flex-col gap-24">
              <div
                className="font-600 text-20 font-montserrat P_font_size1"
                style={{ color: "#4F4F4F" }}
              >
                Details Invoice
              </div>

              <div id="frame1551" className="flex flex-col">
                <div className="font-500 text-18 font-montserrat P_font_size">
                  No. Invoice :
                  <span style={{ marginLeft: "25px" }}>
                    {detailInvoiceData.invoice_number}
                  </span>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="font-500 text-18 font-montserrat P_font_size">
                    Date :
                    <span style={{ marginLeft: "80px" }}>{formattedDate}</span>
                  </div>

                  <div className="font-700 text-18 font-montserrat P_font_size">
                    Total Price
                    <span style={{ marginLeft: "8px" }}>
                      {Intl.NumberFormat("id-ID").format(
                        detailInvoiceData.total_price
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <table
                className=""
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px", // row gap
                  borderCollapse: "collapse",
                  width: "100%",
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
                    Course Name
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Language
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Schedule
                  </th>
                  <th className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                    Price
                  </th>
                </tr>
                {detailInvoiceData.detail_Invoices &&
                  detailInvoiceData.detail_Invoices.map((val, key) => {
                    return (
                      <tr
                        key={key}
                        style={{
                          textAlign: "center",
                          backgroundColor:
                            key % 2 === 0 ? "inherit" : "#EA9E1F33",
                          color: "#4F4F4F",
                        }}
                        className="font-500 text-16 font-montserrat table-row"
                      >
                        <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                          {key + 1}
                        </td>
                        <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                          {val.course_name}
                        </td>
                        <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                          {val.category_name}
                        </td>
                        <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                          {format(new Date(val.course_date), "dd MMMM yyyy")}
                        </td>
                        <td className="L_padding_tabel P_font_size P_padding_tabel PC_padding_tabel">
                          {Intl.NumberFormat("id-ID").format(val.course_price)}
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

export default DetailInvoice;
