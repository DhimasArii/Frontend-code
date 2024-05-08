import "../../components/style.css";
import { Container } from "@mui/material";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import ImageBody from "../../assets/image-body-confirm.png";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../components/color";
import { Link, useNavigate } from "react-router-dom";

const EmailConfirmation = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div className="navbar-email-confirmation">
          <div className="flex items-center">
            <div className="mr-10">
              <img src={ImageNavbar} className="P_image_size" />
            </div>
            <div className="font-400 text-24 font-montserrat P_font_size">
              Language
            </div>
          </div>
        </div>

        <div className="body-email-confirmation">
          <div className="flex flex-col items-center">
            <div>
              <img src={ImageBody} />
            </div>
            <div className="mt-40 text-24 font-500 text-green font-montserrat P_font_size">
              Email Confirmation Success
            </div>
            <div className="mt-8 text-16 text-gray-light font-montserrat P_font_size">
              Thanks for confirmation your email. Please login first
            </div>
            <div className="mt-40">
              <Link to="/login">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "green.main",
                    padding: "16px 20px",
                    width: "133px",
                    height: "50px",
                    fontSize: "15px",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                    lineHeight: "1",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "green.light",
                    },
                  }}
                >
                  Login Here
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default EmailConfirmation;
