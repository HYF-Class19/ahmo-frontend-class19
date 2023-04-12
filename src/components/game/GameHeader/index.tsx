import React, {useEffect} from 'react';
import styles from './GameHeader.module.scss'
import {selectActiveChat} from "@/store/slices/chatSlice";
import {useAppSelector} from "@/hooks/useAppHooks";
import CustomAvatar from '@/components/shared/CustomAvatar';

const GameHeader = () => {
    const activeChat = useAppSelector(selectActiveChat)

    if(!activeChat.activeChat) return null;

    return (
        <header className={styles.header}>
            <div className={styles.chatName}>
                <h3>{activeChat.name}</h3>
            </div>
            <div className={styles.status}>
                <CustomAvatar user={activeChat.members[0].user} />
               {activeChat.game !== 'words' &&  <div className={styles.score}>
                    <h4>Score:</h4>
                    <p>{activeChat.members[0]?.score} : {activeChat.members[1]?.score}</p>
                </div>}
                <CustomAvatar user={activeChat.members[1].user} />
            </div>
            <div className={styles.chatName}>
                <h2>{activeChat.game}</h2>
            </div>
        </header>
    );
};

export default GameHeader;
