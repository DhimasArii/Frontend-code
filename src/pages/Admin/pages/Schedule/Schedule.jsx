import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/Schedule/GetAll"
        );
        setSchedule(response.data);
      } catch (error) {
        console.error("fetching error:", error);
      }
    };

    fetchSchedule();
  }, []);
  console.log(schedule);

  return (
    <>
      <div className="flex flex-row">
        <SideMenu></SideMenu>
        <div className="flex flex-col">
          <Header></Header>
          <div
            className="flex items-center flex-col gap-60"
            style={{ padding: "20px" }}
          >
            {/* input data */}
            {/* <div className="flex flex-col gap-60">
              <div className="flex flex-col gap-16">
                <div className="mr-415 font-montserrat items-center flex font-500 gap-10">
                  <div className="text-yellow text-36">Schedule</div>
                </div>
                <div className="items-center font-400 font-montserrat text-16 text-gray">
                  add schedule data
                </div>
              </div>

              <div className="flex items-center flex-col gap-24">
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="course_name"
                    value={data.course_name}
                    onChange={handleInput}
                    label="Course Name"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>

              <div className="flex items-right flex-row gap-24">
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "yellow.main",
                      padding: "10px",
                      width: "140px",
                      height: "38px",
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "Montserrat",
                      textTransform: "none",
                      lineHeight: "1",
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "yellow.light",
                      },
                    }}
                    onClick={handleClick}
                  >
                    Input Data
                  </Button>
                </div>
              </div>
            </div> */}

            {/* Get ALL */}
            <table
              className=""
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: "10px", // row gap
                borderCollapse: "collapse",
              }}
            >
              <tr
                style={{
                  backgroundColor: "#226957",
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: "15px",
                }}
                className="font-600 font-montserrat"
              >
                <th style={{ padding: "20px 20px 20px 0" }}>No</th>
                <th style={{ padding: "20px 20px 20px 0" }}>course_date</th>
              </tr>
              {schedule.map((val, key) => (
                <tr
                  key={key}
                  style={{
                    textAlign: "center",
                    backgroundColor: key % 2 === 0 ? "inherit" : "#EA9E1F33",
                    color: "#4F4F4F",
                    fontSize: "10px",
                  }}
                  className="font-500 font-montserrat"
                >
                  <td style={{ padding: "20px 20px 20px 0" }}>{key + 1}</td>
                  <td style={{ padding: "20px 20px 20px 0" }}>
                    {val.course_date}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
