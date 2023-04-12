import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  getDirectName,
  getLastMessage,
  getReceivers,
} from "@/utils/chatHelpers";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import {
  selectActiveChat,
  setActiveChat,
  setGameChat,
} from "@/store/slices/chatSlice";
import { IChat } from "@/models/IChat";
import styles from "./Conversation.module.scss";
import { selectUserData } from "@/store/slices/userSlice";
import clsx from "clsx";
import CustomAvatar from "@/components/shared/CustomAvatar";

interface ConversationProps {
  chat: IChat;
}

const Conversation: React.FC<ConversationProps> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const activeChat = useAppSelector(selectActiveChat);

  const activateChat = () => {
    if (activeChat?.activeChat === chat.id) return;
    if (chat.type === "game") {
      dispatch(setGameChat(chat));
    } else {
      dispatch(setActiveChat(chat));
    }
  };

  return (
    <ListItem
      onClick={activateChat}
      className={clsx(
        styles.item,
        activeChat.activeChat === chat.id && styles.active
      )}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <CustomAvatar chat={chat.type !== 'direct' ? chat : undefined} user={chat.type === 'direct' ? getDirectName(userData!.id, chat.members) : undefined}  />
      </ListItemAvatar>
      <ListItemText
        primary={
          chat.name || getDirectName(userData!.id, chat.members).fullName
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="black"
            >
              {chat.type === "game" && "game is active"}
              {chat.type !== "game" &&
                getLastMessage(chat.lastMessage, userData?.id)}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Conversation;
