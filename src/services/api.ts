import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import {HYDRATE} from "next-redux-wrapper";
import {parseCookies} from "nookies";

const BASE_URL = 'http://localhost:1337/api';

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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action.payload[reducerPath]
        }
    },
    tagTypes: ['Auth', 'Chat'],
    endpoints: () => ({}),
})