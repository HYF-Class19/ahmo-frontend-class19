import { GetServerSidePropsContext, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import axios from 'axios';
import { UserApi } from './user';

interface ApiReturnType {
    user: ReturnType<typeof UserApi>;
}

export const Api = (
    ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
    const cookies = parseCookies(ctx);
    const token = cookies.authToken;
    const headers = token ? { Authorization: 'Bearer ' + token } : {};

    const instance = axios.create({
        baseURL: "https://ahmo-api.up.railway.app",
        headers,
    });

    return {
        user: UserApi(instance),
    };
};