import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import CustomDrawer from "../CustomDrawer";

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: 2,
          bgcolor: "#120428",
          zIndex: 10,
        }}
      >
        <Image src="/ahmo-logo.png" alt="logo" width={65} height={65} />
        <MenuIcon
          onClick={() => setOpen(true)}
          color="warning"
          sx={{ height: 65, width: 65, cursor: "pointer" }}
        />
      </Box>
      <CustomDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default BurgerMenu;
