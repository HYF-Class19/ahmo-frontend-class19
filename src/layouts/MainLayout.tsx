import BurgerMenu from "@/components/shared/BurgerMenu";
import Header from "@/components/shared/Header";
import { useIsLaptop } from "@/hooks/useIsMobile";
import Head from "next/head";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  description,
}) => {
  const isLaptop = useIsLaptop();

  return (
    <>
      <Head>
        <title>{title ? title : "AHMO chat"}</title>
        <meta
          name="description"
          content={description ? description : "ahmo gaming chat"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="wrapper">
        {isLaptop ? <BurgerMenu /> : <Header />}
        <div className="content">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
