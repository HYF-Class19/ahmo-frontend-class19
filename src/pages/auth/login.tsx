import React from 'react';
import {NextPage} from "next";
import LoginForm from "@/components/auth/LoginForm";
import MainLayout from "@/layouts/MainLayout";
import FormWrapper from "@/components/auth/FormWrapper";

const Login: NextPage = () => {
    return (
        <MainLayout>
            <FormWrapper mode={'login'}>
                <LoginForm />
            </FormWrapper>
        </MainLayout>
    );
};

export default Login;
