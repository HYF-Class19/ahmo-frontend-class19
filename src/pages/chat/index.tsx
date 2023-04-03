import React, {useEffect, useRef, useState} from 'react';
import {NextPage} from "next";
import MainLayout from "@/layouts/MainLayout";
import ChatMenu from "@/components/chat/ChatMenu";
import ChatBox from "@/components/chat/ChatBox";
import styles from '../../styles/Chat.module.scss'
import {useFetchChatsQuery} from "@/services/chatService";
import ChatTabs from "@/components/chat/ChatTabs";
import CreateChatDialog from "@/components/chat/CreateChatDialog";
import CreateGameDialog from "@/components/game/CreateGameDialog";
import GameBox from "@/components/game/GameBox";
import {IChat} from "@/models/IChat";
import { useAppSelector } from '@/hooks/useAppHooks';
import { selectUserData } from '@/store/slices/userSlice';
import { socket } from '@/utils/socket';
import { selectActiveChat } from '@/store/slices/chatSlice';

const Chat: NextPage = () => {
    const [selectedType, setSelectedType] = useState<"game" | "group" | "group" | "all">("all")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [chats, setChats] = useState<IChat[]>([])
    const {data, error, isLoading} = useFetchChatsQuery()
    const userData = useAppSelector(selectUserData)
    const activeChat = useAppSelector(selectActiveChat)

    useEffect(() => {
        if(userData) {
            socket.emit("addUser", userData)
        }
    }, [userData]);

    useEffect(() => {
        if(data) {
            setChats(data)
        }
    }, [data]);

    return (
        <MainLayout>
            {!userData ? 'AUTHORIZE' : (
            <>
            <div className={styles.chat}>
                <ChatTabs setSelectedType={setSelectedType} setIsActive={setIsOpen} selectedType={selectedType} />
                <div className={styles.chatMenu}>
                    {error && <div>error</div>}
                    {isLoading && <div>loading...</div>}
                    {data?.length && <ChatMenu selected={selectedType} chats={data} />}
                </div>
                {selectedType === 'game' || activeChat.type === 'game' ?  <GameBox /> : <ChatBox />}
            </div>
            <div>
               <CreateChatDialog setChats={setChats} open={isOpen} setOpen={setIsOpen} type={selectedType} />
            </div>
            </>
        )}
        </MainLayout>
    );
};

export default Chat;
