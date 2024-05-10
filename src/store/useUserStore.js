import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_URL_API;
const useUserStore = create((set) => ({
  userData: null,
  fetchUserData: async (token, navigate) => {
    try {
      const response = await axios.get(`${api}/api/User/GetUserData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ userData: response.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error, such as redirecting to login page or displaying an error message
      if (error.response && error.response.status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        localStorage.removeItem("token"); // Hapus token dari localStorage
        navigate("/login"); // Redirect ke halaman login
      } else {
        // Handle other errors, such as displaying an error message
      }
    }
  },
}));

export default useUserStore;
