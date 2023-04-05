import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {getLastMessage} from "@/utils/obj-helper";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectActiveChat, setActiveChat, setGameChat} from "@/store/slices/chatSlice";
import {IChat} from "@/models/IChat";
import styles from './Conversation.module.scss'
import { selectUserData } from '@/store/slices/userSlice';
import clsx from 'clsx';

interface ConversationProps {
    chat: IChat;
}

const Conversation: React.FC<ConversationProps> = ({chat}) => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector(selectUserData)
    const activeChat = useAppSelector(selectActiveChat)

    const activateChat = () => {
        if(activeChat?.activeChat === chat.id) return
        if(chat.type === 'game') {
            dispatch(setGameChat(chat))
        } else {
            dispatch(setActiveChat(chat))
        }
    }

    return (
        <ListItem onClick={activateChat} className={clsx(styles.item, activeChat.activeChat === chat.id && styles.active)} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{chat.name.slice(0,1)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={chat.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="black"
                        >
                           {chat.lastMessage ? chat.lastMessage?.sender?.id === userData?.id ? 'You: ' : chat.lastMessage.sender.fullName + ': ': ''} {`${chat.lastMessage ? chat.lastMessage.text : 'no messages'}`}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default Conversation;
