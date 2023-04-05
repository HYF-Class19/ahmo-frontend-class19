import * as React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

export default function WelcomeText() {
  return (
    <Typography component="div" align="center">

    <Box sx={{
      typography: 'h3',
         fontWeight: 'bold',
         textTransform: 'uppercase',
         fontFamily: 'Quicksand',
         color: '#F3FB8C',
        m: 1
      }}> Welcome to AHMO game chat!</Box>
      
      <Box sx={{ fontWeight: 'medium', fontSize: 'h6', fontFamily: 'Quicksand',color: '#FFFFFF', m: 1 }}>
        Here, you can chat with your friends while enjoying with fun games. We
        hope you have a great time connecting with your buddies and playing
        exciting games together. Do not hesitate to ask for help or reach out to
        our support team if you need any assistance. Enjoy your stay!
      </Box>
      </Typography>
  );
}
