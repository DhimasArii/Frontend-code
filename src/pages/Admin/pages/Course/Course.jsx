import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { useNavigate } from "react-router-dom";

const Course = () => {
  const api = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();
  const [dataCourse, setCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({
    course_name: "",
    course_description: "",
    course_image: "",
    price: "",
    category_id: "",
    course_status: true,
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${api}/api/Course/GetAllCourse`);
        setCourse(response.data);
      } catch (error) {
        console.error("fatching error:", error);
      }
    };

    fetchCourse();

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/api/Category/GetAll`);
        setCategories(response.data);
        console.log(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  console.log(dataCourse);

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
        `${api}/api/Course/CreateCourse`,
        {
          course_name: data.course_name,
          course_description: data.course_description,
          course_image: data.course_image,
          price: parseInt(data.price),
          category_id: data.category_id,
          course_status: data.course_status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  const [editCourse, setEditCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_id: "",
    course_name: "",
    course_description: "",
    course_image: "",
    price: "",
    category_id: "",
    course_status: false,
  });

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/api/Category/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleOpenPopup = (course) => {
    setEditCourse(course);
    setFormData({
      course_id: course?.course_id || "",
      category_id: course?.category_id || "",
      course_name: course?.course_name || "",
      course_description: course?.course_description || "",
      course_image: course?.course_image || "",
      price: course?.price || "",
      course_status: course?.course_status || false,
    });
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(formData);
      if (editCourse) {
        await axios.put(
          `${api}/api/Course/${formData.course_id}`,
          {
            category_id: formData.category_id,
            course_name: formData.course_name,
            course_description: formData.course_description,
            course_image: formData.course_image,
            price: parseInt(formData.price),
            course_status: formData.course_status,
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
      console.error("Error saving course:", error);
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
                    add dataCourse data
                  </div>
                </div>

                <div className="flex items-center flex-col gap-24">
                  <div className="w-100">
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="category-label">category</InputLabel>
                      <Select
                        fullWidth
                        name="category_id"
                        value={data.category_id}
                        onChange={handleInput}
                        labelId="category-label"
                        label="category"
                        size="small"
                      >
                        {categories.map((cat) => (
                          <MenuItem
                            key={cat.category_id}
                            value={cat.category_id}
                          >
                            {cat.category_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      type="number"
                    />
                  </div>
                  <div className="w-100">
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel id="status-label">status</InputLabel>
                      <Select
                        fullWidth
                        name="course_status"
                        value={data.course_status}
                        onChange={handleInput}
                        labelId="status-label"
                        label="status"
                        size="small"
                      >
                        <MenuItem value={true}>yes</MenuItem>
                        <MenuItem value={false}>no</MenuItem>
                      </Select>
                    </FormControl>
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
                  gap: "10px",
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
                  <th style={{ padding: "20px 20px 20px 0" }}>
                    category_id (name)
                  </th>
                  <th style={{ padding: "20px 20px 20px 0" }}>course_name</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>
                    course_description
                  </th>
                  <th style={{ padding: "20px 20px 20px 0" }}>course_image</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>price</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>status</th>
                  <th></th>
                  <th></th>
                </tr>
                {dataCourse.map((val, key) => (
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
                      {"\n(" + val.category_name + ")"}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_name}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_description}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      <img
                        src={val.course_image}
                        alt={val.course_image}
                        style={{ width: 100 }}
                      />
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>{val.price}</td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.course_status ? "Yes" : "No"}
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
                        onClick={() => handleDeleteCourse(val.category_id)}
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
          <DialogTitle>{editCourse ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="dataCourse id"
                fullWidth
                name="course_id"
                value={formData.course_id}
                disabled={!!editCourse}
                onChange={handleInputChange}
                sx={{ mb: 2, mt: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="course-label">Category</InputLabel>
                <Select
                  fullWidth
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  labelId="course-label"
                  label="Category"
                  size="small"
                >
                  {categories.map((course) => (
                    <MenuItem
                      key={course.category_id}
                      value={course.category_id}
                    >
                      {course.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="course name"
                fullWidth
                name="course_name"
                value={formData.course_name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="course_description"
                fullWidth
                name="course_description"
                value={formData.course_description}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="course_image"
                fullWidth
                name="course_image"
                value={formData.course_image}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="price"
                fullWidth
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="status-label">status</InputLabel>
                <Select
                  fullWidth
                  name="course_status"
                  value={formData.course_status}
                  onChange={handleInputChange}
                  labelId="status-label"
                  label="status"
                  size="small"
                >
                  <MenuItem value={true}>yes</MenuItem>
                  <MenuItem value={false}>no</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveUser} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* End of Dialog Pop Up */}
      </ThemeProvider>
    </>
  );
};

export default Course;
