import { AxiosInstance } from 'axios';
import {IUser} from "@/models/IUser";

export const UserApi = (instance: AxiosInstance) => ({
    async getMe() {
        const { data } = await instance.get<IUser>('users/me');
        return data;
    },
});