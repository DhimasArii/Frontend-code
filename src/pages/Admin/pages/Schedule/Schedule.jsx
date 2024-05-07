import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { parseISO } from "date-fns";
import { formatInTimeZone, toDate, toZonedTime, format } from "date-fns-tz";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { id } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Schedule = () => {
  const api = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [dataCourse, setCourse] = useState([]);
  const [data, setData] = useState({
    course_id: "",
    course_date: "",
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`${api}/api/Schedule/GetAll`);
        setSchedule(response.data);
      } catch (error) {
        console.error("fetching error:", error);
      }
    };

    fetchSchedule();

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${api}/api/Course/GetAllCourse`);
        setCourse(response.data);
      } catch (error) {
        console.error("fatching error:", error);
      }
    };

    fetchCourse();
  }, []);
  console.log(schedule);

  //format tgl
  const formattedDate = (courseDate) =>
    courseDate ? format(new Date(courseDate), "EEEE, dd MMMM yyyy") : "";

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${api}/api/Schedule/CreateSchedule`,
        {
          course_id: data.course_id,
          course_date: data.course_date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert("Data telah terkirim");
      navigate(0);
    } catch (error) {
      console.error("fatching error: ", error);
      alert("Data gagal terkirim!");
    }
  };

  //edit & delete
  const [getall, setGetall] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [editSchedule, setEditSchedule] = useState(null);
  const [formData, setFormData] = useState({
    schedule_id: "",
    course_id: "",
    course_date: "",
  });

  const handleDeleteSchedule = async (scheduleId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/api/Schedule/${scheduleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleOpenPopup = (schedules) => {
    setEditSchedule(schedules);

    const inputDate = schedules?.course_date;
    const parsedDate = toDate(inputDate, { timeZone: "Asia/Bangkok" });
    const bangkokDate = toZonedTime(parsedDate, "Asia/Bangkok");
    const formattedDate = format(bangkokDate, "yyyy-MM-dd", {
      timeZone: "Asia/Bangkok",
    });

    setFormData({
      schedule_id: schedules?.schedule_id || "",
      course_id: schedules?.course_id || "",
      course_date: formattedDate || "",
    });
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditSchedule(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      if (editSchedule) {
        await axios.put(
          `${api}/api/Schedule/${editSchedule.schedule_id}`,
          {
            course_id: formData.course_id,
            course_date: formData.course_date,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      handleClosePopup();
      navigate(0);
    } catch (error) {
      console.error("Error saving schedule:", error);
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
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="course-label">course</InputLabel>
                      <Select
                        fullWidth
                        name="course_id"
                        value={data.course_id}
                        onChange={handleInput}
                        labelId="course-label"
                        label="course"
                        size="small"
                      >
                        {dataCourse.map((course) => (
                          <MenuItem
                            key={course.course_id}
                            value={course.course_id}
                          >
                            {course.course_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="w-100">
                    <LocalizationProvider
                      dateAdapter={AdapterDateFns}
                      adapterLocale={id}
                    >
                      <DatePicker
                        label="Date"
                        fullWidth
                        name="course_date"
                        value={
                          data.course_date
                            ? toDate(data.course_date, {
                                timeZone: "Asia/Jakarta",
                              })
                            : null
                        }
                        onChange={(newValue) =>
                          setData((prevData) => ({
                            ...prevData,
                            course_date: newValue
                              ? format(
                                  toZonedTime(newValue, "Asia/Jakarta"),
                                  "yyyy-MM-dd",
                                  { timeZone: "Asia/Jakarta" }
                                )
                              : null,
                          }))
                        }
                        sx={{ mb: 2 }}
                      />
                    </LocalizationProvider>
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
                  <th></th>
                  <th></th>
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
                    <td>
                      <IconButton
                        variant="contained"
                        onClick={() => handleOpenPopup(val)}
                      >
                        <EditIcon />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteSchedule(val.schedule_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
        {/* Dialog Pop Up */}
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>
            {editSchedule ? "Edit Schedule" : "Add Schedule"}
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="schedule id"
                fullWidth
                name="schedule_id"
                value={formData.schedule_id}
                disabled={!!editSchedule}
                onChange={handleInputChange}
                sx={{ mb: 2, mt: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="course-label">course</InputLabel>
                <Select
                  fullWidth
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleInput}
                  labelId="course-label"
                  label="course"
                  size="small"
                >
                  {dataCourse.map((course) => (
                    <MenuItem key={course.course_id} value={course.course_id}>
                      {course.course_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={id}
              >
                <DatePicker
                  label="Date"
                  fullWidth
                  name="course_date"
                  value={
                    formData.course_date
                      ? toDate(formData.course_date, {
                          timeZone: "Asia/Jakarta",
                        })
                      : null
                  }
                  onChange={(newValue) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      course_date: newValue
                        ? format(
                            toZonedTime(newValue, "Asia/Jakarta"),
                            "yyyy-MM-dd",
                            { timeZone: "Asia/Jakarta" }
                          )
                        : null,
                    }))
                  }
                  sx={{ mb: 2 }}
                />
              </LocalizationProvider>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveSchedule} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* End of Dialog Pop Up */}
      </ThemeProvider>
    </>
  );
};

export default Schedule;
