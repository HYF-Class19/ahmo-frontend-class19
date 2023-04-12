import React from 'react';
import clsx from "clsx";
import styles from './Message.module.scss'
import {Avatar} from "@mui/material";
import {format} from "timeago.js";
import CustomAvatar from '@/components/shared/CustomAvatar';

interface MessageProps {
    isMy?: boolean;
    isAvatarUnvisible: boolean;
    message: any;
}

const Message: React.FC<MessageProps> = ({isMy, isAvatarUnvisible, message}) => {
    return (
       <div className={styles.messageWrapper}>
            <div className={clsx(styles.avatar, isAvatarUnvisible && styles.isUnvisible)}>
              <CustomAvatar user={message.sender} />
            </div>
            <div className={clsx(styles.message, isMy && styles.my)}>
  <div className={styles.messageText}>
    {message.text}
  </div>
  <div className={styles.messageMeta}>
    <div className={styles.timeAgo}>
      {format(message.createdAt)}
    </div>
  </div>
</div>
       </div>
    );
};

export default Message;
