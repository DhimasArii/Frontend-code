import React, { useEffect } from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import useLogout from "../../../hooks/useLogout";

const SideMenu = () => {
  const { userData, fetchUserData } = useUserStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
    navigate(0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, navigate);
    }
    console.log(userData);
  }, [fetchUserData, navigate]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItemButton component={Link} to="/admin/user">
          <ListItemText primary="User" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/category">
          <ListItemText primary="Category" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/course">
          <ListItemText primary="Course" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/user-invoice">
          <ListItemText primary="Invoice" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/payment-method">
          <ListItemText primary="PaymentMethod" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/schedule">
          <ListItemText primary="Schedule" />
        </ListItemButton>

        {userData ? (
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <>
            <ListItemButton component={Link} to="/admin/login">
              <ListItemText primary="Login" />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default SideMenu;
