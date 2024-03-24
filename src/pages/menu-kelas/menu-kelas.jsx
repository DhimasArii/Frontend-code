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

import { useParams } from 'react-router-dom'
import Navbar2 from '../../components/Navbar2';
import Footer from '../../components/Footer';

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
    const [detail, setDetail] = useState([])
    const { id } = useParams();

    const column1 = ["Arabic", "English", "Indonesian", "Mandarin"];
    const column2 = ["Deutsch", "French", "Japanese", "Melayu"];

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos`)
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => response.json())
            .then((json) => setDetail(json));
    }, [id])
    return (
        <Container>
            <ThemeProvider theme={theme}>
                <Navbar2/>

                {/* body */}
                <div className='flex flex-col items-center'>
                    <img src={ImageHeaderKelas} style={{ width: '100%' }} />
                    <div id='frame1736' className='flex flex-col mx-70 gap-16'>
                        <div className='mt-46 text-24 font-600 font-montserrat'>
                            {detail.title}
                        </div>
                        <div className='text-16 font-400 font-montserrat text-black-light'>
                            {detail.body}
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

                    <div id='frame1546' className='flex flex-col items-center mt-80 gap-60 mx-91'>
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

                    <Footer/>
                </div>
            </ThemeProvider>
        </Container>
    )
}

export default Kelas