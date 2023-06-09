import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ConstructionOutlined } from "@mui/icons-material";
import { Container } from "@mui/material";

export default function WelcomeText() {
  return (
    <Container >
    <Typography component="div" align="center">
      <Box
        sx={{
          typography: "h3",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: "Quicksand",
          color: "secondary.light",
          p: 2,
        }}
      >
        {" "}
        Welcome to AHMO game chat!
      </Box>

      <Box
        sx={{
          fontWeight: "medium",
          fontSize: "h6",
          fontFamily: "Quicksand",
          color: "secondary.contrastText",
          m: 3,
        }}
      >
        Here, you can chat with your friends while enjoying with fun games. We
        hope you have a great time connecting with your buddies and playing
        exciting games together. Do not hesitate to ask for help or reach out to
        our support team if you need any assistance. Enjoy your stay!
      </Box>
     
      <Box
        sx={{
          color: "secondary.main",
          textTransform: "uppercase",
          fontWeight: "bold",
          m: 5,
        }}
      >
        Choose your Chat Below
      </Box>
    </Typography>
    </Container>
  );
}
