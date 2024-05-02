import React from "react";
import { format } from "date-fns";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import Container from "@mui/material/Container";
import theme from "../../components/color";
import { useState, useEffect } from "react";
import CardCheckbox from "../../components/CardCheckbox";
import { ThemeProvider, styled } from "@mui/material/styles";
import {
  InputAdornment,
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { Form, useParams, useNavigate, Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { colors } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useCheckLogin from "../../hooks/useCheckLogin";
import useLogout from "../../hooks/useLogout";
import useUserStore from "../../store/useUserStore";
import useStoreOrder from "../../store/useStoreOrder";
import { green, red } from "@mui/material/colors";

const Checkout = () => {
  const { userData, fetchUserData } = useUserStore();
  const [data, setData] = useState([]);
  const { sortOrder, setSortOrder } = useStoreOrder();

  const navigate = useNavigate();
  const { isLoggedIn } = useCheckLogin();
  const { handleLogout } = useLogout();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token, navigate);
    }
  }, [fetchUserData, navigate]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (userData.id) {
          const response = await axios.get(
            `https://localhost:7175/api/Checkout/GetAllByUserId?user_id=${userData.id}&sortOrder=${sortOrder}`
          );
          setData(response.data[0].checkout_detail);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
        // Handle error, such as displaying an error message or retrying the request
      }
    };

    fetchCartData();
  }, [userData, sortOrder]);

  // Checkbox
  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    if (data.length > 0) {
      const initialCheckedItems = {};
      data.forEach((item, index) => {
        initialCheckedItems[index] = item.checklist;
      });
      setCheckedItems(initialCheckedItems);
    }
  }, [data]);

  const totalHarga = data.reduce((total, item) => {
    if (!isNaN(item.price)) {
      return total + parseFloat(item.price);
    }
    return total;
  }, 0);

  const handleCheckAll = () => {
    const allChecked = Object.values(checkedItems).every(
      (isChecked) => isChecked
    );

    // Jika semua item sudah dicentang, set semua item menjadi tidak dicentang (false)
    if (allChecked) {
      const newCheckedItems = {};
      data.forEach((item, index) => {
        newCheckedItems[index] = false;
        updateDetailCheckout(item.detail_checkout_id, false); // Tambahkan pembaruan otomatis ke API
      });
      setCheckedItems(newCheckedItems);
    } else {
      // Jika belum semua item dicentang, set semua item menjadi dicentang (true)
      const newCheckedItems = {};
      data.forEach((item, index) => {
        newCheckedItems[index] = true;
        updateDetailCheckout(item.detail_checkout_id, true); // Tambahkan pembaruan otomatis ke API
      });
      setCheckedItems(newCheckedItems);
    }
  };

  const handleChangeItem = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));

    const item = data[index];
    const isChecked = !checkedItems[index];
    updateDetailCheckout(item.detail_checkout_id, isChecked); // Panggil fungsi pembaruan otomatis ke API
  };

  const updateDetailCheckout = async (detailCheckoutId, isChecked) => {
    try {
      const response = await axios.put(
        `https://localhost:7175/api/Checkout/UpdateDetailCheckout?detail_checkout_id=${detailCheckoutId}`,
        { checklist: isChecked }
      );
      console.log(response.data); // Lakukan sesuatu dengan respons jika perlu
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
  };
  const handleDelete = async (detail_checkout_id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7175/api/Checkout/DeleteDetailCheckout?detail_checkout_id=${detail_checkout_id}`
      );
      console.log(response.data);
      // Tambahkan logika untuk mengupdate state atau komponen setelah penghapusan berhasil
      navigate(0);
    } catch (error) {
      console.error("Error deleting detail checkout:", error);
    }
  };

  // pop up
  const [open, openchange] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const handlePaymentSelect = (payment) => {
    setSelectedPayment(payment);
  };
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
    setSelectedPayment(null);
  };

  useEffect(() => {
    if (sortOrder == "desc") {
      functionopenpopup();
    }
  }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/PaymentMethod/GetAll"
        );
        setPaymentMethods(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <NavbarLogIn handleLogout={handleLogoutClick} />
        ) : (
          <NavbarLogOut />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginTop: "46px",
          }}
        >
          <FormControlLabel
            label="Pilih Semua"
            sx={{ borderBottom: "1px solid", gap: "24px" }}
            control={
              <Checkbox
                style={{
                  border: "none",
                  color: "#00e676",
                }}
                checked={Object.values(checkedItems).every(
                  (isChecked) => isChecked
                )}
                onChange={handleCheckAll}
              />
            }
          />

          <Grid container columnSpacing={1} rowSpacing={5} direction={"column"}>
            {(() => {
              return data.map((item, index) => (
                <Grid
                  key={item.schedule_id}
                  xs={4}
                  sx={{ width: "100%", alignItems: "center" }}
                  display={"flex"}
                  flexDirection={"row"}
                >
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        style={{
                          border: "none",
                          color: "#00e676",
                        }}
                        checked={checkedItems[index] || false}
                        onChange={() => handleChangeItem(index)}
                      />
                    }
                  />
                  <CardCheckbox
                    title={item.category_name}
                    body={item.course_name}
                    image={item.course_image}
                    schedule={format(
                      new Date(item.course_date),
                      "EEEE, d MMMM yyyy"
                    )}
                    price={Intl.NumberFormat("id-ID").format(item.price)}
                  />
                  <IconButton
                    aria-label="delete"
                    sx={{
                      color: "#EB5757",
                    }}
                    onClick={() => handleDelete(item.detail_checkout_id)}
                  >
                    <DeleteForeverIcon sx={{ height: 40, width: 40 }} />
                  </IconButton>
                </Grid>
              ));
            })()}
          </Grid>
        </Box>

        <div
          id="1576"
          className="border-top px-70 py-30 flex items-center justify-sb b-0 l-0 r-0 mt-284 font-montserrat"
        >
          <div id="1574" className="flex flex-row gap-24 items-center">
            <div className="font-400 text-18">Total Price</div>
            <div className="font-600 text-24 text-green">
              IDR {Intl.NumberFormat("id-ID").format(totalHarga)}
            </div>
          </div>
          <div>
            <Button
              onClick={functionopenpopup}
              variant="contained"
              sx={{
                backgroundColor: "green.main",
                padding: "10px 20px",
                width: "233px",
                height: "40px",
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "Montserrat",
                textTransform: "none",
                lineHeight: "19.5",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "green.light",
                },
              }}
            >
              Pay Now
            </Button>

            {/* pop up */}
            <div>
              <Dialog
                open={open}
                onClose={closepopup}
                sx={{
                  padding: "24px 0px 0px 0px",
                  gap: "32px",
                  borderRadius: "10px 0px 0px 0px",
                  opacity: "0px",
                  "& .MuiPaper-root": {
                    overflowY: "hidden",
                  },
                }}
                disableScrollLock
                disableRestoreFocus
              >
                <div className="m-24 gap-24">
                  <DialogTitle
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                      alignItems: "center",
                      fontFamily: "Poppins",
                      fontWeight: "500px",
                      width: "326px",
                      maxHeight: "502px",
                      textAlign: "center",
                    }}
                  >
                    Select Payment Method
                  </DialogTitle>
                  <List
                    sx={{
                      maxHeight: "calc(100vh - 300px)",
                      overflowY: "auto",
                    }}
                  >
                    {paymentMethods.map((method) => (
                      <ListItem
                        key={method.id_payment_method}
                        sx={{
                          padding: 0,
                          height: "40px",
                          mt: "16px",
                          border:
                            selectedPayment === method.id_payment_method
                              ? "1px solid blue"
                              : "none", // Efek border saat item dipilih
                          backgroundColor:
                            selectedPayment === method.id_payment_method
                              ? "lightgray"
                              : "transparent", // Efek warna latar belakang saat item dipilih
                        }}
                      >
                        <ListItemButton
                          onClick={() => handlePaymentSelect(method)}
                          selected={
                            selectedPayment &&
                            selectedPayment.id_payment_method ===
                              method.id_payment_method
                          }
                          sx={{
                            padding: 0,
                            height: 40,
                            "&.Mui-selected": {
                              backgroundColor: "#ffecb3",
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              variant="square"
                              src={method.payment_icon}
                              alt={method.payment_name}
                            />
                          </ListItemAvatar>
                          <ListItemText primary={method.payment_name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </div>
                <div
                  id="frame1515"
                  className="flex flex-row items-center justify-center mb-24"
                >
                  <div>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "yellow.main",
                        padding: "12px 16px 12px 16px",
                        width: "155px",
                        height: "48px",
                        gap: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: "Poppins",
                        textTransform: "none",
                        lineHeight: "24px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "yellow.light",
                        },
                      }}
                      onClick={closepopup}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="ml-16">
                    <Link to="/PurchaseSuccess">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green.main",
                          padding: "12px 16px 12px 16px",
                          width: "155px",
                          height: "48px",
                          gap: "8px",
                          fontSize: "16px",
                          fontWeight: "600",
                          fontFamily: "Poppins",
                          textTransform: "none",
                          lineHeight: "24px",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "green.light",
                          },
                        }}
                      >
                        Pay Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Dialog>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Checkout;
