import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import {HYDRATE} from "next-redux-wrapper";
import {parseCookies} from "nookies";

const BASE_URL = 'http://localhost:4000';

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


export const api = createApi({
    baseQuery,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Auth', 'Chat', 'Message'],
    endpoints: () => ({}),
})