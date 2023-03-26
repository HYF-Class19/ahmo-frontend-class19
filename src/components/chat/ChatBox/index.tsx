import React, {useEffect, useRef, useState} from 'react';
import styles from './ChatBox.module.scss'
import Message from "@/components/chat/Message";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {addMessage, loadMessages, selectActiveChat} from "@/store/slices/chatSlice";
import {selectUserData} from "@/store/slices/userSlice";
import {useFetchChatWithMessagesQuery} from "@/services/chatService";
import {ArrivingMessage, IMessage} from "@/models/IMessage";
import {useMutateMessageMutation} from "@/services/messageService";
import {io} from "socket.io-client";
import {IMember} from "@/models/IChat";
import {IUser} from "@/models/IUser";
import ChatTextarea from "@/components/chat/ChatTextarea";
import {getReceivers} from "@/utils/chatHelpers";

interface ChatBoxProps {
    socket: any
}


const ChatBox: React.FC<ChatBoxProps> = ({socket}) => {
    const [arrivalMessage, setArrivalMessage] = useState<ArrivingMessage>()
    const activeChat = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const [someoneTyping, setSomeoneTyping] = useState<{sender: IUser, chatId: number} | null>(null)
    const {data, error, isLoading} = useFetchChatWithMessagesQuery(activeChat.activeChat || 0)
    const dispatch = useAppDispatch()

    const scrollRef = useRef<any>();

    // useEffect(() => {
    //    socket.current = io("ws://localhost:5000");
    //    socket.current.on("getMessage", (data: ArrivingMessage) => {
    //        setArrivalMessage({
    //            id: data.id,
    //            sender: data.sender,
    //            chatId: data.chatId,
    //            text:  data.text,
    //            createdAt: data.createdAt,
    //        });
    //    });
    // }, []);

    useEffect(() => {
        if(data) {
            dispatch(loadMessages(data.messages))
        }
    }, [data])

    // useEffect(() => {
    //     socket.current.emit("addUser", userData)
    // }, [userData]);

    useEffect(() => {
        if(arrivalMessage?.sender && activeChat) {
            if(arrivalMessage.chatId === activeChat.activeChat) {
                dispatch(addMessage(arrivalMessage))
            }
        }
    }, [arrivalMessage, activeChat.activeChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat.messages]);

    // useEffect(() => {
    //     socket.current.on('getTyping', (data: { sender: IUser, chatId: number }) => {
    //         if(data.sender.id !== userData?.id) {
    //             setSomeoneTyping(data)
    //         }
    //     })
    //     socket.current.on('getStopTyping', () => {
    //         setSomeoneTyping(null)
    //     })
    // }, []);

    return (
        <div className={styles.chatBoxWrapper}>

            {activeChat.activeChat && userData ? (
                <>
                    <div className={styles.chatBoxTop}>
                        <div style={{overflowY: 'auto'}}>
                            {isLoading && <div>loading...</div>}
                            {data && activeChat.messages.map((message: IMessage) => (
                                <div ref={scrollRef}>
                                    <Message key={message.id} isMy={message.sender.id === userData?.id} message={message}/>
                                </div>
                            ))}
                            {someoneTyping && someoneTyping.chatId === activeChat.activeChat && <div>{someoneTyping?.sender?.fullName} is typing...</div>}
                        </div>
                    </div>
                    <ChatTextarea activeChatId={activeChat.activeChat} socket={socket} receivers={getReceivers(activeChat.members, userData.id)} />
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
