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
            invalidatesTags: ['Auth'],
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
            invalidatesTags: ['Auth'],
        }),
        getUser: builder.query<ResponseUser, void>({
            query: () => ({
                url: '/users/me',
            }),
            providesTags: (result) => ['Auth'],
        }),
        searchUsers: builder.query<any[], {query: string, type: string}>({
            query: ({query, type}) => ({
                url: type === 'direct' ? `/users?query=${query}` : `/chats?query=${query}&type=${type}` ,
            })
        })
    }),
});

export const {useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useSearchUsersQuery} = authApi;