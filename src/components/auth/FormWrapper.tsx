import React from 'react';
import {Avatar, Box, Container, CssBaseline, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import styles from "./loginRegister.module.scss"

interface formWrapperProps {
    children: React.ReactNode;
    mode: 'login' | 'register'
}
const FormWrapper: React.FC<formWrapperProps> = ({children, mode}) => {
    return (
        <Container component="main" maxWidth="xs" className='hello'>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, mt:5, width: 150, height: 150}}>
                    <img src="/ahmo-logo.png" alt="logo" className={styles.lrlogo} />
                </Avatar>
                {/* <Typography component="h1" variant="h5">
                    {mode === 'login' ? 'Sign in' : 'Sign up'}
                </Typography> */}
            </Box>
            {children}
        </Container>
    );
};

export default FormWrapper;
