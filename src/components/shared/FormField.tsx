
import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
    name: string;
    label: string;
    type: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, type}) => {
    const { register, formState } = useFormContext();

    return (
        <TextField
            {...register(name)}
            name={name}
            margin={"normal"}
            className="mb-20"
            size="small"
            label={type !== 'date' ? label : ""}
            type={type}
            error={!!formState.errors[name]?.message}
            fullWidth
            autoFocus
        />
    );
};