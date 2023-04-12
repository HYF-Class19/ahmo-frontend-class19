import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Box } from "@mui/material";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("about-us");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      bgcolor="primary.main"
      
      
    >
      <BottomNavigation
        sx={{
          width: 50,
          margin: "0 auto",
          backgroundColor: "primary.main",
          "& .MuiBottomNavigationAction-label": {
            color: "secondary.main",
          },
          "& .MuiBottomNavigationAction-icon": {
            color: "secondary.light",
          },
          "& .MuiBottomNavigationAction-root": {
            "&.Mui-selected": {
              backgroundColor: "primary.light",
            },
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="About Us"
          value="about-us"
          icon={<InfoOutlinedIcon />}
          sx={{ color: "secondary.light" }}
        />
        <BottomNavigationAction
          label="Contact Us"
          value="contact-us"
          icon={<AlternateEmailOutlinedIcon />}
          sx={{ color: "secondary.light" }}
        />
        <BottomNavigationAction
          label="Log In"
          value="log-in"
          icon={<LoginOutlinedIcon />}
          sx={{ color: "secondary.light" }}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<TextsmsOutlinedIcon />}
          sx={{ color: "secondary.light" }}
        />
      </BottomNavigation>
    </Box>
  );
}
