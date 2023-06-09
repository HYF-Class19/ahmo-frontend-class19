import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { IChat } from "@/models/IChat";
import { IUser } from "@/models/IUser";
import {
  useCreateGroupMutation,
  useFetchChatsQuery,
} from "@/services/chatService";
import { setActiveChat } from "@/store/slices/chatSlice";
import { selectUserData } from "@/store/slices/userSlice";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import CustomAvatar from "../CustomAvatar";

interface SeacrhResultProps {
  users?: IUser[];
  chats?: IChat[];
  isLoading: boolean;
  setActive: Function;
}

const SearchResult: React.FC<SeacrhResultProps> = ({
  users,
  chats,
  isLoading,
  setActive,
}) => {
  const { data, error } = useFetchChatsQuery();
  const userData = useAppSelector(selectUserData);
  const [directChats, setDirectChats] = useState<IChat[]>();
  const [createGroup, result] = useCreateGroupMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      setDirectChats(data.filter((chat) => chat.type === "direct"));
    }
  }, [data]);

  const openChat = async (data: { user?: IUser; chat?: IChat }) => {
    if (data.user && directChats) {
      try {
        const directChat = directChats.find((chat) =>
          chat.members.find((m) => m.user.id === data.user?.id)
        );

        if (directChat) {
          dispatch(setActiveChat(directChat));
          setActive(false);
        } else {
          const members = [userData?.id, data.user.id].join(",");
          const res = await createGroup({
            type: "direct",
            name: data.user.fullName,
            members,
          });
          // @ts-ignore
          const newChat = res.data;
          if (newChat) {
            dispatch(setActiveChat(newChat));
            setActive(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else if (data.chat) {
      dispatch(setActiveChat(data.chat));
      setActive(false);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        cursor: "pointer",
      }}
    >
      {isLoading && (
        <ListItem>
          <ListItemText primary="Loading..." />
        </ListItem>
      )}
      {users ? (
        users.length > 0 ? (
          <>
            <li>
              <h3>People</h3>
            </li>
            {users.map((user) => (
              <ListItem
                key={user.id}
                secondaryAction={
                  <IconButton onClick={() => openChat({ user })} edge="end">
                    <SendIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <CustomAvatar user={user} />
                </ListItemAvatar>
                <ListItemText primary={user.fullName} secondary={user.email} />
              </ListItem>
            ))}
          </>
        ) : (
          <>
            <li>
              <h3>People</h3>
            </li>
            <ListItem>
              <ListItemText
                primary="No users found"
                secondary="Try enter other name"
              />
            </ListItem>
          </>
        )
      ) : null}
      {chats ? (
        chats.length > 0 ? (
          <>
            <li>
              <h3>Chats</h3>
            </li>
            {chats.map((chat) => (
              <ListItem
                key={chat.id}
                secondaryAction={
                  <IconButton onClick={() => openChat({ chat })} edge="end">
                    <SendIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <CustomAvatar chat={chat} />
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={chat?.lastMessage?.text}
                />
              </ListItem>
            ))}
          </>
        ) : (
          <>
            <li>
              <h3>Chats</h3>
            </li>
            <ListItem>
              <ListItemText
                primary="No groups found"
                secondary="Try enter other name"
              />
            </ListItem>
          </>
        )
      ) : null}
    </List>
  );
};

export default SearchResult;
