import { TextField } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "../auth/loginRegister.module.scss";

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type }) => {
  const { register, formState } = useFormContext();

  return (
    <TextField
      {...register(name)}
      className={styles.textField}
      variant="filled"
      name={name}
      color="secondary"
      margin="normal"
      size="small"
      label={type !== "date" ? label : ""}
      type={type}
      error={!!formState.errors[name]?.message}
      fullWidth
      autoFocus
      helperText={formState.errors[name]?.message as any}
      id="outlined-basic"
      sx={{
        input: {
          color: "#fff",
          border: 1,
          borderColor: "#F3FB8C",
          borderRadius: "5px",
        },
        "& input": { color: "" },
        "& .MuiFormLabel-root": {
          color: "#F3FB8C",
          mb: 10,
        },
        "& .MuiOutlinedInput-root.Mui-disabled": {
          "& > fieldset": { border: "1px solid green" },
        },
      }}
    />
  );
};
