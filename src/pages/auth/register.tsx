import React from 'react';
import {NextPage} from "next";
import MainLayout from "@/layouts/MainLayout";
import FormWrapper from "@/components/auth/FormWrapper";
import RegisterForm from "@/components/auth/RegisterForm";
import { Box } from '@mui/material';

const Register: NextPage = () => {
    return (
        <MainLayout>
            <Box className='auth-box'>
            <FormWrapper mode={'register'}>
                <RegisterForm />
            </FormWrapper>
            </Box>
        </MainLayout>
    );
};

export default Register;
