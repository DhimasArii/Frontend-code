import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [data, setData] = useState({
    schedule_id: "",
    course_id: "",
    course_date: null,
  });

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

  //format tgl
  const formattedDate = (courseDate) =>
    courseDate ? format(new Date(courseDate), "EEEE, dd MMMM yyyy") : "";

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7175/api/Schedule/CreateSchedule",
        {
          schedule_id: data.schedule_id,
          course_id: data.course_id,
          course_date: data.course_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert("Data telah terkirim");
    } catch (error) {
      console.error("fatching error: ", error);
      alert("Data gagal terkirim!");
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex flex-row">
          <SideMenu></SideMenu>
          <div className="flex flex-col">
            <Header></Header>
            <div
              className="flex items-center flex-col gap-60"
              style={{ padding: "20px" }}
            >
              {/* input data */}
              <div className="flex flex-col gap-60">
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
                      name="schedule_id"
                      value={data.schedule_id}
                      onChange={handleInput}
                      label="Schedule Id"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="course_id"
                      value={data.course_id}
                      onChange={handleInput}
                      label="Course Id"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="course_date"
                      inputFormat="yyyy-MM-dd"
                      value={data.course_date}
                      onChange={handleInput}
                      label="Course Date"
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
              </div>

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
                  <th style={{ padding: "20px 20px 20px 0" }}>schedule_id</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>course_id</th>
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
                      {val.schedule_id}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_id}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {formattedDate(val.course_date)}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Schedule;
