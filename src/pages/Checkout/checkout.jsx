import React from "react";
import { format } from "date-fns";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import Container from "@mui/material/Container";
import theme from "../../components/color";
import { useState, useEffect } from "react";
import CardCheckbox from "../../components/CardCheckbox";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { Form, useParams, useNavigate, Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";

import Gopay from "../../assets/gopay.png";
import Ovo from "../../assets/ovo.png";
import Dana from "../../assets/dana.png";
import Mandiri from "../../assets/mandiri.png";
import Bca from "../../assets/bca.png";
import Bni from "../../assets/bni.png";

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
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };

  useEffect(() => {
    if (sortOrder == "desc") {
      functionopenpopup();
    }
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
            <Dialog
              // fullScreen
              open={open}
              onClose={closepopup}
              fullWidth
              maxWidth="xs"
            >
              <DialogTitle
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontFamily: "Poppins",
                }}
              >
                Select Payment Method
              </DialogTitle>
              <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  gap: "16px",
                  fontFamily: "Poppins",
                }}
              >
                <DialogContentText>
                  <div
                    className="flex items-center gap-16 text-18 font-500"
                    style={{ color: "#41454D" }}
                  >
                    <img src={Gopay} alt="" />
                    Gopay
                  </div>
                </DialogContentText>
                <DialogContentText>
                  <div
                    className="flex items-center gap-16 text-18 font-500"
                    style={{ color: "#41454D" }}
                  >
                    <img src={Ovo} alt="" />
                    Ovo
                  </div>
                </DialogContentText>
                <DialogContentText>
                  <div
                    className="flex items-center gap-16 text-18 font-500"
                    style={{ color: "#41454D" }}
                  >
                    <img src={Dana} alt="" />
                    Dana
                  </div>
                </DialogContentText>
                <DialogContentText>
                  <div
                    className="flex items-center gap-16 text-18 font-500"
                    style={{ color: "#41454D" }}
                  >
                    <img src={Mandiri} alt="" />
                    Mandiri
                  </div>
                </DialogContentText>
                <DialogContentText>
                  <div
                    className="flex items-center gap-16 text-18 font-500"
                    style={{ color: "#41454D" }}
                  >
                    <img src={Bca} alt="" />
                    Bca
                  </div>
                </DialogContentText>
                <DialogContentText>
                  <div
                    className="flex items-center gap-16 text-18 font-500"
                    style={{ color: "#41454D" }}
                  >
                    <img src={Bni} alt="" />
                    Bni
                  </div>
                </DialogContentText>
              </DialogContent>
              {/* actions */}
              <DialogActions
                style={{
                  alignItems: "center",
                  gap: "16px",
                  fontFamily: "Poppins",
                  justifyContent: "center",
                }}
              >
                <div id="frame1516" className="flex items-center">
                  <div>
                    <Link to="/checkout">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "yellow.main",
                          padding: "12px 16px",
                          width: "155px",
                          height: "48px",
                          fontSize: "16px",
                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          textTransform: "none",
                          lineHeight: "24",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "yellow.light",
                          },
                        }}
                        onClick={closepopup}
                      >
                        Cancle
                      </Button>
                    </Link>
                  </div>
                  <div className="ml-16">
                    <Link to="/PurchaseSuccess">
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "green.main",
                          padding: "12px 16px",
                          width: "155px",
                          height: "48px",
                          fontSize: "16px",
                          fontWeight: "600",
                          fontFamily: "Montserrat",
                          textTransform: "none",
                          lineHeight: "24",
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
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Checkout;
