import React from 'react';
import styles from './ChatMenu.module.scss'
import ChatType from "@/components/chat/ChatType";
import {IChat} from "@/models/IChat";

interface ChatMenuProps {
    chats: IChat[]
    selected: 'game' | 'all'
}

const ChatMenu: React.FC<ChatMenuProps> = ({chats, selected}) => {

    return (
        <div className={styles.menu}>
            {selected === 'all' ? ['group', 'direct'].map((type: any, i) => (
                chats && <ChatType key={i} chats={chats.filter((item: any) => item.type === type)} type={type} />
                ))
                :
                (
                    <ChatType chats={chats.filter((item: any) => item.type === 'game')} type={'game'} />
                )
           }
        </div>
    );
};

export default ChatMenu;
