import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import { Container } from "@mui/material";

const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true); // State untuk mengatur apakah menu samping ditampilkan atau tidak

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/PaymentMethod/GetAll"
        );
        setPaymentMethods(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen); // Mengubah nilai state isSideMenuOpen menjadi kebalikannya
  };

  return (
    <>
      <div className="flex flex-row">
        {isSideMenuOpen && <SideMenu />}{" "}
        {/* Menampilkan SideMenu hanya jika isSideMenuOpen bernilai true */}
        <Container>
          <div className="flex flex-col">
            <Header toggleSideMenu={toggleSideMenu} />{" "}
            {/* Mengirimkan fungsi toggleSideMenu sebagai prop */}
            <div className="flex items-center">
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
                  <th style={{ padding: "20px 20px 20px 0" }}>Payment ID</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Icon</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Name</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Description</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Status Active</th>
                </tr>
                {paymentMethods.map((payment, index) => (
                  <tr
                    key={index}
                    style={{
                      textAlign: "center",
                      backgroundColor:
                        index % 2 === 0 ? "inherit" : "#EA9E1F33",
                      color: "#4F4F4F",
                    }}
                    className="font-500 text-16 font-montserrat"
                  >
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {payment.id_payment_method}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      <img
                        src={payment.payment_icon}
                        alt={payment.payment_name}
                        className="h-8 w-8"
                      />
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {payment.payment_name}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {payment.payment_description}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {payment.payment_status ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PaymentMethod;
