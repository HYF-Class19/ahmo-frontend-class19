import { ChangePasswordFormData } from "@/components/profile/ChangePasswordForm";
import { IUser, ResponseUser } from "@/models/IUser";
import { api } from "@/services/api";
import { setCookie } from "nookies";

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
  setCookie(null, "authToken", token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
};

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, RegisterUserRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: IUser) => {
        setToken(response.token);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
    loginUser: builder.mutation<IUser, LoginUserRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: IUser) => {
        setToken(response.token);
        return response;
      },
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query<ResponseUser, void>({
      query: () => ({
        url: "/users/me",
      }),
      providesTags: (result) => ["Auth"],
    }),
    searchUsers: builder.query<any[], { query: string; type: string }>({
      query: ({ query, type }) => ({
        url:
          type === "direct"
            ? `/users?query=${query}`
            : `/chats?query=${query}&type=${type}`,
      }),
    }),
    updateUser: builder.mutation<
      void,
      {
        userId: number;
        body: { image_url?: string; fullName?: string; bio?: string };
      }
    >({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body,
      }),
    }),
    updateUserPassword: builder.mutation<
      void,
      {
        userId: number;
        body: ChangePasswordFormData;
      }
    >({
      query: ({ userId, body }) => ({
        url: `/users/${userId}?passwd=true`,
        method: "PATCH",
        body,
      }),
    }),
    getProfile: builder.query<IUser, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserQuery,
  useSearchUsersQuery,
  useGetProfileQuery,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
} = authApi;
