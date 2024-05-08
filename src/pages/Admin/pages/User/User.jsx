import React, { useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import theme from "../../../../components/color";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const User = () => {
  const api = import.meta.env.VITE_URL_API;
  //createUser :
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "user",
    showPassword: false,
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    // Validate email
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        setError({
          ...error,
          email: "Email tidak boleh kosong",
        });
      } else if (!emailRegex.test(value)) {
        setError({
          ...error,
          email: "Format email tidak valid",
        });
      } else {
        setError({
          ...error,
          email: "", // Reset error message if valid
        });
      }
    }

    // Validate password
    if (name === "password") {
      if (!value.trim()) {
        setError({
          ...error,
          password: "Password tidak boleh kosong",
        });
      } else if (value.length < 8) {
        setError({
          ...error,
          password: "Password minimal 8 karakter",
        });
      } else {
        setError({
          ...error,
          password: "", // Reset error message if valid
        });
      }
    }
  };

  const handleReset = () => {
    setError({
      email: "",
      password: "",
    });
  };

  const handleClick = async () => {
    handleReset();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim() && !data.password.trim()) {
      setError({
        email: "Email tidak boleh kosong",
        password: "Password tidak boleh kosong",
      });
    } else if (!data.email.trim()) {
      setError({
        email: "Email tidak boleh kosong",
      });
    } else if (!data.password.trim()) {
      setError({
        password: "Password tidak boleh kosong",
      });
    } else if (!emailRegex.test(data.email)) {
      setError({
        email: "Format email tidak valid",
      });
    } else {
      try {
        const response = await axios.post(
          `${api}/api/User/CreateUser`,
          {
            email: data.email,
            passwords: data.password,
            role: data.role || "user", // Set default role if not provided
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        alert("Data telah terkirim \nTolong cek email untuk aktivasi");
      } catch (error) {
        console.error(error);
        alert("Create user gagal!\nSilahkan cek kembali data anda!");
      }
    }
  };

  //edit & delete
  const [getall, setGetall] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    email: "",
    role: "",
    isActivated: false,
  });

  useEffect(() => {
    const fetchGetall = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${api}/api/User/GetAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGetall(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchGetall();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/api/User?id=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenPopup = (user) => {
    setEditUser(user);
    setFormData({
      user_id: user?.user_id || "",
      email: user?.email || "",
      role: user?.role || "",
      isActivated: user?.isActivated || false,
    });
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditUser(null);
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
      if (editUser) {
        await axios.put(
          `${api}/api/User?id=${editUser.user_id}`,
          {
            email: formData.email,
            role: formData.role,
            isActivated: formData.isActivated,
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
      console.error("Error saving user:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex flex-row">
          <SideMenu />
          <div className="flex flex-col">
            <Header />
            {/* body */}
            <div
              className="flex flex-col gap-60"
              style={{ maxWidth: 500, margin: "auto" }}
            >
              <div className="flex flex-col gap-16">
                <div className="mr-415 font-montserrat items-center flex font-500 gap-10">
                  <div className="text-yellow text-36">User</div>
                </div>
                <div className="items-center font-400 font-montserrat text-16 text-gray">
                  add user data
                </div>
              </div>

              <div className="flex items-center flex-col gap-24">
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="email"
                    value={data.email}
                    onChange={handleInput}
                    error={error.email}
                    helperText={error.email}
                    label="Email"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="w-100">
                  <TextField
                    fullWidth
                    name="password"
                    value={data.password}
                    onChange={handleInput}
                    error={error.password}
                    helperText={error.password}
                    type={data.showPassword ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {/* Toggle password visibility icon */}
                            {data.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div className="w-100">
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      fullWidth
                      name="role"
                      value={data.role}
                      onChange={handleInput}
                      labelId="role-label"
                      label="Role"
                      size="small"
                    >
                      <MenuItem value="admin">admin</MenuItem>
                      <MenuItem value="user">user</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="flex items-right flex-row gap-24 mb-72">
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "yellow.main",
                      padding: "10px",
                      width: "140px",
                      height: "38px",
                      mb: 2,
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

            {/* isi tabel */}
            <div className="flex items-center" style={{ margin: "auto" }}>
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
                  <th style={{ padding: "20px 20px 20px 0" }}>User ID</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Email</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Role</th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Is Activated</th>
                  <th></th>
                  <th></th>
                </tr>
                {getall.map((user, index) => (
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
                      {user.user_id}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {user.email}
                    </td>
                    <td style={{ padding: "20px 20px 20px 0" }}>{user.role}</td>
                    <td style={{ padding: "20px 20px 20px 0" }}>
                      {user.isActivated ? "Yes" : "No"}
                    </td>
                    <td>
                      <IconButton
                        variant="contained"
                        onClick={() => handleOpenPopup(user)}
                      >
                        <EditIcon />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user.user_id)}
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
          <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="User ID"
                fullWidth
                name="user_id"
                value={formData.user_id}
                disabled={!!editUser}
                onChange={handleInputChange}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  fullWidth
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  labelId="role-label"
                  label="Role"
                  size="small"
                >
                  <MenuItem value="admin">admin</MenuItem>
                  <MenuItem value="user">user</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Is Activated
                </InputLabel>
                <Select
                  value={formData.isActivated}
                  onChange={handleInputChange}
                  name="isActivated"
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Is Activated"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
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

export default User;
