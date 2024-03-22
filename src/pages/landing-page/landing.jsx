import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import '../../components/style.css'
import ImageNavbar from "../../assets/image-navbar-confirm.png"
import {ThemeProvider,styled } from '@mui/material/styles';
import { InputAdornment, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import theme from '../../components/color'
import CardComponent from '../../components/CardComponents'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Landing = () => {
    const [state, setState] = useState(false)
    const [data, setData] = useState([])

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
                    <div id='frame1516' className="flex items-center">
                        <div>
                            <Button
                                variant='contained'
                                sx={{
                                    backgroundColor: 'green.main',
                                    padding: '10px 20px',
                                    width: '86px',
                                    height: '40px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    fontFamily: 'Montserrat',
                                    textTransform: 'none',
                                    lineHeight: '1',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'green.light',
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </div>
                        <div className="ml-16">
                            <Button
                                variant='contained'
                                sx={{
                                    backgroundColor: 'yellow.main',
                                    padding: '10px 20px',
                                    width: '105px',
                                    height: '40px',
                                    fontSize: '15px',
                                    fontWeight: '600',
                                    fontFamily: 'Montserrat',
                                    textTransform: 'none',
                                    lineHeight: '1',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        backgroundColor: 'yellow.light',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>

                {/* body */}
                <div className='flex flex-col items-center w-100'>
                    <div id='header-image' className='flex justify-center bg-header'>
                        <div id='frame1552' className='flex flex-col item-center px-141 pb-72'>
                            <div className='item-center text-white font-600 font-montserrat text-32 text-center pt-59'>Learn different languages ​​to hone <br /> your communication skills</div>
                            <div className='item-center text-white text-center font-400 font-montserrat text-24 pt-27'>All the languages ​​you are looking for are available here, so what are you waiting for
                                and immediately improve your language skills</div>
                        </div>
                    </div>

                    <div id='frame1551' className='flex flex-row mt-46 px-114 h-207'>
                        <div id='frame1548' className='flex flex-basis flex-col items-center p-16 gap-31'>
                            <div className='text-green font-600 font-montserrat text-48'>
                                100+
                            </div>
                            <div className='font-500 font-montserrat text-16 text-center lh-19'>
                                Choose the class you like and get the skills
                            </div>
                        </div>
                        <div id='frame1549' className='flex flex-basis flex-col items-center p-16 gap-31'>
                            <div className='text-green font-600 font-montserrat text-48'>
                                50+
                            </div>
                            <div className='font-500 font-montserrat text-16 text-center lh-19'>
                                Having teachers who are highly skilled and competent in the language
                            </div>
                        </div>
                        <div id='frame1550' className='flex flex-basis flex-col items-center p-16 gap-31'>
                            <div className='text-green font-600 font-montserrat text-48'>
                                10+
                            </div>
                            <div className='font-500 font-montserrat text-16 text-center lh-19'>
                                Many alumni become ministry employees because of their excellent language skills
                            </div>
                        </div>
                    </div>

                    <div id='1546' className='flex flex-col items-center mt-70 px-91'>
                        <div className='text-green font-600 font-montserrat text-24'>
                            Recommended Class
                        </div>
                        <div id='frame1545' className='flex flex-basis items-center mt-60'>
                            <div>
                                <Grid container columnSpacing={2} rowSpacing={5}>
                                    {data.slice(0, 6).map((item, index) => {
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
                    </div>
                </div>

            </ThemeProvider>
        </Container>

    )
}

export default Landing