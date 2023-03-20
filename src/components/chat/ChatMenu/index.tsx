import React from 'react';
import styles from './ChatMenu.module.scss'
import {
    Box,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import Conversation from "@/components/chat/Conversation";
import ChatType from "@/components/chat/ChatType";
import {IChat} from "@/models/IChat";

interface ChatMenuProps {
    chats: IChat[]
}

const ChatMenu: React.FC<ChatMenuProps> = ({chats}) => {

    if(!chats) return (<div>no chat er...</div>)

    return (
        <div className={styles.menu}>
            {['group', 'direct'].map((type: any, i) => (
                <ChatType key={i} chats={chats.filter((item: any) => item.type === type)} type={type} />
            ))}
        </div>
    );
};

export default ChatMenu;
