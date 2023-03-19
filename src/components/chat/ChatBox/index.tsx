import React, {useEffect, useState} from 'react';
import styles from './ChatBox.module.scss'
import Message from "@/components/chat/Message";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {loadMessages, selectActiveChat} from "@/store/slices/chatSlice";
import {selectUserData} from "@/store/slices/userSlice";
import {useFetchChatWithMessagesQuery} from "@/services/chatService";
import {IMessage} from "@/models/IMessage";
import axios from "axios";
import {useMutateMessageMutation} from "@/services/messageService";

interface ChatBoxProps {
    currentChat?: number
}

const ChatBox: React.FC<ChatBoxProps> = () => {
    const [message, setMessage] = useState<string>('')
    const activeChat = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)
    const {data, error, isLoading} = useFetchChatWithMessagesQuery(activeChat.activeChat || 0)
    const [mutateMessage, {}] = useMutateMessageMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(data) {
            dispatch(loadMessages(data.messages))
        }
    }, [data])

    const sendMessage = () => {
        if(message.length > 0) {
            mutateMessage({chatId: activeChat.activeChat, text: message})
            setMessage('')
        }
    }

    return (
        <div className={styles.chatBoxWrapper}>
            {activeChat.id || userData ? (
                <>
                    <div className={styles.chatBoxTop}>
                        {isLoading && <div>loading...</div>}
                        {data && activeChat.messages.map((message: IMessage) => (
                            <Message isMy={message.sender.id === userData?.id} message={message}/>
                        ))}
                    </div>
                    <div className={styles.chatBoxBottom}>
                        <textarea className={styles.chatMessageInput} value={message} onChange={e => setMessage(e.target.value)} placeholder='write something...'></textarea>
                        <button onClick={sendMessage} className={styles.chatSubmitButton}>Send</button>
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
