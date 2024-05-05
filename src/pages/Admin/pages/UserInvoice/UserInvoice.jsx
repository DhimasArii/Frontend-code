import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const UserInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);
  const [detailInvoice, setDetailInvoice] = useState([]);
  const [formData, setFormData] = useState({
    invoice_id: "",
    invoice_date: "",
  });
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/Invoice/GetAll"
        );
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchDetailInvoice = async () => {
      if (selectedInvoiceId) {
        try {
          const response = await axios.get(
            `https://localhost:7175/api/Invoice/GetAllByInvoiceId?invoice_id=${selectedInvoiceId}`
          );
          setDetailInvoice(response.data[0]);
          console.log(detailInvoice);
        } catch (error) {
          console.error("Error fetching detail invoice:", error);
        }
      }
    };

    fetchDetailInvoice();
  }, [selectedInvoiceId]);

  const handleEditInvoice = (id) => {
    setOpenEditDialog(true);
    const selectedInvoice = invoices.find(
      (invoice) => invoice.invoice_id === id
    );
    setEditInvoice(selectedInvoice);
    setFormData({
      invoice_id: selectedInvoice?.invoice_id || "",
      invoice_date: new Date(selectedInvoice?.invoice_date),
    });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditInvoice(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveInvoice = async () => {
    try {
      // Implement your save logic here
      handleCloseEditDialog();
      // navigate("/admin/user-invoice"); // Navigate back to the invoice page
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const handleDeleteInvoice = async (id) => {
    try {
      // Implement your delete logic here
      const filteredInvoices = invoices.filter(
        (invoice) => invoice.invoice_id !== id
      );
      setInvoices(filteredInvoices);
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const handleShowDetailInvoice = (id) => {
    setSelectedInvoiceId(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="flex flex-row">
        <SideMenu />
        <div className="flex flex-col">
          <Header />
          <div className="flex items-center">
            <TableContainer component={Paper} sx={{ width: 1000 }}>
              <Table>
                <TableHead sx={{ width: 100 }}>
                  <TableRow>
                    <TableCell sx={{ width: 300, height: 10 }}>
                      Invoice ID
                    </TableCell>
                    <TableCell sx={{ width: 100 }}>Date</TableCell>
                    <TableCell sx={{ width: 100 }}>Total Courses</TableCell>
                    <TableCell sx={{ width: 100 }}>Total Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((invoice) => (
                      <TableRow key={invoice.invoice_id} sx={{ height: 10 }}>
                        <TableCell
                          sx={{ height: 1, cursor: "pointer" }}
                          onClick={() =>
                            handleShowDetailInvoice(invoice.invoice_id)
                          }
                        >
                          {invoice.invoice_id}
                        </TableCell>
                        <TableCell sx={{ height: 10 }}>
                          {invoice.invoice_date}
                        </TableCell>
                        <TableCell sx={{ height: 10 }}>
                          {invoice.total_course}
                        </TableCell>
                        <TableCell sx={{ height: 10, alignItems: "center" }}>
                          {invoice.total_price}
                        </TableCell>
                        <TableCell sx={{ height: 10 }}>
                          <IconButton
                            onClick={() =>
                              handleEditInvoice(invoice.invoice_id)
                            }
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() =>
                              handleDeleteInvoice(invoice.invoice_id)
                            }
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[2, 5]}
                component="div"
                count={invoices.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>

          {/* Detail Invoice Table */}
          {selectedInvoiceId && (
            <div>
              <h2>Detail Invoice for ID: {selectedInvoiceId}</h2>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 10 }}>No.</TableCell>
                      <TableCell sx={{ width: 250 }}>Course Name</TableCell>
                      <TableCell sx={{ width: 30 }}>Language</TableCell>
                      <TableCell sx={{ width: 150 }}>Schedule</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailInvoice.detail_Invoices &&
                      detailInvoice.detail_Invoices.map((item, index) => (
                        <TableRow key={item.course_id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item.course_name}</TableCell>
                          <TableCell>{item.category_name}</TableCell>
                          <TableCell>{item.course_date}</TableCell>
                          <TableCell>{item.course_price}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {/* End Detail Invoice Table */}
        </div>
      </div>

      {/* Edit Invoice Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Invoice</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Invoice ID"
              fullWidth
              name="invoice_id"
              value={formData.invoice_id}
              disabled
              onChange={handleInputChange}
              sx={{ mb: 2, mt: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date"
                fullWidth
                name="invoice_date"
                value={formData.invoice_date}
                onChange={(newValue) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    invoice_date: newValue,
                  }))
                }
                sx={{ mb: 2 }}
              />
            </LocalizationProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveInvoice} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* End Edit Invoice Dialog */}
    </>
  );
};

export default UserInvoice;
