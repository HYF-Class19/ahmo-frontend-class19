import React, {useState} from 'react';
import styles from "@/components/chat/ChatBox/ChatBox.module.scss";
import {IMember} from "@/models/IChat";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {useMutateMessageMutation} from "@/services/messageService";
import { addMessage } from '@/store/slices/chatSlice';

interface ChatTextAreaProps {
    receivers: number[];
    activeChatId: number;
    socket: any;
}

const ChatTextArea:React.FC<ChatTextAreaProps> = ({receivers, activeChatId, socket}) => {
    const [message, setMessage] = useState<string>('')
    const [mutateMessage, {isLoading: sendLoading}] = useMutateMessageMutation()
    const userData = useAppSelector(selectUserData)!
    const dispatch = useAppDispatch()
    

    const sendMessage = async () => {
        if(message.length > 0 && userData) {
            const res = await mutateMessage({chatId: activeChatId, text: message})
            setMessage('')

            // @ts-ignore
            const postedMessage = res.data
            if(postedMessage) {
                socket.current.emit('sendMessage', {
                    id: postedMessage.id,
                    sender: userData,
                    receivers: receivers,
                    chatId: activeChatId,
                    text: message,
                })
                dispatch(addMessage(postedMessage))
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        socket.current.emit('typing', {sender: userData, chatId: activeChatId, receivers})
    }

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        socket.current.emit('stopTyping', {sender: userData, chatId: activeChatId, receivers})
    }

    return (
        <div className={styles.chatBoxBottom}>
            <textarea className={styles.chatMessageInput} onBlur={onBlur} value={message} onChange={onChange} onFocus={onFocus} placeholder='write something...'></textarea>
            <button disabled={sendLoading} onClick={sendMessage} className={styles.chatSubmitButton}>Send</button>
        </div>
    );
};

export default ChatTextArea;
