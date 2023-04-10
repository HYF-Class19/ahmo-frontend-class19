import { createTheme } from '@mui/material/styles';

export const CustomTheme = createTheme({
    palette: {
      primary: {
        light: '484153',
        main: '#120428',
        dark: '#1A1E28'
      },
      secondary: {
        main: '#23B1D0',
      },
      warning: {
        main: '#F3FB8C'
      },
      success: {
        main: '#0C817A'
      }
    },
  })