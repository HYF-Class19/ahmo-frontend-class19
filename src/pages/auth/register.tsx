import React from 'react';
import {NextPage} from "next";
import MainLayout from "@/layouts/MainLayout";
import FormWrapper from "@/components/auth/FormWrapper";
import RegisterForm from "@/components/auth/RegisterForm";

const Register: NextPage = () => {
    return (
        <MainLayout>
            <FormWrapper mode={'register'}>
                <RegisterForm />
            </FormWrapper>
        </MainLayout>
    );
};

export default Register;
