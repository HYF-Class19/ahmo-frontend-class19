import React, {useEffect, useRef, useState} from 'react';
import styles from './ChatBox.module.scss'
import Message from "@/components/chat/Message";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {loadMessages, selectActiveChat} from "@/store/slices/chatSlice";
import {selectUserData} from "@/store/slices/userSlice";
import {useFetchChatWithMessagesQuery} from "@/services/chatService";
import {ArrivingMessage, IMessage} from "@/models/IMessage";
import {IUser} from "@/models/IUser";
import ChatTextarea from "@/components/chat/ChatTextarea";
import {getReceivers} from "@/utils/chatHelpers";
import { socket } from '@/utils/socket';

interface ChatBoxProps {

}


const ChatBox: React.FC<ChatBoxProps> = () => {
    const activeChat = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const [someoneTyping, setSomeoneTyping] = useState<{sender: IUser, chatId: number} | null>(null)
    const {data, isLoading} = useFetchChatWithMessagesQuery(activeChat.activeChat || 0)
    const dispatch = useAppDispatch()

    const scrollRef = useRef<any>();

    useEffect(() => {
        if(data) {
            console.log('data messages changed', data)
            dispatch(loadMessages(data.messages))
        }
    }, [data])

    useEffect(() => {
        console.log('activeChat', activeChat.messages)
    }, [activeChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat.messages]);

    useEffect(() => {
        socket.on('getTyping', (data: { sender: IUser, chatId: number }) => {
            if(data.sender.id !== userData?.id) {
                setSomeoneTyping(data)
            }
        })
        socket.on('getStopTyping', () => {
            setSomeoneTyping(null)
        })
    }, []);

    return (
        <div className={styles.chatBoxWrapper}>

            {activeChat.activeChat && userData ? (
                <>
                    <div className={styles.chatBoxTop}>
                        <div style={{overflowY: 'auto'}}>
                            {isLoading && <div>loading...</div>}
                            {data && activeChat.messages.map((message: IMessage) => (
                                <div key={message.id} ref={scrollRef}>
                                    <Message key={message.id} isMy={message.sender.id === userData?.id} message={message}/>
                                </div>
                            ))}
                            {someoneTyping && someoneTyping.chatId === activeChat.activeChat && <div>{someoneTyping?.sender?.fullName} is typing...</div>}
                        </div>
                    </div>
                    <ChatTextarea activeChatId={activeChat.activeChat} receivers={getReceivers(activeChat.members, userData.id)} />
                </>
            ) : (
                <div className={styles.noConversation}>
                    <h2>Open a conversation to start chat</h2>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
