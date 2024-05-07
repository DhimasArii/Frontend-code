import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import "../../components/style.css";
import ImageNavbar from "../../assets/image-navbar-confirm.png";
import { ThemeProvider, styled } from "@mui/material/styles";
import { InputAdornment, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import theme from "../../components/color";
import CardComponent from "../../components/CardComponents";
import CardFlag from "../../components/CardFlag";
import gambar1 from "../../assets/g1.png";
import { Outlet, Link, useNavigate } from "react-router-dom";
import NavbarLogIn from "../../components/Navbar2";
import NavbarLogOut from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";
import useCheckLogin from "../../hooks/useCheckLogin";
import useLogout from "../../hooks/useLogout";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Landing = () => {
  const { isLoggedIn } = useCheckLogin();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/Course/GetAllCourse"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7175/api/Category/GetAll"
        );
        setCategory(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchCategories();
  }, []);

  console.log(data);
  console.log(category);

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate(0);
  };

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <NavbarLogIn handleLogout={handleLogoutClick} />
        ) : (
          <NavbarLogOut />
        )}

        {/* body */}
        <div className="flex flex-col items-center w-100">
          <div id="header-image" className="flex justify-center bg-header">
            <div
              id="frame1552"
              className="flex flex-col item-center px-141 pb-72"
            >
              <div className="item-center text-white font-600 font-montserrat text-32 text-center pt-59 P_font_size">
                Learn different languages ​​to hone <br /> your communication
                skills
              </div>
              <div className="item-center text-white text-center font-400 font-montserrat text-24 pt-27 P_font_size">
                All the languages ​​you are looking for are available here, so
                what are you waiting for and immediately improve your language
                skills
              </div>
            </div>
          </div>

          <div id="frame1551" className="flex flex-row mt-46 px-114 h-207">
            <div
              id="frame1548"
              className="flex flex-basis flex-col items-center p-16 gap-31"
            >
              <div className="text-green font-600 font-montserrat text-48 P_font_size1">
                100+
              </div>
              <div className="font-500 font-montserrat text-16 text-center lh-19 P_font_size">
                Choose the class you like and get the skills
              </div>
            </div>
            <div
              id="frame1549"
              className="flex flex-basis flex-col items-center p-16 gap-31"
            >
              <div className="text-green font-600 font-montserrat text-48 P_font_size1">
                50+
              </div>
              <div className="font-500 font-montserrat text-16 text-center lh-19 P_font_size">
                Having teachers who are highly skilled and competent in the
                language
              </div>
            </div>
            <div
              id="frame1550"
              className="flex flex-basis flex-col items-center p-16 gap-31"
            >
              <div className="text-green font-600 font-montserrat text-48 P_font_size1">
                10+
              </div>
              <div className="font-500 font-montserrat text-16 text-center lh-19 P_font_size">
                Many alumni become ministry employees because of their excellent
                language skills
              </div>
            </div>
          </div>

          <div id="1546" className="flex flex-col items-center mt-70 px-91">
            <div className="text-green font-600 font-montserrat text-24 P_font_size">
              Recommended Class
            </div>
            <div id="frame1545" className="flex items-center mt-60">
              <div>
                <Grid
                  container
                  columnSpacing={2}
                  rowSpacing={5}
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {data.slice(0, 6).map((item, index) => (
                    <Grid
                      key={index}
                      xs={16}
                      sm={8}
                      md={6}
                      lg={5}
                      xl={4}
                      style={{ marginBottom: "10px" }}
                    >
                      <Link
                        to={`/detail-kelas/${item.course_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <CardComponent
                          title={item.category_name}
                          body={item.course_name}
                          image={item.course_image}
                          price={Intl.NumberFormat("id-ID").format(item.price)}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>

          <div id="rectangle" className="flex justify-center bg-box mt-124">
            <div
              id="frame1536"
              className="flex flex-col items-center px-102 pt-65 pb-58"
            >
              <div
                id="1535"
                className="flex flex-row gap-24 P_flex_warp P_gap_8"
              >
                <div id="1547" className="flex flex-col gap-24 h-280">
                  <div className="text-white font-600 font-montserrat text-32 P_font_size1">
                    Gets your best benefit
                  </div>
                  <div className="text-justify text-white font-500 font-montserrat text-16 P_font_size">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem.
                  </div>
                </div>
                <div>
                  <img src={gambar1} alt="" className="P_image_size1" />
                </div>
              </div>
            </div>
          </div>

          <div id="1534" className="flex flex-col items-center gap-60 mt-122">
            <div className="text-green font-600 font-montserrat text-24 P_font_size">
              Available Language Course
            </div>
            <div id="frame1545" className="flex flex-basis items-center">
              <div>
                <Grid
                  container
                  columnSpacing={2}
                  rowSpacing={5}
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {category.slice(0, 8).map((item, index) => (
                    <Grid
                      key={index}
                      xs={14}
                      sm={7}
                      md={5}
                      lg={4}
                      xl={3}
                      style={{ marginBottom: "10px" }}
                    >
                      <Link
                        to={`/menu-kelas/${item.category_id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <CardFlag
                          body={item.category_name}
                          image={item.category_image}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </ThemeProvider>
    </Container>
  );
};

export default Landing;
