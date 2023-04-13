import * as yup from "yup";

export const LoginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("password is required"),
});

export const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wrong email")
    .required("Please, provide the email"),
  password: yup
    .string()
    .min(6, "Password at least 6 characters")
    .required("password is required"),
  fullName: yup.string().required("Please provide your full name"),
});

export const ChangePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "New Password must be at least 6 characters long"),
  confirmNewPassword: yup
    .string()
    .required("Confirm New Password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});
