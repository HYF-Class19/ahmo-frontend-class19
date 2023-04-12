import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import styles from "../styles/Main.module.scss";
import ActionAreaCard from "@/components/shared/home-page/card";
import WelcomeText from "@/components/shared/home-page/welcome-text";
import { Box, Container, createTheme } from "@mui/material";
import Footer from "@/components/shared/home-page/Footer";
import Header from "@/components/shared/home-page/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>AHMO chat</title>
        <meta name="description" content="ahmo gaming chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        
        <Box minHeight="100vh" sx={{ bgcolor: "primary.main" }}>
          <Header />
          <WelcomeText />
          <ActionAreaCard />
          <Footer />
        </Box>
        
      </MainLayout>
    </>
  );
}
