import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { AccountCircle, Mail, Lock, Chat } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      height="60px"
      bgcolor="primary.main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="21px 15px"
      color="white"
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={8}
        color="secondary.main"
        sx={{
          "& > div": {
            "&:hover": {
              color: "secondary.light",
              cursor: "pointer",
            },
          },
        }}
      >
        <Grid item>
          <Box display="flex" alignItems="center">
            <AccountCircle fontSize="small" />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              About Us
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <Mail fontSize="small" />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              Contact Us
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <Lock fontSize="small" />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              Log In
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" alignItems="center">
            <Chat fontSize="small" />
            <Typography variant="body1" style={{ marginLeft: "8px" }}>
              Chats
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
