import React, {useState} from 'react';
import styles from './Header.module.scss';
import Link from "next/link";
import {useSelector} from "react-redux";
import {deleteUserData, selectUserData} from "@/store/slices/userSlice";
import {useAppDispatch} from "@/hooks/useAppHooks";
import {destroyCookie} from "nookies";
import {useRouter} from "next/router";

const Header = () => {
    const userData = useSelector(selectUserData);
    const dispatch = useAppDispatch();
    const router = useRouter()

    const logout = async () => {
        await router.push('/auth/login')
        destroyCookie(null, 'authToken')
        dispatch(deleteUserData());

    }

    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <img src="/ahmo-logo.png" alt="logo" />
            </div>
            <nav>
                {userData ? (
                    <ul>
                        <li>
                            <Link href={'/'}>Documentation</Link>
                        </li>
                        <li>
                            <Link href={'/chat'}>Chat</Link>
                        </li>
                        <li>
                            <Link onClick={logout} href={'/'}>Logout</Link>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <Link href={'/'}>Documentation</Link>
                        </li>
                        <li>
                            <Link href={'/auth/login'}>Login</Link>
                        </li>
                        <li>
                            <Link href={'/auth/register'}>Register</Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;
