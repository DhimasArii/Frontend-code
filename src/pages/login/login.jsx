import React from 'react'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container'
import '../../components/style.css'
import ImageNavbar from "../../assets/image-navbar-confirm.png"
import { ThemeProvider, styled } from '@mui/material/styles';
import { InputAdornment, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import theme from '../../components/color'
import CardComponent from '../../components/CardComponents'

const Login = () => {

  const handleForgotPassword = () => {
    alert('Forgot Password di Klik')
  }

  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setData({
      ...data,
      [name]: value
    })

    //cek valid email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        setError({
          ...error,
          email: 'Email tidak boleh kosong'
        });
      } else if (!emailRegex.test(value)) {
        setError({
          ...error,
          email: 'Format email tidak valid'
        });
      } else {
        setError({
          ...error,
          email: '' // Reset pesan error jika valid
        });
      }
    }

    //cek valid password
    if (name === 'password') {
      if (!value.trim()) {
        setError({
          ...error,
          password: 'Password tidak boleh kosong'
        });
      } else if (value.length < 6) {
        setError({
          ...error,
          password: 'Password minimal 6 karakter'
        });
      } else {
        setError({
          ...error,
          password: '' // Reset pesan error jika valid
        });
      }
    }
  }

  const handleReset = () => {
    setError({
      email: '',
      password: ''
    })
  }

  const handleClick = () => {
    handleReset();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.email.trim() && !data.password.trim()) {
      setError({
        email: 'Email tidak boleh kosong',
        password: 'Password tidak boleh kosong'
      });
    } else if (!data.email.trim()) {
      setError({
        email: 'Email tidak boleh kosong'
      });
    } else if (!emailRegex.test(data.email)) {
      setError({
        email: 'Format email tidak valid'
      });
    } else if (!data.password.trim()) {
      setError({
        password: 'Password tidak boleh kosong'
      });
    } else {
      // Lakukan aksi selanjutnya setelah validasi sukses
      console.log('Form valid,\n Email :',data.email,'\n Password:', data.password);
    }
  }

  return (
    <Container>
      <ThemeProvider theme={theme}>
        {/* navbar */}
        <div className="flex items-center justify-sb t-0 l-0 r-0 padding-nv">
          <div className="flex items-center">
            <div className="mr-10-5">
              <img src={ImageNavbar} alt="" />
            </div>
            <div className="font-400 text-24 font-montserrat">Language</div>
          </div>
          <div className="flex items-center">
            <div>
              <Button variant='contained'
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
                }}>Login</Button>
            </div>
            <div className="ml-16">
              <Button variant='contained'
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
                }}>Sign Up</Button>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="flex items-center flex-col mt-96">
          <div className="flex flex-col gap-16 items-right gap-60">
            <div className="flex flex-col gap-40">
              <div className='flex flex-col gap-16'>
                <div className="mr-429 font-montserrat text-24 text-green">
                  Welcome Back!
                </div>
                <div className='font-400 text-16 font-montserrat'>
                  Please login first
                </div>
              </div>

              <div className="flex items-left flex-col gap-24">
                <div className="w-100">
                  <TextField
                    fullWidth
                    name='email'
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    size="small"
                    color="green"
                    inputProps={{type: "email"}}
                    error={error.email}
                    onChange={handleInput}
                    helperText={error.email}
                  />
                </div>
                <div className="w-100">
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    name='password'
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    size="small"
                    color="green"
                    error={error.password}
                    onChange={handleInput}
                    helperText={error.password}
                  />
                </div>
                <div className='flex flex-row font-400 text-16 font-montserrat'>
                  Forgot Password &nbsp;
                  <a href="">Click Here</a>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-24">
              <div>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "green.main",
                    padding: "10px",
                    width: "140px",
                    height: "38px",
                    fontSize: "15px",
                    fontWeight: "500",
                    fontFamily: "Montserrat",
                    textTransform: "none",
                    lineHeight: "1",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "green.light",
                    },
                  }}
                  onClick={handleClick}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
          <div className='flex items-center mt-40 font-400 text-16 font-montserrat'>
            Dont have account? &nbsp;
            <a href="">Sign Up here</a>
          </div>
        </div>
      </ThemeProvider>
    </Container>
  )
}

export default Login
