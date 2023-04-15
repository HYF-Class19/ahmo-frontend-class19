import BurgerMenu from "@/components/shared/BurgerMenu";
import Header from "@/components/shared/Header";
import { useIsLaptop } from "@/hooks/useIsMobile";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isLaptop = useIsLaptop();

  return (
    <div className="wrapper">
      {isLaptop ? <BurgerMenu /> : <Header />}
      <div className="content">{children}</div>
    </div>
  );
};

export default MainLayout;
