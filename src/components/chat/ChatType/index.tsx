import React, { useState } from 'react';
import Conversation from "@/components/chat/Conversation";
import {IChat} from "@/models/IChat";
import styles from './ChatType.module.scss'
import SearchBar from '@/components/shared/SearchBar';

interface ChatTypeProps {
    chats: IChat[],
    type: 'group' | 'direct' | 'game' | 'all'
    isSearchActive: boolean
    setIsSearchActive: Function
}

const ChatType: React.FC<ChatTypeProps> = ({chats, type, setIsSearchActive, isSearchActive}) => {


    return (
        <div className={styles.wrapper}>
            <SearchBar placeholder='search...' isActive={isSearchActive} setActive={setIsSearchActive} searchType={type} />
            {!isSearchActive ? chats.length > 0 ?
                chats.map((chat: IChat) => <Conversation key={chat.id} chat={chat} />)
                 : <div>You have no {type} chats, maybe create one?</div> : null
            }
        </div>
    );
};

export default ChatType;
