import { useIsLaptop } from "@/hooks/useIsMobile";
import { Card, CardContent } from "@mui/material";
import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const isLaptop = useIsLaptop();
  return (
    <Card
      sx={{
        height: isLaptop ? "100%" : "80vh",
        backgroundColor: "#19053B",
        color: "#ffffff",
        border: 1,
        marginLeft: 2,
        marginTop: 2,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MainContent;
