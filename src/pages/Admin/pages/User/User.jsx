import React, { useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";

const User = () => {
  const [getall, setGetall] = useState([]);

  useEffect(() => {
    const fetchGetall = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/User/GetAll"
        );
        setGetall(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchGetall();
  }, []);
  console.log(getall);
  return (
    <>
      <div className="flex flex-row">
        <SideMenu></SideMenu>
        <div className="flex flex-col">
          <Header></Header>
          <div className="flex items-center">
            {/*  */}
            {/* <table
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
                <th style={{ padding: "20px 20px 20px 0" }}>user_id</th>
                <th style={{ padding: "20px 20px 20px 0" }}>email</th>
                <th style={{ padding: "20px 20px 20px 0" }}>passwords</th>
                <th style={{ padding: "20px 20px 20px 0" }}>isActivated</th>
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
                </tr>
              ))}
            </table> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
