import { FormField } from '@/components/shared/FormField';
import {Alert, Box, Button, Checkbox, FormControlLabel, Grid} from '@mui/material';
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useState} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginFormSchema } from '@/utils/FormSchemas';
import Link from "next/link";
import {useRouter} from "next/router";
import {setCookie} from "nookies";
import { setUserData } from '@/store/slices/userSlice';
import {useAppDispatch} from "@/hooks/useAppHooks";
import {Api} from "@/api";
import {useLoginUserMutation} from "@/services/authService";


interface FormProps {
}

const Form: React.FC<FormProps> = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()
    const [loginUser, {}] = useLoginUserMutation()

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginFormSchema),
    });

    const onSubmit = async (dto: any) => {
        try {
            await loginUser(dto).unwrap()
            setErrorMessage('');
            router.push('/')
        } catch (err: any) {
            console.log(err)
            setErrorMessage(err.response?.data?.message)
        }
    }

    return (
        <FormProvider {...form}>
            <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{mt: 2}}>
                <Grid item xs={12}>
                    <FormField
                        label="Email or Username"
                        name="identifier"
                        type="text"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                    />
                </Grid>
                <Grid item xs={12}>
                    {errorMessage && (
                        <Alert severity="error" className="mb-20">
                            {errorMessage}
                        </Alert>
                    )}
                </Grid>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary"/>}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item>
                        <Link href="/auth/register">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default Form;