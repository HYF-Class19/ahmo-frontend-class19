import React, {useEffect, useRef, useState} from 'react';
import {NextPage} from "next";
import MainLayout from "@/layouts/MainLayout";
import ChatMenu from "@/components/chat/ChatMenu";
import ChatBox from "@/components/chat/ChatBox";
import styles from '../../styles/Chat.module.css'
import {useFetchChatsQuery} from "@/services/chatService";
import ChatTabs from "@/components/chat/ChatTabs";
import CreateChatDialog from "@/components/chat/CreateChatDialog";
import CreateGameDialog from "@/components/game/CreateGameDialog";
import GameBox from "@/components/game/GameBox";
import {IChat} from "@/models/IChat";
import {io} from "socket.io-client";
import {ArrivingMessage} from "@/models/IMessage";

const Chat: NextPage = () => {
    const [selectedType, setSelectedType] = useState<"game" | "all">("all")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [chats, setChats] = useState<IChat[]>([])
    const {data, error, isLoading} = useFetchChatsQuery()
    const socket = useRef<any>();

    // useEffect(() => {
    //     socket.current = io("ws://localhost:5000");
    // }, []);

    useEffect(() => {
        if(data) {
            setChats(data)
        }
    }, [data]);


    return (
        <MainLayout>
           <div className={styles.chat}>
               <ChatTabs setSelectedType={setSelectedType} setIsActive={setIsOpen} selectedType={selectedType} />
               <div className={styles.chatMenu}>
                   {error && <div>error</div>}
                   {isLoading && <div>loading...</div>}
                   {chats.length && <ChatMenu selected={selectedType} chats={chats} />}
               </div>
               {selectedType === 'all' ? <ChatBox socket={socket} /> : <GameBox socket={socket} />}
           </div>
            {selectedType === 'all' ? <CreateChatDialog setChats={setChats} open={isOpen} setOpen={setIsOpen} />
                :
                <CreateGameDialog setChats={setChats} open={isOpen} setOpen={setIsOpen} />
            }
        </MainLayout>
    );
};

export default Chat;
