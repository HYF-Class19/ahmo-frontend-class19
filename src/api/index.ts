import {GetServerSidePropsContext, NextPageContext} from 'next';
import Cookies, {parseCookies} from 'nookies';
import axios from 'axios';
import { UserApi } from './user';

interface ApiReturnType {
    user: ReturnType<typeof UserApi>;
}

export const Api = (
    ctx?: NextPageContext | GetServerSidePropsContext
): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.authToken;
    const headers = token ? {Authorization: 'Bearer ' + token} : {}

    const instance = axios.create({
        baseURL: 'http://localhost:4000/',
        headers,
    });

    return {
        user: UserApi(instance),
    };

};