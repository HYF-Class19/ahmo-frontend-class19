import Footer from "@/components/shared/home-page/Footer";
import ActionAreaCard from "@/components/shared/home-page/card";
import WelcomeText from "@/components/shared/home-page/welcome-text";
import { useIsLaptop, useIsMobile } from "@/hooks/useIsMobile";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";

export default function Home() {
  const isLaptop = useIsLaptop();
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>AHMO</title>
        <meta name="description" content="ahmo gaming chat" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Box
          sx={{
            bgcolor: "primary.main",
            height: !isLaptop ? "calc(100vh - 93px)" : "100%",
            pb: isLaptop ? (isMobile ? "180px" : "120px") : 0,
          }}
        >
          <WelcomeText />
          <ActionAreaCard />
          <Footer />
        </Box>
      </MainLayout>
    </>
  );
}
