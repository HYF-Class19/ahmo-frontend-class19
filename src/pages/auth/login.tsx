import React from 'react';
import {NextPage} from "next";
import LoginForm from "@/components/auth/LoginForm";
import MainLayout from "@/layouts/MainLayout";
import FormWrapper from "@/components/auth/FormWrapper";
import { Box } from '@mui/material';
// 
const Login: NextPage = () => {
    return (
        <MainLayout>
            <Box className='auth-box'>
            <FormWrapper mode={'login'}>
                <LoginForm />
            </FormWrapper>
            </Box>
        </MainLayout>
    );
};

export default Login;
