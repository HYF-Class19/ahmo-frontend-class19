export type IUser = {
    id: number;
    email: string;
    fullName?: string;
    imageUrl?: string;
    token: string;
}

export type ResponseUser = IUser

export type LoginUserDto = {
    email: string;
    password: string;
}

export type CreateUserDto = {
    email: string;
    fullName: Date;
    password: string;
}
