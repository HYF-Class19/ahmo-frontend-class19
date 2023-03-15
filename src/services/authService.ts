import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {parseCookies, setCookie, destroyCookie} from 'nookies';
import {RootState} from "@/store";
import {IUser, ResponseUser} from "@/models/IUser";

const BASE_URL = 'http://localhost:1337/api';

interface RegisterUserRequest {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

interface LoginUserRequest {
    identifier: string;
    password: string;
}

// Define a custom base query function to handle authentication tokens
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const cookies = parseCookies();
        const token = cookies.authToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

const setToken = (token: string) => {
    setCookie(null, 'authToken', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
    });
};

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<ResponseUser, RegisterUserRequest>({
            query: (body) => ({
                url: '/auth/local/register',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ResponseUser) => {
                const {jwt, user} = response;
                setToken(jwt);
                return response;
            },
        }),
        loginUser: builder.mutation<ResponseUser, LoginUserRequest>({
            query: (body) => ({
                url: '/auth/local',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ResponseUser) => {
                const {jwt, user} = response;
                setToken(jwt);
                return response;
            },
        }),
        getUser: builder.query<ResponseUser, void>({
            query: () => ({
                url: '/users/me',
            }),
        }),
    }),
});

export const {useLoginUserMutation, useRegisterUserMutation, useGetUserQuery} = authApi;