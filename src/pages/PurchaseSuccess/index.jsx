import "../../components/style.css";
import { Container } from "@mui/material";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import ImageBody from "../../assets/image-body-confirm.png";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../components/color";
import { Link, useNavigate } from "react-router-dom";
import Arrow from "../../assets/arrow_forward.png";
import Home from "../../assets/home.png";

const index = () => {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div className="navbar-email-confirmation">
          <div className="flex items-center">
            <div className="mr-10">
              <img src={ImageNavbar} />
            </div>
            <div className="font-400 text-24 font-montserrat">Language</div>
          </div>
        </div>

        <div className="body-email-confirmation">
          <div className="flex flex-col items-center">
            <div>
              <img src={ImageBody} />
            </div>
            <div className="mt-40 text-24 font-500 text-green font-montserrat">
              Purchase Successfully
            </div>
            <div className="mt-8 text-16 text-gray-light font-montserrat">
              Thanks to buy a course! See u in the class
            </div>
            <div className="mt-40 flex flex-row gap-16">
              <Link to="/">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "yellow.main",
                    padding: "16px 24px",
                    width: "185px",
                    height: "50px",
                    fontSize: "15px",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                    lineHeight: "1",
                    borderRadius: "6px",
                    "&:hover": {
                      backgroundColor: "yellow.light",
                    },
                  }}
                  startIcon={<img src={Home} alt="arrow" />}
                >
                  Back to Home
                </Button>
              </Link>
              <Link to="/invoice">
                <Button
                  src={Arrow}
                  variant="contained"
                  sx={{
                    backgroundColor: "green.main",
                    padding: "16px 24px",
                    width: "185px",
                    height: "50px",
                    fontSize: "15px",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                    lineHeight: "1",
                    borderRadius: "6px",
                    "&:hover": {
                      backgroundColor: "green.light",
                    },
                  }}
                  startIcon={<img src={Arrow} alt="arrow" />}
                >
                  Open Invoice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default index;
