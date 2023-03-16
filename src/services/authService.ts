import {setCookie} from 'nookies';
import {ResponseUser} from "@/models/IUser";
import {api} from "@/services/api";


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

const setToken = (token: string) => {
    setCookie(null, 'authToken', token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
    });
};

export const authApi = api.injectEndpoints({
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