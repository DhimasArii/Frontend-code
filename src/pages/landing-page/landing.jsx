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
import Phone from "../../assets/phone.png";
import Instagram from "../../assets/instagram.png";
import Youtube from "../../assets/youtube.png";
import Telegram from "../../assets/telegram.png";
import Email from "../../assets/email.png";
import { Outlet, Link, useNavigate } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Landing = () => {
    const [state, setState] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();


    const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
    const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then((response) => response.json())
            .then((json) => setData(json));
    }, []);
    return (
        <Container>
            <ThemeProvider theme={theme}>
                {/* navbar */}
                <div
                    id="frame1517"
                    className="flex items-center justify-sb t-0 l-0 r-0 padding-nv"
                >
                    <div id="frame1518" className="flex items-center py-10 pl-10">
                        <div id="frame1738" className="flex items-center">
                            <div className="mr-10-5">
                                <img src={ImageNavbar} alt="" />
                            </div>
                            <div className="font-400 text-24 font-montserrat">Language</div>
                        </div>
                    </div>
                    <div id="frame1516" className="flex items-center">
                        <div>
                            <Link to="/login">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "green.main",
                                        padding: "10px 20px",
                                        width: "86px",
                                        height: "40px",
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
                                    Login
                                </Button>
                            </Link>
                        </div>
                        <div className="ml-16">
                            <Link to="/login">
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "yellow.main",
                                        padding: "10px 20px",
                                        width: "105px",
                                        height: "40px",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        fontFamily: "Montserrat",
                                        textTransform: "none",
                                        lineHeight: "1",
                                        borderRadius: "8px",
                                        "&:hover": {
                                            backgroundColor: "yellow.light",
                                        },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

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
                                    {data.slice(0, 6).map((item, index) => {
                                        console.log(index);
                                        return (
                                            <Grid key={index} xs={4} maxWidth={350}>
                                                <Item>

                                                    <CardComponent
                                                        title={item.title}
                                                        body={item.title}
                                                        image={item.url}
                                                    />
                                                </Item>
                                            </Grid>
                                        );
                                    })}
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
                                    {data.slice(0, 8).map((item, index) => {
                                        console.log(index);
                                        return (
                                            <Grid key={index} xs={3} maxWidth={350}>
                                                <Item>
                                                    <Link to={`/menu-kelas/${item.id}`} preventScrollReset={false}>
                                                        <CardFlag body={item.title} image={item.url} />
                                                    </Link>
                                                </Item>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div>
                        <footer
                            className="footer flex flex-row mt-144 px-95 py-24 bg-green text-white gap-80 font-poppins text-justify"
                            style={{
                                borderBottomLeftRadius: 20,
                                borderBottomRightRadius: 20,
                            }}
                        >
                            <div className="aboutUsContainer gap-8">
                                <h3 className="font-500 text-16">About Us</h3>
                                <p className="font-400 text-14">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudantium, totam rem aperiam, eaque
                                    ipsa quae ab illo inventore veritatis et quasi architecto
                                    beatae vitae dicta sunt explicabo.{" "}
                                </p>
                            </div>
                            <div className="productContainer">
                                <h3 className="font-500 text-16">Product</h3>
                                <div
                                    style={{ display: "flex", marginTop: -20 }}
                                    className="font-400 text-14"
                                >
                                    <ul className="column">
                                        {column1.map((item, index) => (
                                            <li style={{ margin: 5 }} key={index}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="column">
                                        {column2.map((item, index) => (
                                            <li style={{ margin: 5 }} key={index}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="addresContactContainer">
                                <div className="address">
                                    <h3 className="font-500 text-16">Address</h3>
                                    <p className="font-400 text-14">
                                        Sed ut perspiciatis unde omnis iste natus error sit
                                        voluptatem accusantium doloremque.
                                    </p>
                                </div>
                                <div className="contactUs">
                                    <h3 className="font-500 text-16">Contact Us</h3>
                                    <div style={{ display: "flex" }} className="gap-16">
                                        <img src={Phone} alt="Phone" />
                                        <img src={Instagram} alt="Phone" />
                                        <img src={Youtube} alt="Phone" />
                                        <img src={Telegram} alt="Phone" />
                                        <img src={Email} alt="Phone" />
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </ThemeProvider>
        </Container>
    );
};

export default Landing;
