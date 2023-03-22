import React from 'react';
import clsx from "clsx";
import styles from './Message.module.scss'
import {Avatar} from "@mui/material";
import {format} from "timeago.js";

interface MessageProps {
    isMy?: boolean;
    message: any;
}

const Message: React.FC<MessageProps> = ({isMy, message}) => {
    return (
        <div className={clsx(styles.message, isMy && styles.my)}>
            <div className={styles.messageContent}>
                <Avatar>{message.sender.fullName[0]}</Avatar>
                <div className={styles.timeAgo}>
                    {format(message.createdAt)}
                </div>
            </div>
            <div className={styles.messageText}>
                {message.text}
            </div>
        </div>
    );
};

export default Message;