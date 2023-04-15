import CustomAvatar from "@/components/shared/CustomAvatar";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IChat } from "@/models/IChat";
import {
  selectActiveChat,
  setActiveChat,
  setGameChat,
} from "@/store/slices/chatSlice";
import { selectIsAuth, selectUserData } from "@/store/slices/userSlice";
import { getDirectName, getLastMessage } from "@/utils/chatHelpers";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import React from "react";
import styles from "./Conversation.module.scss";

interface ConversationProps {
  chat?: IChat;
}

const Conversation: React.FC<ConversationProps> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const activeChat = useAppSelector(selectActiveChat);
  const isAuth = useAppSelector(selectIsAuth);

  const activateChat = () => {
    if (!chat || activeChat?.activeChat === chat.id) return;
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
        activeChat.activeChat === chat?.id && styles.active
      )}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        {chat ? (
          <CustomAvatar
            chat={chat.type !== "direct" ? chat : undefined}
            user={
              chat.type === "direct"
                ? getDirectName(userData!.id, chat.members)
                : undefined
            }
          />
        ) : (
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          chat ? (
            chat.name || getDirectName(userData!.id, chat.members)?.fullName
          ) : (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 4 }}
            />
          )
        }
        secondary={
          chat ? (
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
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />
    </ListItem>
  );
};

export default Conversation;
