import FormWrapper from "@/components/auth/FormWrapper";
import RegisterForm from "@/components/auth/RegisterForm";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@mui/material";
import { NextPage } from "next";

const Register: NextPage = () => {
  return (
    <MainLayout title={"AHMO - register"}>
      <Box className="auth-box">
        <FormWrapper mode={"register"}>
          <RegisterForm />
        </FormWrapper>
      </Box>
    </MainLayout>
  );
};

export default Register;
