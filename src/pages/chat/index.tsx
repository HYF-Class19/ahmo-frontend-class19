import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import MainLayout from "@/layouts/MainLayout";
import ChatMenu from "@/components/chat/ChatMenu";
import ChatBox from "@/components/chat/ChatBox";
import styles from '../../styles/Chat.module.css'
import {useFetchChatsQuery} from "@/services/chatService";
import {useAppDispatch} from "@/hooks/useAppHooks";

const Chat: NextPage = () => {
    const {data, error, isLoading} = useFetchChatsQuery()



    return (
        <MainLayout>
           <div className={styles.chat}>
               <div className={styles.chatMenu}>
                   {data && <ChatMenu data={data.data} />}
               </div>
               <ChatBox />
           </div>
        </MainLayout>
    );
};

export default Chat;
