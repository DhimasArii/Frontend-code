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
  const api = import.meta.env.VITE_URL_API;
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
        const response = await axios.get(`${api}/api/Invoice/GetAll`);
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
            `${api}/api/Invoice/GetAllByInvoiceId?invoice_id=${selectedInvoiceId}`
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
            <table
              className=""
              style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
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
                <th style={{ padding: "20px 20px 20px 0", width: "300px" }}>
                  Invoice ID
                </th>
                <th style={{ padding: "20px 20px 20px 0", width: "100px" }}>
                  Date
                </th>
                <th style={{ padding: "20px 20px 20px 0", width: "100px" }}>
                  Total Courses
                </th>
                <th style={{ padding: "20px 20px 20px 0", width: "100px" }}>
                  Total Price
                </th>
              </tr>
              {invoices
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((invoice, index) => (
                  <tr
                    key={invoice.invoice_id}
                    style={{
                      textAlign: "center",
                      backgroundColor:
                        index % 2 === 0 ? "inherit" : "#EA9E1F33",
                      color: "#4F4F4F",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    className="font-500 text-16 font-montserrat"
                    onClick={() => handleShowDetailInvoice(invoice.invoice_id)}
                  >
                    <td
                      style={{
                        padding: "20px 20px 20px 0",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      {invoice.invoice_id}
                    </td>
                    <td
                      style={{
                        padding: "20px 20px 20px 0",
                        textAlign: "center",
                      }}
                    >
                      {invoice.invoice_date}
                    </td>
                    <td
                      style={{
                        padding: "20px 20px 20px 0",
                        textAlign: "center",
                      }}
                    >
                      {invoice.total_course}
                    </td>
                    <td
                      style={{
                        padding: "20px 20px 20px 0",
                        textAlign: "center",
                      }}
                    >
                      {invoice.total_price}
                    </td>
                  </tr>
                ))}
            </table>
          </div>
          <TablePagination
            rowsPerPageOptions={[2, 5]}
            component="div"
            count={invoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Detail Invoice Table */}
          {selectedInvoiceId && (
            <div>
              <h2>Detail Invoice for ID: {selectedInvoiceId}</h2>
              <table
                style={{
                  width: "100%",
                  maxWidth: "1200px",
                  margin: "0 auto",
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
                  <th style={{ padding: "20px 20px 20px 0", width: "10px" }}>
                    No.
                  </th>
                  <th style={{ padding: "20px 20px 20px 0", width: "250px" }}>
                    Course Name
                  </th>
                  <th style={{ padding: "20px 20px 20px 0", width: "30px" }}>
                    Language
                  </th>
                  <th style={{ padding: "20px 20px 20px 0", width: "150px" }}>
                    Schedule
                  </th>
                  <th style={{ padding: "20px 20px 20px 0" }}>Price</th>
                </tr>
                {detailInvoice.detail_Invoices &&
                  detailInvoice.detail_Invoices.map((item, index) => (
                    <tr
                      key={item.course_id}
                      style={{
                        textAlign: "center",
                        backgroundColor:
                          index % 2 === 0 ? "inherit" : "#EA9E1F33",
                        color: "#4F4F4F",
                      }}
                      className="font-500 text-16 font-montserrat"
                    >
                      <td
                        style={{
                          padding: "20px 20px 20px 0",
                          textAlign: "center",
                        }}
                      >
                        {index + 1}
                      </td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {item.course_name}
                      </td>
                      <td style={{ padding: "20px 20px 20px 0" }}>
                        {item.category_name}
                      </td>
                      <td
                        style={{
                          padding: "20px 20px 20px 0",
                          textAlign: "center",
                        }}
                      >
                        {item.course_date}
                      </td>
                      <td
                        style={{
                          padding: "20px 20px 20px 0",
                          textAlign: "center",
                        }}
                      >
                        {item.course_price}
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          )}
          {/* End Detail Invoice Table */}
        </div>
      </div>
    </>
  );
};

export default UserInvoice;
