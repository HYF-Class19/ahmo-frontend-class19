import { createTheme } from '@mui/material/styles';

export const CustomTheme = createTheme({
    palette: {
      primary: {
        light: '#484153',
        main: '#120428',
        dark: '#1A1E28'
      },
      secondary: {
        main: '#23B1D0',
        light: '#F3FB8C',
        dark: '#810984',
        contrastText: '#FFFFFF'
      },
      warning: {
        main: '#FFC700'
      },
      success: {
        main: '#08EA62'
      }
    },
  })