import React, { useState } from 'react';
import styles from './ChatMenu.module.scss'
import ChatType from "@/components/chat/ChatType";
import {IChat} from "@/models/IChat";
import { Button } from '@mui/material';

interface ChatMenuProps {
    chats: IChat[]
    selected: 'game' | 'all'
}

const ChatMenu: React.FC<ChatMenuProps> = ({chats, selected}) => {
    const [typeOfChat, setTypeOfChat] = useState<"group" | "direct" | "game">('group')

    return (
        <div className={styles.menu}>
            {selected === 'all' ? 
                <>
                    <ChatType chats={chats.filter((item: any) => item.type === typeOfChat)} type={typeOfChat} />
                    <div className={styles.actions}>
                        <Button onClick={() => setTypeOfChat('group')} variant={typeOfChat === 'group' ? 'contained' : 'outlined'} color='warning'>Groups</Button>
                        <Button onClick={() => setTypeOfChat('direct')} variant={typeOfChat === 'direct' ? 'contained' : 'outlined'} color='warning'>Direct</Button>
                    </div>
                </>
                :
                (
                    <ChatType chats={chats.filter((item: any) => item.type === 'game')} type={'game'} />
                )
           }
        </div>
    );
};

export default ChatMenu;
