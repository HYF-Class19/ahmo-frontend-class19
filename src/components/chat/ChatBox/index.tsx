import React from 'react';
import styles from './ChatBox.module.scss'
import Message from "@/components/chat/Message";
import {useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat} from "@/store/slices/chatSlice";
import {selectUserData} from "@/store/slices/userSlice";

interface ChatBoxProps {
    currentChat?: number
}

const ChatBox: React.FC<ChatBoxProps> = ({currentChat}) => {

    const activeChat = useAppSelector(selectActiveChat)
    const userData = useAppSelector(selectUserData)

    console.log(activeChat)

    return (
        <div className={styles.chatBoxWrapper}>
            {activeChat.id || userData ? (
                <>
                    <div className={styles.chatBoxTop}>
                        {activeChat.messages.map((message: any) => (
                            <Message isMy={message.attributes.sender.data.id === activeChat.id} message={message}/>
                        ))}
                    </div>
                    <div className={styles.chatBoxBottom}>
                        <textarea className={styles.chatMessageInput} placeholder='write something...'></textarea>
                        <button className={styles.chatSubmitButton}>Send</button>
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
