import { FormField } from "@/components/shared/FormField";
import { IUser } from "@/models/IUser";
import { useUpdateUserPasswordMutation } from "@/services/authService";
import { ChangePasswordSchema } from "@/utils/FormSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface ChangePasswordFormProps {
  user?: IUser | null;
  setShowChangePasswordForm: Function;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  user,
  setShowChangePasswordForm,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [updateUserPassword, { isLoading, error }] =
    useUpdateUserPasswordMutation();

  const methods = useForm<ChangePasswordFormData>({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordSchema),
  });

  useEffect(() => {
    // @ts-ignore
    setErrorMessage(error?.data?.message || "");
    let timeout: any;
    if (error) {
      setIsAlertOpen(true);
      timeout = setTimeout(() => {
        setIsAlertOpen(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const onSubmit = async (dto: ChangePasswordFormData) => {
    if (!user) return;
    try {
      const result = await updateUserPassword({ userId: user.id, body: dto });
      // @ts-ignore
      const data = result.data;
      if (data) {
        setShowChangePasswordForm(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
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
          {isAlertOpen && (
            <Alert severity="error" className="mb-20">
              {errorMessage}
            </Alert>
          )}
          <Button
            variant="contained"
            color="warning"
            type="submit"
            disabled={
              !methods.formState.isValid ||
              isLoading ||
              methods.formState.isSubmitting
            }
            sx={{ display: "block", margin: "0 auto", marginTop: 5 }}
          >
            Change
          </Button>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default ChangePasswordForm;
