import React, { useRef, useState } from 'react';
import styles from './ChatMenu.module.scss'
import ChatType from "@/components/chat/ChatType";
import {IChat} from "@/models/IChat";
import { Button } from '@mui/material';

interface ChatMenuProps {
    chats: IChat[]
    selected: 'game' | 'direct' | 'group' | 'all'
}

const ChatMenu: React.FC<ChatMenuProps> = ({chats, selected}) => {
    const [isSearchActive, setIsSearchActive] = useState(false)

    return (
        <div className={styles.menu} onClick={() => setIsSearchActive(false)}>
            {selected === 'all' ? <ChatType isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} chats={chats} type={selected} />
                :
                (
                    <ChatType isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} chats={chats.filter((item: any) => item.type === selected)} type={selected} />
                )
           }
        </div>
    );
};

export default ChatMenu;
