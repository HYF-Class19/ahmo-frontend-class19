import React, {useState} from 'react';
import styles from "@/components/chat/ChatBox/ChatBox.module.scss";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
import {useMutateMessageMutation} from "@/services/messageService";
import { socket } from '@/utils/socket';
import { messageAdded } from '@/store/slices/menuSlice';
import GameInput from '@/components/game/GameInput';
import { IconButton } from '@mui/material';
import { sendResponse } from 'next/dist/server/image-optimizer';
import Image from 'next/image'

interface ChatTextAreaProps {
    receivers: number[];
    activeChatId: number;
}

const ChatTextArea:React.FC<ChatTextAreaProps> = ({receivers, activeChatId}) => {
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
                socket.emit('sendMessage', {
                    id: postedMessage.id,
                    sender: userData,
                    receivers: [...receivers, userData.id],
                    chatId: activeChatId,
                    text: message,
                })
                dispatch(messageAdded({message: postedMessage, chatId: activeChatId}))
            }
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        socket.emit('typing', {sender: userData, chatId: activeChatId, receivers})
    }

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        socket.emit('stopTyping', {sender: userData, chatId: activeChatId, receivers})
    }

    return (
        <div className={styles.chatBoxBottom}>
             <GameInput
                value={message} 
                onChange={onChange}
                name={'message'}
                label={'Your message'}
                onBlur={onBlur}
                onFocus={onFocus}
         />
      <div onClick={sendMessage} className={styles.btnSection}>
             {!sendLoading && <IconButton
                  >
                  <Image src='/img/send.svg' width="30" height='30' alt={'Send icon'} />
                </IconButton>}
        </div>
        </div>
    );
};

export default ChatTextArea;
