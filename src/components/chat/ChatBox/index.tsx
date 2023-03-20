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

interface ChatBoxProps {
    currentChat?: number
}

const ChatBox: React.FC<ChatBoxProps> = () => {
    const [message, setMessage] = useState<string>('')
    const [arrivalMessage, setArrivalMessage] = useState<ArrivingMessage>()
    const activeChat = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const [someoneTyping, setSomeoneTyping] = useState<{sender: IUser, chatId: number} | null>(null)
    const {data, error, isLoading} = useFetchChatWithMessagesQuery(activeChat.activeChat || 0)
    const [mutateMessage, {isLoading: sendLoading}] = useMutateMessageMutation()
    const dispatch = useAppDispatch()

    const socket = useRef<any>();
    const scrollRef = useRef<any>();

    useEffect(() => {
       socket.current = io("ws://localhost:5000");
       socket.current.on("getMessage", (data: ArrivingMessage) => {
           setArrivalMessage({
               id: data.id,
               sender: data.sender,
               chatId: data.chatId,
               text:  data.text,
               createdAt: data.createdAt,
           });
       });
    }, []);

    useEffect(() => {
        if(data) {
            dispatch(loadMessages(data.messages))
        }
    }, [data])

    useEffect(() => {
        socket.current.emit("addUser", userData)
    }, [userData]);

    useEffect(() => {
        if(arrivalMessage?.sender && activeChat) {
            console.log(activeChat.members)
            if(arrivalMessage.chatId === activeChat.activeChat) {
                dispatch(addMessage(arrivalMessage))
            }
        }
    }, [arrivalMessage, activeChat.activeChat]);

    const sendMessage = async () => {
        if(message.length > 0 && userData) {
            const res = await mutateMessage({chatId: activeChat.activeChat, text: message})
            setMessage('')

            const receiverIds = activeChat.members.filter((member: IMember) => member.user.id !== userData.id)?.map((member: IMember) => member.user.id)

            // @ts-ignore
            const postedMessage = res.data
            if(postedMessage) {
                socket.current.emit('sendMessage', {
                    id: postedMessage.id,
                    sender: userData,
                    receivers: receiverIds,
                    chatId: activeChat.activeChat,
                    text: message,
                })
            }
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [activeChat.messages]);

    useEffect(() => {
        socket.current.on('getTyping', (data: { sender: IUser, chatId: number }) => {
            if(data.sender.id !== someoneTyping?.sender.id || data.chatId !== someoneTyping.chatId) {
                setSomeoneTyping(data)
            }
        })
        socket.current.on('getStopTyping', () => {
            setSomeoneTyping(null)
        })
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const receiverIds = activeChat.members.filter((member: IMember) => member.user.id !== userData?.id)?.map((member: IMember) => member.user.id)

        socket.current.emit('typing', {sender: userData, chatId: activeChat.activeChat, receivers: receiverIds})
    }

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const receiverIds = activeChat.members.filter((member: IMember) => member.user.id !== userData?.id)?.map((member: IMember) => member.user.id)
        socket.current.emit('stopTyping', {sender: userData, chatId: activeChat.activeChat, receivers: receiverIds})
    }

    return (
        <div className={styles.chatBoxWrapper}>

            {activeChat.activeChat && userData ? (
                <>
                    <div className={styles.chatBoxTop}>
                        {isLoading && <div>loading...</div>}
                        {data && activeChat.messages.map((message: IMessage) => (
                           <div ref={scrollRef}>
                               <Message key={message.id} isMy={message.sender.id === userData?.id} message={message}/>
                           </div>
                        ))}
                        {someoneTyping && someoneTyping.chatId === activeChat.activeChat && <div>{someoneTyping?.sender?.fullName} is typing...</div>}
                    </div>
                    <div className={styles.chatBoxBottom}>
                        <textarea className={styles.chatMessageInput} onBlur={onBlur} value={message} onChange={onChange} onFocus={onFocus} placeholder='write something...'></textarea>
                        <button disabled={sendLoading} onClick={sendMessage} className={styles.chatSubmitButton}>Send</button>
                    </div>
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
