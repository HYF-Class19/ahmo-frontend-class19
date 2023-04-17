import FormWrapper from "@/components/auth/FormWrapper";
import LoginForm from "@/components/auth/LoginForm";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@mui/material";
import { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <MainLayout title={"AHMO - login"}>
      <Box className="auth-box">
        <FormWrapper mode={"login"}>
          <LoginForm />
        </FormWrapper>
      </Box>
    </MainLayout>
  );
};

export default Login;
