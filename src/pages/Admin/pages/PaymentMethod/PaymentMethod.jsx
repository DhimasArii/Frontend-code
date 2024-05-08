import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../../../components/color";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const api = import.meta.env.VITE_URL_API;
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [data, setData] = useState({
    payment_name: "",
    payment_status: true,
    payment_description: "",
    payment_icon: "",
  });
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`${api}/api/PaymentMethod/GetAll`);
        setPaymentMethods(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

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
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${api}/api/PaymentMethod`,
        {
          payment_name: data.payment_name,
          payment_status: data.payment_status,
          payment_description: data.payment_description,
          payment_icon: data.payment_icon,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
  const [openPopup, setOpenPopup] = useState(false);
  const [editPayment, setEditPayment] = useState(null);
  const [formData, setFormData] = useState({
    id_payment_method: "",
    payment_name: "",
    payment_description: "",
    payment_icon: "",
    payment_status: false,
  });

  const handleDeletePayment = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${api}/api/PaymentMethod/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(0);
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  const handleOpenPopup = (payment) => {
    setEditPayment(payment);
    setFormData({
      id_payment_method: payment?.id_payment_method || "",
      payment_name: payment?.payment_name || "",
      payment_description: payment?.payment_description || "",
      payment_icon: payment?.payment_icon || "",
      payment_status: payment?.payment_status || false,
    });
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditPayment(null);
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
      if (editPayment) {
        await axios.put(
          `${api}/api/PaymentMethod/${editPayment.id_payment_method}`,
          {
            payment_name: formData.payment_name,
            payment_description: formData.payment_description,
            payment_icon: formData.payment_icon,
            payment_status: formData.payment_status,
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
      console.error("Error saving payment method:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="flex flex-row">
          <SideMenu />
          <Container>
            <div className="flex flex-col">
              <Header />
              <div
                className="flex items-center flex-col gap-60"
                style={{ padding: "20px" }}
              >
                {/* input data */}
                <div className="flex flex-col gap-60">
                  <div className="flex flex-col gap-16">
                    <div className="mr-415 font-montserrat items-center flex font-500 gap-10">
                      <div className="text-yellow text-36">Payment Method</div>
                    </div>
                    <div className="items-center font-400 font-montserrat text-16 text-gray">
                      add payment method data
                    </div>
                  </div>

                  <div className="flex items-center flex-col gap-24">
                    <div className="w-100">
                      <TextField
                        fullWidth
                        name="payment_name"
                        value={data.payment_name}
                        onChange={handleInput}
                        label="payment name"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                    <div className="w-100">
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="payment-label">
                          status active
                        </InputLabel>
                        <Select
                          fullWidth
                          name="payment_status"
                          value={data.payment_status}
                          onChange={handleInput}
                          labelId="payment-label"
                          label="payment"
                          size="small"
                        >
                          <MenuItem value={true}>yes</MenuItem>
                          <MenuItem value={false}>no</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="w-100">
                      <TextField
                        fullWidth
                        name="payment_description"
                        value={data.payment_description}
                        onChange={handleInput}
                        label="payment description"
                        variant="outlined"
                        size="small"
                      />
                    </div>
                    <div className="w-100">
                      <TextField
                        fullWidth
                        name="payment_icon"
                        value={data.payment_icon}
                        onChange={handleInput}
                        label="payment icon"
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
                <div className="flex items-center">
                  <table
                    className=""
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "24px",
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
                      <th style={{ padding: "20px 20px 20px 0" }}>
                        Payment ID
                      </th>
                      <th style={{ padding: "20px 20px 20px 0" }}>Icon</th>
                      <th style={{ padding: "20px 20px 20px 0" }}>Name</th>
                      <th style={{ padding: "20px 20px 20px 0" }}>
                        Description
                      </th>
                      <th style={{ padding: "20px 20px 20px 0" }}>
                        Status Active
                      </th>
                      <th></th>
                      <th></th>
                    </tr>
                    {paymentMethods.map((payment, index) => (
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
                          {payment.id_payment_method}
                        </td>
                        <td style={{ padding: "20px 20px 20px 0" }}>
                          <img
                            src={payment.payment_icon}
                            alt={payment.payment_name}
                            className="h-8 w-8"
                          />
                        </td>
                        <td style={{ padding: "20px 20px 20px 0" }}>
                          {payment.payment_name}
                        </td>
                        <td style={{ padding: "20px 20px 20px 0" }}>
                          {payment.payment_description}
                        </td>
                        <td style={{ padding: "20px 20px 20px 0" }}>
                          {payment.payment_status ? "Yes" : "No"}
                        </td>
                        <td>
                          <IconButton
                            variant="contained"
                            onClick={() => handleOpenPopup(payment)}
                          >
                            <EditIcon />
                          </IconButton>
                        </td>
                        <td>
                          <IconButton
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleDeletePayment(payment.id_payment_method)
                            }
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
          </Container>
        </div>
        {/* Dialog Pop Up */}
        <Dialog open={openPopup} onClose={handleClosePopup}>
          <DialogTitle>
            {editPayment ? "Edit Payment" : "Add Payment"}
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Payment method ID"
                fullWidth
                name="id_payment_method"
                value={formData.id_payment_method}
                disabled={!!editPayment}
                onChange={handleInputChange}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                label="payment name"
                fullWidth
                name="payment_name"
                value={formData.payment_name}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="payment icon"
                fullWidth
                name="payment_icon"
                value={formData.payment_icon}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="payment description"
                fullWidth
                name="payment_description"
                value={formData.payment_description}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="status_active">Status Active</InputLabel>
                <Select
                  value={formData.payment_status}
                  onChange={handleInputChange}
                  name="payment_status"
                  labelId="status_active"
                  fullWidth
                  sx={{ mb: 2 }}
                  label="Status Active"
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

export default PaymentMethod;
