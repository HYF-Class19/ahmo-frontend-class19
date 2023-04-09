import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { FormField } from "@/components/shared/FormField";

interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordFormProps {
  onSubmit: (data: ChangePasswordFormData) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onSubmit }) => {
  const methods = useForm<ChangePasswordFormData>();

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ marginBottom: 1 }}>
            Change Password
          </Typography>
          <FormField name="oldPassword" label="Old Password" type="password" />
          <FormField name="newPassword" label="New Password" type="password" />
          <FormField
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
          />
          <Button
            variant="contained"
            color="warning"
            type="submit"
            sx={{ display: "block", margin: "0 auto", marginTop: 5 }}
          >
            Change
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};

export default ChangePasswordForm;
