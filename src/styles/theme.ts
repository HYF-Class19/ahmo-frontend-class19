import { createTheme } from '@mui/material/styles';

export const CustomTheme = createTheme({
    palette: {
      primary: {
        light: '484153',
        main: '#120428',
        dark: '#1A1E28'
      },
      secondary: {
        main: '#F3FB8C',
        light: '#f7fcac',
        dark: '#dbe096',
        contrastText: '#ffffff'
      },
      warning: {
        main: '#F3FB8C'
      },
      success: {
        main: '#0C817A'
      }
    },
  })