import React from 'react';
import Header from "@/components/shared/Header";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
