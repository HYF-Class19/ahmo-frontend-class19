import { IUser } from "@/models/IUser";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SendIcon from '@mui/icons-material/Send';
import { IconButton, ListItemIcon } from "@mui/material";
import { useFetchChatsQuery } from "@/services/chatService";
import { IChat } from "@/models/IChat";

interface SeacrhResultProps {
  data: IUser[];
}

const SearchResult: React.FC<SeacrhResultProps> = ({ data }) => {
    const {data: chats, isLoading, error} = useFetchChatsQuery()
    const [directChats, setDirectChats] = useState<IChat[]>()

    useEffect(() => {
        if(chats) {
            setDirectChats(chats.filter((chat) => chat.type === 'direct'))
        }
    }, [chats])


    const openChat = (user: IUser) => {
        try {
            let isExist = false
            directChats?.forEach(chat => {
                if(chat.members.find(m => m.user.id === user.id)) {
                    isExist = true
                }
            })

            if(isExist) {
                
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
      {data.length > 0 ? data.map((user) => (
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
      )}
    </List>
  );
};

export default SearchResult;
