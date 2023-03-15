import * as yup from 'yup';

export const LoginFormSchema = yup.object().shape({
    identifier: yup
        .string()
        .required('Please, provide the email or username'),
    password: yup
        .string()
        .min(6, 'Password at least 6 characters')
        .required('password is required'),
});

export const RegisterSchema = yup
    .object()
    .shape({
        username: yup.string().required('Please provide username'),
        email: yup
            .string()
            .email('Wrong email')
            .required('Please, provide the email'),
        password: yup
            .string()
            .min(6, 'Password at least 6 characters')
            .required('password is required'),
        fullName: yup.string().required('Please provide your full name'),

    })