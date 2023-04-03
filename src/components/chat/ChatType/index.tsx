import React, { useState } from 'react';
import {Box, ListItemButton, ListItemText} from "@mui/material";
import {KeyboardArrowDown, Search} from "@mui/icons-material";
import Conversation from "@/components/chat/Conversation";
import {getChatSnippet} from "@/utils/obj-helper";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";
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
    const userData = useAppSelector(selectUserData)

    return (
        <div className={styles.wrapper}>
            <h3>{type.toUpperCase()} chat</h3>
            <SearchBar placeholder='search...' isActive={isSearchActive} setActive={setIsSearchActive} searchType={type} />
            {!isSearchActive ? chats.length > 0 ?
                chats.map((chat: IChat) => <Conversation key={chat.id} chat={chat} />)
                 : <div>You have no {type} chats, maybe create one?</div> : null
            }
        </div>
    );
};

export default ChatType;
