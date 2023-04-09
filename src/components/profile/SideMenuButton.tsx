import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";


interface SideMenuButtonProps {
  showForm: boolean;
  onClick: () => void;
}

const SideMenuButton: React.FC<SideMenuButtonProps> = ({ showForm, onClick }) => {
  return (
      <Button
        variant="contained"
        color="warning"
        onClick={onClick}
        endIcon={showForm ? <LockIcon /> : <EditIcon />}
      >
        {showForm ? "Profile" : "Lock"}
      </Button>
  
  );
};

export default SideMenuButton;
