import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatMenu.module.scss'
import ChatType from "@/components/chat/ChatType";
import {IChat} from "@/models/IChat";
import { useAppDispatch, useAppSelector } from '@/hooks/useAppHooks';
import { selectMenu, setMenu } from '@/store/slices/menuSlice';

interface ChatMenuProps {
    chats: IChat[]
    selected: 'game' | 'direct' | 'group' | 'all'
}

const ChatMenu: React.FC<ChatMenuProps> = ({chats, selected}) => {
    const [isSearchActive, setIsSearchActive] = useState(false)
    const menu = useAppSelector(selectMenu)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setMenu(chats))
    }, [chats])

    return (
        <div className={styles.menu} onClick={() => setIsSearchActive(false)}>
            {selected === 'all' ? <ChatType isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} chats={menu} type={selected} />
                :
                (
                    <ChatType isSearchActive={isSearchActive} setIsSearchActive={setIsSearchActive} chats={menu.filter((item: any) => item.type === selected)} type={selected} />
                )
           }
        </div>
    );
};

export default ChatMenu;
