import {setCookie} from 'nookies';
import {IUser, ResponseUser} from "@/models/IUser";
import {api} from "@/services/api";


interface RegisterUserRequest {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

interface LoginUserRequest {
    email: string;
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
        registerUser: builder.mutation<IUser, RegisterUserRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
            transformResponse: (response: IUser) => {
                setToken(response.token);
                return response;
            },
        }),
        loginUser: builder.mutation<IUser, LoginUserRequest>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
            transformResponse: (response: IUser) => {
                setToken(response.token);
                return response;
            },
        }),
        getUser: builder.query<ResponseUser, void>({
            query: () => ({
                url: '/users/me',
            }),
        }),
        searchUsers: builder.query<ResponseUser[], string>({
            query: (search) => ({
                url: `/users?query=${search}`,
            })
        })
    }),
});

export const {useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useSearchUsersQuery} = authApi;