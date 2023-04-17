import Footer from "@/components/home-page/Footer";
import ActionAreaCard from "@/components/home-page/card";
import WelcomeText from "@/components/home-page/welcome-text";
import { useIsLaptop, useIsMobile } from "@/hooks/useIsMobile";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@mui/material";

export default function Home() {
  const isLaptop = useIsLaptop();
  const isMobile = useIsMobile();

  return (
    <MainLayout>
      <Box
        sx={{
          bgcolor: "primary.main",
          height: !isLaptop ? "calc(100vh - 80px)" : "100%",
          pb: isLaptop ? (isMobile ? "180px" : "120px") : 0,
        }}
      >
        <WelcomeText />
        <ActionAreaCard />
        <Footer />
      </Box>
    </MainLayout>
  );
}
