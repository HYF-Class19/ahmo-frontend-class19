import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';


export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("about-us");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500, margin: '0 auto'}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="About Us"
        value="about-us"
        icon={<InfoOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Contact Us"
        value="contact-us"
        icon={<AlternateEmailOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Log In"
        value="log-in"
        icon={<LoginOutlinedIcon />}
      />
      <BottomNavigationAction
        label="Folder"
        value="folder"
        icon={<TextsmsOutlinedIcon />}
      />
    </BottomNavigation>
  );
}
