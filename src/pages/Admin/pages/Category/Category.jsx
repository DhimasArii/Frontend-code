import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import TextField from "@mui/material/TextField";
import "../../../../components/style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";
import Button from "@mui/material/Button";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    category_name: "",
    category_description: "",
    category_image: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/Category/GetAll"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fatching data:", error);
      }
    };

    fetchCategories();
  }, []);
  console.log(category);

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
        "https://localhost:7175/api/Category/CreateCategory",
        {
          category_name: data.category_name,
          category_description: data.category_description,
          category_image: data.category_image,
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
                      name="category_description"
                      value={data.category_description}
                      onChange={handleInput}
                      label="Category Description"
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
                      label="Category Image URL"
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
                </tr>
                {category.map((val, key) => (
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
                      {val.category_image}
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

export default Category;
