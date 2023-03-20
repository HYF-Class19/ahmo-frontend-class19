import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import MainLayout from "@/layouts/MainLayout";
import ChatMenu from "@/components/chat/ChatMenu";
import ChatBox from "@/components/chat/ChatBox";
import styles from '../../styles/Chat.module.css'
import {useFetchChatsQuery} from "@/services/chatService";
import ChatTabs from "@/components/chat/ChatTabs";
import CreateChatDialog from "@/components/chat/CreateChatDialog";

const Chat: NextPage = () => {
    const [selectedType, setSelectedType] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {data, error, isLoading} = useFetchChatsQuery()

    return (
        <MainLayout>
           <div className={styles.chat}>
               <ChatTabs setSelectedType={setSelectedType} setIsActive={setIsOpen} selectedType={selectedType} />
               <div className={styles.chatMenu}>
                   {error && <div>error</div>}
                   {isLoading && <div>loading...</div>}
                   {data && <ChatMenu chats={data} />}
               </div>
               <ChatBox />
           </div>
            <CreateChatDialog open={isOpen} setOpen={setIsOpen} />
        </MainLayout>
    );
};

export default Chat;
