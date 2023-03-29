import { FormField } from '@/components/shared/FormField';
import {Alert, Box, Button, Checkbox, FormControlLabel, Grid} from '@mui/material';
import {yupResolver} from "@hookform/resolvers/yup";
import React, {useEffect, useState} from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {LoginFormSchema, RegisterSchema} from '@/utils/FormSchemas';
import Link from "next/link";
import {useRouter} from "next/router";
import {Api} from "@/api";
import {setCookie} from "nookies";
import {setUserData} from "@/store/slices/userSlice";
import {useAppDispatch} from "@/hooks/useAppHooks";
import {useRegisterUserMutation} from "@/services/authService";
/*Styles*/
import styles from "./loginRegister.module.scss"

interface FormProps {
}

const Form: React.FC<FormProps> = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter()
    const [registerUser, {error, isLoading}] = useRegisterUserMutation()
    const dispatch = useAppDispatch()

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterSchema),
    });

    useEffect(() => {
        // @ts-ignore
        setErrorMessage(error?.data?.message || '')
    }, [error])

    const onSubmit = async (dto: any) => {
        try {

            const user: any = await registerUser(dto).unwrap()
            if(user) {
                dispatch(setUserData(user));
            }
            router.push('/')
        } catch (err: any) {
            console.log(err)
        }
    }

    return (
        <FormProvider {...form}>
            <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{mt: 2}}>
                <Grid item xs={12}>
                    <FormField
                        name="fullName"
                        label="User Name"
                        type="text"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormField
                        name="email"
                        label="Email"
                        type="email"
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
                    {error && (
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
                    className={styles.button}
                    type="submit"
                    fullWidth
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Sign In
                </Button>
                <Grid container className='nMember'>
                    <Grid item>
                        <Link href="/auth/register">
                            {"Not a member? Register now"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </FormProvider>
    );
};

export default Form;