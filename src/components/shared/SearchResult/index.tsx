import { IUser } from "@/models/IUser";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SendIcon from '@mui/icons-material/Send';
import { IconButton, ListItemIcon } from "@mui/material";
import { useCreateGroupMutation, useFetchChatsQuery } from "@/services/chatService";
import { IChat } from "@/models/IChat";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppHooks";
import { setActiveChat, setGameChat } from "@/store/slices/chatSlice";
import { selectUserData } from "@/store/slices/userSlice";

interface SeacrhResultProps {
  users?: IUser[];
  chats?: IChat[];
  isLoading: boolean;
  setActive: Function;
}

const SearchResult: React.FC<SeacrhResultProps> = ({ users, chats, isLoading, setActive }) => {
    const {data, error} = useFetchChatsQuery()
    const userData = useAppSelector(selectUserData)
    const [directChats, setDirectChats] = useState<IChat[]>()
    const [createGroup, result] = useCreateGroupMutation()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(data) {
            setDirectChats(data.filter((chat) => chat.type === 'direct'))
        }
    }, [data])


    const openChat = async (data: IUser) => {
        try {
            const chat = directChats?.find(chat => 
                chat.members.find(m => m.user.id === data.id)
            )

            if(chat) {
              dispatch(setActiveChat(chat))
              setActive(false)
            } else {
              const members = [userData?.id, data.id].join(',')
              await createGroup({type: 'direct', name: data.fullName, members })
              if(result.data) {
                console.log(result.data)
                dispatch(setActiveChat(result.data))
              }
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <List
      sx={{
        width: "90%",
        bgcolor: "background.paper",
        borderBottom: "1px solid gray",
        cursor: 'pointer'
      }}
    >
      {isLoading && (
        <ListItem>
      <ListItemText primary='Loading...' />
       </ListItem>
      )}
      {users ?
       users.length > 0 ? users.map((user) => (
        <ListItem key={user.id} secondaryAction={
            <IconButton onClick={() => openChat(user)} edge="end">
              <SendIcon />
            </IconButton>
          }>
          <ListItemAvatar>
            <Avatar>{user.fullName![0]}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.fullName} secondary={user.email} />
        </ListItem>
      )) : (
        <ListItem>
        <ListItemText primary='No users found' secondary='Try enter other name' />
      </ListItem>
      ) : (
        chats && chats.length > 0 ? chats.map((chat) => (
          <ListItem key={chat.id} secondaryAction={
              <IconButton edge="end">
                <SendIcon />
              </IconButton>
            }>
            <ListItemAvatar>
              <Avatar>{chat.name![0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={chat.name} secondary={chat?.lastMessage?.text} />
          </ListItem>
        )) : (
          <ListItem>
          <ListItemText primary='No users found' secondary='Try enter other name' />
        </ListItem>
        ))}
    </List>
  );
};

export default SearchResult;
