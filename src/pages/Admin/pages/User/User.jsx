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
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const User = () => {
  const navigate = useNavigate();
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
        const response = await axios.get(
          "https://localhost:7175/api/User/GetAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
      await axios.delete(`https://localhost:7175/api/User?id=${userId}`, {
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
          `https://localhost:7175/api/User?id=${editUser.user_id}`,
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
      <div className="flex flex-row">
        <SideMenu />
        <div className="flex flex-col">
          <Header />
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
                    backgroundColor: index % 2 === 0 ? "inherit" : "#EA9E1F33",
                    color: "#4F4F4F",
                  }}
                  className="font-500 text-16 font-montserrat"
                >
                  <td style={{ padding: "20px 20px 20px 0" }}>
                    {user.user_id}
                  </td>
                  <td style={{ padding: "20px 20px 20px 0" }}>{user.email}</td>
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
            <TextField
              label="Role"
              fullWidth
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
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
    </>
  );
};

export default User;
