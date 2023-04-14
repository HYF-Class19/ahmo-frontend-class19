import { Avatar, Box, Container, CssBaseline } from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./loginRegister.module.scss";

interface formWrapperProps {
  children: React.ReactNode;
  mode: "login" | "register";
}
const FormWrapper: React.FC<formWrapperProps> = ({ children, mode }) => {
  return (
    <Container component="main" maxWidth="xs" className="hello">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, mt: 5, width: 150, height: 150 }}>
          <Image
            src="/ahmo-logo.png"
            alt="logo"
            width={150}
            height={150}
            className={styles.lrlogo}
          />
        </Avatar>
      </Box>
      {children}
    </Container>
  );
};

export default FormWrapper;
