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

interface ChatMenuProps {
    data: any
}

const ChatMenu: React.FC<ChatMenuProps> = ({data}) => {

    return (
        <div className={styles.menu}>
            {['group', 'personal'].map((type: any, i) => (
                <ChatType key={i} data={data.filter((item: any) => item.attributes.type === type)} type={type} />
            ))}
        </div>
    );
};

export default ChatMenu;
