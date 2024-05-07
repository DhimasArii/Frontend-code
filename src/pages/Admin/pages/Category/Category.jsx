import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";
import "../../../../components/style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Category = () => {
  const api = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();
  const [dataCategory, setCategory] = useState([]);
  const [data, setData] = useState({
    category_name: "",
    category_description: "",
    category_image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${api}/api/Category/GetAll`);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fatching data:", error);
      }
    };

    fetchCategories();
  }, []);
  console.log(dataCategory);

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
        `${api}/api/Category/CreateCategory`,
        {
          category_name: data.category_name,
          category_image: data.category_image,
          category_description: data.category_description,
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
  const [editCategory, setEditCategory] = useState(null);
  const [formData, setFormData] = useState({
    category_id: "",
    category_name: "",
    category_description: "",
    category_image: "",
  });

  const handleDeleteCategory = async (categoryId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/api/Category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleOpenPopup = (category) => {
    setEditCategory(category);
    setFormData({
      category_id: category?.category_id || "",
      category_name: category?.category_name || "",
      category_description: category?.category_description || "",
      category_image: category?.category_image || "",
    });
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditCategory(null);
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
      if (editCategory) {
        await axios.put(
          `${api}/api/Category/${editCategory.category_id}`,
          {
            category_name: formData.category_name,
            category_description: formData.category_description,
            category_image: formData.category_image,
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
      console.error("Error saving category:", error);
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
                    <div className="text-yellow text-36">Category</div>
                  </div>
                  <div className="items-center font-400 font-montserrat text-16 text-gray">
                    add category data
                  </div>
                </div>

                <div className="flex items-center flex-col gap-24">
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="category_name"
                      value={data.category_name}
                      onChange={handleInput}
                      label="Category Name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="category_image"
                      value={data.category_image}
                      onChange={handleInput}
                      label="Category Image URL(example : ../images/image.png)"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                  <div className="w-100">
                    <TextField
                      fullWidth
                      name="category_description"
                      value={data.category_description}
                      onChange={handleInput}
                      label="Category Description"
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
                  <th style={{ padding: "20px 20px 20px 0" }}>category_id</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>category_name</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>
                    category_description
                  </th>
                  <th style={{ padding: "20px 20px 20px 0" }}>
                    category_image
                  </th>
                  <th></th>
                  <th></th>
                </tr>
                {dataCategory.map((val, key) => (
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
                      {val.category_id}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.category_name}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {val.category_description}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      <img
                        src={val.category_image}
                        alt={val.category_image}
                        style={{ width: 100 }}
                      />
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
                        onClick={() => handleDeleteCategory(val.category_id)}
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
          <DialogTitle>{editCategory ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="category id"
                fullWidth
                name="category_id"
                value={formData.category_id}
                disabled={!!editCategory}
                onChange={handleInputChange}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                label="category name"
                fullWidth
                name="category_name"
                value={formData.category_name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="category_description"
                fullWidth
                name="category_description"
                value={formData.category_description}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="category_image"
                fullWidth
                name="category_image"
                value={formData.category_image}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
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

export default Category;
