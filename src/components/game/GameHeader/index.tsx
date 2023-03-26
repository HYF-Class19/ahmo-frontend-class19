import React, {useEffect} from 'react';
import styles from './GameHeader.module.scss'
import {Avatar} from "@mui/material";
import {selectActiveChat} from "@/store/slices/chatSlice";
import {useAppSelector} from "@/hooks/useAppHooks";

const GameHeader = () => {
    const activeChat = useAppSelector(selectActiveChat)

    if(!activeChat.activeChat) return null;

    useEffect(() => {
        console.log(activeChat)
    }, []);


    return (
        <header className={styles.header}>
            <div className={styles.chatName}>
                <h3>{activeChat.name}</h3>
            </div>
            <div className={styles.status}>
                <Avatar>
                    {activeChat.members[0].user.fullName[0]}
                </Avatar>
                <div className={styles.score}>
                    <h4>Score:</h4>
                    <p>{activeChat.members[0].score} : {activeChat.members[1].score}</p>
                </div>
                <Avatar>
                    {activeChat.members[1].user.fullName[0]}
                </Avatar>
            </div>
            <div className={styles.chatName}>
                <h2>{activeChat.game}</h2>
            </div>
        </header>
    );
};

export default GameHeader;
