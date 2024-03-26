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
import { useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  console.log(data);

  // Checkbox
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
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
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleChange1}
              />
            }
          />
          <FormControlLabel
            sx={{ borderBottom: "1px solid", gap: "24px" }}
            label={data.slice(0, 1).map((item, index) => {
              console.log(index);
              return (
                <Grid key={index} xs={4} maxWidth={350}>
                  <CardCheckbox
                    title={item.title}
                    body={item.title}
                    image={item.url}
                  />
                </Grid>
              );
            })}
            control={
              <Checkbox
                style={{
                  border: "none",
                  color: "#00e676",
                }}
                checked={checked[0]}
                onChange={handleChange2}
              />
            }
          />
          {/* <img src={Sampah} alt="" style={{ right: "0" }} /> */}
          <FormControlLabel
            sx={{ borderBottom: "1px solid", gap: "24px" }}
            label={data.slice(0, 1).map((item, index) => {
              console.log(index);
              return (
                <Grid key={index} xs={4} maxWidth={350}>
                  <CardCheckbox
                    title={item.title}
                    body={item.title}
                    image={item.url}
                  />
                </Grid>
              );
            })}
            control={
              <Checkbox
                style={{
                  border: "none",
                  color: "#00e676",
                }}
                checked={checked[1]}
                onChange={handleChange3}
              />
            }
          />
        </Box>

        <div
          id="1576"
          className="border-top px-70 py-30 flex items-center justify-sb b-0 l-0 r-0 mt-284 font-montserrat"
        >
          <div id="1574" className="flex flex-row gap-24 items-center">
            <div className="font-400 text-18">Total Price</div>
            <div className="font-600 text-24 text-green">IDR 700.000</div>
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
