import React from "react";
import { Button } from "@mui/material";
import { Lock, Add } from "@mui/icons-material";

interface SideMenuButtonProps {
  onClick: () => void;
  showForm: boolean;
}

const SideMenuButton: React.FC<SideMenuButtonProps> = ({ onClick, showForm }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      {showForm ? <Add /> : <Lock />}
      {showForm ? "Profile" : "Change Password"}
    </Button>
  );
};

export default SideMenuButton;
