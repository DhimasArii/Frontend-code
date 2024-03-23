import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      yellow: {
        main: '#EA9E1F',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
      green: {
        main: '#226957',
        light: '#4CCD99',
      }
    },
  });

export default theme