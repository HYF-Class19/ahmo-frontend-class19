export type IUser = {
    id: number;
    email: string;
    username: string;
    fullName?: string;
}

export type ResponseUser = {
    user: IUser,
    jwt: string
}

export type LoginUserDto = {
    identifier: string;
    password: string;
}

export type CreateUserDto = {
    email: string;
    username: string;
    fullName: Date;
    password: string;
}
