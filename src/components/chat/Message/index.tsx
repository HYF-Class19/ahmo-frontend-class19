import CustomAvatar from "@/components/shared/CustomAvatar";
import { Skeleton } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { format } from "timeago.js";
import styles from "./Message.module.scss";

interface MessageProps {
  isMy?: boolean;
  isAvatarUnvisible: boolean;
  message: any;
}

const Message: React.FC<MessageProps> = ({
  isMy,
  isAvatarUnvisible,
  message,
}) => {
  return (
    <div className={styles.messageWrapper}>
      {message ? (
        <>
          <div
            className={clsx(
              styles.avatar,
              isAvatarUnvisible && styles.isUnvisible
            )}
          >
            <CustomAvatar user={message.sender} />
          </div>
          <div className={clsx(styles.message, isMy && styles.my)}>
            <div className={styles.messageText}>{message.text}</div>
            <div className={styles.messageMeta}>
              <div className={styles.timeAgo}>{format(message.createdAt)}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Skeleton
            variant="circular"
            sx={{ bgcolor: "#B885F4" }}
            width={40}
            height={40}
          />
          <Skeleton
            variant="text"
            sx={{
              bgcolor: "grey.600",
              opacity: 0.6,
              fontSize: "1rem",
              ml: "15px",
              height: "80px",
              width: "200px",
            }}
          />
        </>
      )}
    </div>
  );
};

export default Message;
