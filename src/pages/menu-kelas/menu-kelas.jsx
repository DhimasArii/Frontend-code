import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import '../../components/style.css'
import ImageNavbar from "../../assets/image-navbar-confirm.png"
import ImageHeaderKelas from "../../assets/image-header-kelas.png"
import { ThemeProvider, styled } from '@mui/material/styles';
import { InputAdornment, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import theme from '../../components/color'
import CardComponent from '../../components/CardComponents'
import IconShopingCart from '../../assets/icon_shopping_cart.png';
import IconPerson from '../../assets/icon_person.png';
import IconLogout from '../../assets/icon_logout.png';
import Phone from "../../assets/phone.png";
import Instagram from "../../assets/instagram.png";
import Youtube from "../../assets/youtube.png";
import Telegram from "../../assets/telegram.png";
import Email from "../../assets/email.png";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Kelas = () => {
    const [state, setState] = useState(false)
    const [data, setData] = useState([])

    const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
    const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(json => setData(json))
    }, [])
    return (
        <Container>
            <ThemeProvider theme={theme}>
                {/* navbar */}
                <div id='frame1517' className="flex items-center justify-sb t-0 l-0 r-0 padding-nv">
                    <div id='frame1518' className="flex items-center py-10 pl-10">
                        <div id='frame1738' className='flex items-center'>
                            <div className="mr-10-5">
                                <img src={ImageNavbar} alt="" />
                            </div>
                            <div className="font-400 text-24 font-montserrat">Language</div>
                        </div>
                    </div>
                    <div id='frame1516' className="flex items-center gap-40">
                        <img src={IconShopingCart} alt='' />
                        <div className='text-16 font-montserrat text-green'>
                            My Class
                        </div>
                        <div className='text-16 font-montserrat text-green'>
                            Invoice
                        </div>
                        <hr style={{
                            color: '#000000',
                            backgroundColor: '#000000',
                            height: 20,
                            borderColor: '#000000'
                        }} />
                        <img src={IconPerson} alt='' />
                        <img src={IconLogout} alt='' />

                    </div>
                </div>

                {/* body */}
                <div className='flex flex-col items-center'>
                    <img src={ImageHeaderKelas} style={{ width: '100%' }} />
                    <div id='frame1736' className='flex flex-col mx-70 gap-16'>
                        <div className='mt-46 text-24 font-600 font-montserrat'>
                            English
                        </div>
                        <div className='text-16 font-400 font-montserrat text-black-light'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>
                    </div>
                    <hr style={{
                        width: '100vw',
                        height: '1px',
                        borderColor: '#E0E0E0',
                        margin: '80px 0 0 0',
                        borderStyle: 'solid',
                        borderWidth: '1px 0 0 0',
                    }} />

                    <div id='frame1546' className='flex flex-col items-center mt-80 gap-60'>
                        <div className='text-green font-600 font-montserrat text-24'>
                            Class you might like
                        </div>
                        <div>
                            <Grid container columnSpacing={2} rowSpacing={5}>
                                {data.slice(0, 3).map((item, index) => {
                                    console.log(index)
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
                                    )
                                })}
                            </Grid>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div>
                        <footer className="footer flex flex-row mt-205 px-95 py-24 bg-green text-white gap-80 font-poppins text-justify" style={{borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                            <div className="aboutUsContainer gap-8">
                                <h3 className='font-500 text-16'>About Us</h3>
                                <p className='font-400 text-14'>
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                                    ab illo inventore veritatis et quasi architecto beatae vitae dicta
                                    sunt explicabo.{" "}
                                </p>
                            </div>
                            <div className="productContainer">
                                <h3 className='font-500 text-16'>Product</h3>
                                <div style={{ display: "flex", marginTop: -20 }} className='font-400 text-14'>
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
                                    <h3 className='font-500 text-16'>Address</h3>
                                    <p className='font-400 text-14'>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                        accusantium doloremque.
                                    </p>
                                </div>
                                <div className="contactUs">
                                    <h3>Contact Us</h3>
                                    <div style={{ display: "flex" }}>
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
    )
}

export default Kelas