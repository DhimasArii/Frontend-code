import React from "react";
import Navbar2 from "../../components/Navbar2";
import Container from "@mui/material/Container";
import theme from "../../components/color";
import { useState, useEffect } from "react";
import CardCheckbox from "../../components/CardCheckbox";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { Form, useParams } from "react-router-dom";
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

const Checkout = () => {
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const { id } = useParams();
  const total = 0;
  const idUser = "";

  useEffect(() => {
    axios
      .get("https://dummyjson.com/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setDataUser(response.data);
        console.log(dataUser);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // useEffect(() => {
  //   console.log(dataUser);
  // }, [dataUser]);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/cart/user/${dataUser.id}`)
      .then((json) => setData(json.data.carts[0].products));
    console.log(data);
  }, [dataUser]);

  // useEffect(() => {
  //   axios.get(`https://dummyjson.com/cart/user/${id}`).then((json) => {
  //     setData(json.data.carts[0]);
  //     console.log(data);
  //   });
  //   console.log(data);
  //   console.log(localStorage.getItem("token"));
  // }, []);

  console.log(data);

  // Checkbox
  const [checkedItems, setCheckedItems] = useState({});
  useEffect(() => {
    if (data.length > 0) {
      const initialCheckedItems = {};
      data.forEach((_, index) => {
        initialCheckedItems[index] = true;
      });
      setCheckedItems(initialCheckedItems);
    }
  }, [data]);

  const handleCheckAll = () => {
    const allChecked = Object.values(checkedItems).every(
      (isChecked) => isChecked
    );

    // Jika semua item sudah dicentang, set semua item menjadi tidak dicentang (false)
    if (allChecked) {
      const newCheckedItems = {};
      data.forEach((item, index) => {
        newCheckedItems[index] = false;
      });
      setCheckedItems(newCheckedItems);
    } else {
      // Jika belum semua item dicentang, set semua item menjadi dicentang (true)
      const newCheckedItems = {};
      data.forEach((item, index) => {
        newCheckedItems[index] = true;
      });
      setCheckedItems(newCheckedItems);
    }
    console.log(checkedItems);
  };
  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);

  const handleChangeItem = (index) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [index]: !prevCheckedItems[index],
    }));
    console.log(checkedItems);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  // pop up
  const [open, openchange] = useState(false);
  const functionopenpopup = () => {
    openchange(true);
  };
  const closepopup = () => {
    openchange(false);
  };
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Navbar2 />
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
                // indeterminate={!checkedAll && checkedItems.some((item) => item)}
                onChange={handleCheckAll}
              />
            }
          />

          {/* <img src={Sampah} alt="" style={{ right: "0" }} /> */}
          <Grid container columnSpacing={1} rowSpacing={5} direction={"column"}>
            {data.map((item, index) => {
              console.log(index);
              return (
                <Grid
                  key={index}
                  xs={4}
                  sx={{ width: "100%" }}
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
                    title={item.title}
                    body={item.title}
                    image={item.thumbnail}
                    price={item.price}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <div
          id="1576"
          className="border-top px-70 py-30 flex items-center justify-sb b-0 l-0 r-0 mt-284 font-montserrat"
        >
          <div id="1574" className="flex flex-row gap-24 items-center">
            <div className="font-400 text-18">Total Price</div>
            <div className="font-600 text-24 text-green">IDR {total}</div>
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
                {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
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
                    >
                      Cancle
                    </Button>
                  </div>
                  <div className="ml-16">
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
