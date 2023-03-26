import { GetServerSidePropsContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import axios from 'axios';
import { UserApi } from './user';

interface ApiReturnType {
    user: ReturnType<typeof UserApi>;
}

export const Api = (
    req?: GetServerSidePropsContext['req']
): ApiReturnType => {
    const cookies = req ? Cookies.get(req.cookies) : parseCookies();
    const token = cookies.authToken;
    const headers = token ? { Authorization: 'Bearer ' + token } : {};

    const instance = axios.create({
        baseURL: 'http://localhost:4000/',
        headers,
    });

    return {
        user: UserApi(instance),
    };
};