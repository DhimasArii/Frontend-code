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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Landing = ({ isLoggedIn, setIsLoggedIn }) => {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
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
          "https://dummyjson.com/products/categories"
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Handle error, such as displaying an error message to the user
      }
    };

    fetchCategories();
  }, []);

  console.log(data);
  console.log(category);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Lakukan aksi logout, misalnya redirect ke halaman login
    localStorage.removeItem("token");
    navigate("/login");
  };

  const boxes = [
    {
      course_id: 1,
      category_id: 1,
      course_name: "English",
      course_description: "Basic English for Junior",
      price: "400.000",
      course_img: "../images/BasicEnglish.png",
    },
    {
      course_id: 2,
      category_id: 2,
      course_name: "English",
      course_description: "Complit Package - Expert English, TOEFL and IELT",
      price: "2.000.000",
      course_img: "../images/ComplitPackage.png",
    },
    {
      course_id: 3,
      category_id: 3,
      course_name: "Mandarin",
      course_description: "Level 1 Mandarin",
      price: "200.000",
      course_img: "../images/Level1.png",
    },
    {
      course_id: 4,
      category_id: 4,
      course_name: "Arabic",
      course_description: "Arabic Course - Beginner to Middle",
      price: "550.000",
      course_img: "../images/ArabicCourse.png",
    },
    {
      course_id: 5,
      category_id: 5,
      course_name: "Indonesia",
      course_description: "Kursus Bahasa Indonesia",
      price: "650.000",
      course_img: "../images/KursusIndo.png",
    },
    {
      course_id: 6,
      category_id: 6,
      course_name: "Germany",
      course_description: "Germany Language for Junior",
      price: "450.000",
      course_img: "../images/GermanyLanguage.png",
    },
  ];

  const miniBoxes = [
    {
      category_id: 1,
      category_name: "Arabic",
      category_img: "../images/Arabic.png",
    },
    {
      category_id: 2,
      category_name: "Deutsch",
      category_img: "../images/Deutsch.png",
    },
    {
      category_id: 3,
      category_name: "English",
      category_img: "../images/English.png",
    },
    {
      category_id: 4,
      category_name: "French",
      category_img: "../images/French.png",
    },
    {
      category_id: 5,
      category_name: "Indonesia",
      category_img: "../images/Indo.png",
    },
    {
      category_id: 6,
      category_name: "Japanesee",
      category_img: "../images/Japanese.png",
    },
    {
      category_id: 7,
      category_name: "Mandarin",
      category_img: "../images/Mandarin.png",
    },
    {
      category_id: 8,
      category_name: "Melayu",
      category_img: "../images/Melayu.png",
    },
  ];

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {localStorage.getItem("token") ? (
          <NavbarLogIn handleLogout={handleLogout} />
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
              <div className="item-center text-white font-600 font-montserrat text-32 text-center pt-59">
                Learn different languages ​​to hone <br /> your communication
                skills
              </div>
              <div className="item-center text-white text-center font-400 font-montserrat text-24 pt-27">
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
              <div className="text-green font-600 font-montserrat text-48">
                100+
              </div>
              <div className="font-500 font-montserrat text-16 text-center lh-19">
                Choose the class you like and get the skills
              </div>
            </div>
            <div
              id="frame1549"
              className="flex flex-basis flex-col items-center p-16 gap-31"
            >
              <div className="text-green font-600 font-montserrat text-48">
                50+
              </div>
              <div className="font-500 font-montserrat text-16 text-center lh-19">
                Having teachers who are highly skilled and competent in the
                language
              </div>
            </div>
            <div
              id="frame1550"
              className="flex flex-basis flex-col items-center p-16 gap-31"
            >
              <div className="text-green font-600 font-montserrat text-48">
                10+
              </div>
              <div className="font-500 font-montserrat text-16 text-center lh-19">
                Many alumni become ministry employees because of their excellent
                language skills
              </div>
            </div>
          </div>

          <div id="1546" className="flex flex-col items-center mt-70 px-91">
            <div className="text-green font-600 font-montserrat text-24">
              Recommended Class
            </div>
            <div id="frame1545" className="flex flex-basis items-center mt-60">
              <div>
                <Grid container columnSpacing={2} rowSpacing={5}>
                  {boxes
                    .slice(0, 6)
                    .map(
                      ({
                        course_img,
                        course_name,
                        course_description,
                        price,
                      }) => {
                        return (
                          <Grid key={course_img} xs={4} maxWidth={350}>
                            <CardComponent
                              title={course_name}
                              body={course_description}
                              image={course_img}
                              price={price}
                            />
                          </Grid>
                        );
                      }
                    )}
                </Grid>
              </div>
            </div>
          </div>

          <div id="rectangle" className="flex justify-center bg-box mt-124">
            <div
              id="frame1536"
              className="flex flex-col items-center px-102 pt-65 pb-58"
            >
              <div id="1535" className="flex flex-row gap-24">
                <div id="1547" className="flex flex-col gap-24 h-280">
                  <div className="text-white font-600 font-montserrat text-32">
                    Gets your best benefit
                  </div>
                  <div className="text-justify text-white font-500 font-montserrat text-16">
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
                  <img src={gambar1} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div id="1534" className="flex flex-col items-center gap-60 mt-122">
            <div className="text-green font-600 font-montserrat text-24">
              Available Language Course
            </div>
            <div id="frame1545" className="flex flex-basis items-center">
              <div>
                <Grid container columnSpacing={2} rowSpacing={5}>
                  {miniBoxes
                    .slice(0, 8)
                    .map(({ category_name, category_img }) => {
                      return (
                        <Grid key={category_img} xs={3} maxWidth={350}>
                          <CardFlag body={category_name} image={category_img} />
                        </Grid>
                      );
                    })}
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
