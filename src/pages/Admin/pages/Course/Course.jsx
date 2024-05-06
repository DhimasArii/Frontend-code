import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Course = () => {
  const [course, setCourse] = useState([]);
  const [data, setData] = useState({
    course_name: "",
    course_description: "",
    course_image: "",
    price: null,
    course_id: "",
    category_id: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/Course/GetAllCourse"
        );
        setCourse(response.data);
      } catch (error) {
        console.error("fatching error:", error);
      }
    };

    fetchCourse();
  }, []);
  console.log(course);

  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // Validasi untuk memastikan bahwa input pada price hanya berisi angka
    if (name === "price") {
      // Menghapus karakter non-digit dari nilai input
      value = value.replace(/\D/g, "");
    }

    setData({
      ...data,
      [name]: value,
    });
  };
  console.log(data);

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7175/api/Course/CreateCourse",
        {
          course_name: data.course_name,
          course_description: data.course_description,
          course_image: data.course_image,
          price: data.price,
          course_id: data.course_id,
          category_id: data.category_id,
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
                    <div className="text-yellow text-36">Course</div>
                  </div>
                  <div className="items-center font-400 font-montserrat text-16 text-gray">
                    add course data
                  </div>
                </div>

                <div className="flex items-center flex-col gap-24">
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
                      name="course_id"
                      value={data.category_id}
                      onChange={handleInput}
                      label="Category Id"
                      variant="outlined"
                      size="small"
                    />
                  </div>
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
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="course_description"
                      value={data.course_description}
                      onChange={handleInput}
                      label="Course Description"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="course_image"
                      value={data.course_image}
                      onChange={handleInput}
                      label="Category Image URL"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="price"
                      value={data.price}
                      onChange={handleInput}
                      label="Price"
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
                  <th style={{ padding: "20px 20px 20px 0" }}>course_id</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>category_id</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>course_name</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>
                    course_description
                  </th>
                  <th style={{ padding: "20px 20px 20px 0" }}>course_image</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>price</th>
                </tr>
                {course.map((val, key) => (
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
                      {val.course_id}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.category_id}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_name}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_description}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_image}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>{val.price}</td>
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

export default Course;
