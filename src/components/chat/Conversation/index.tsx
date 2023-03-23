import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {getLastMessage} from "@/utils/obj-helper";
import {useAppDispatch} from "@/hooks/useAppHooks";
import {setActiveChat, setGameChat} from "@/store/slices/chatSlice";
import {IChat} from "@/models/IChat";

interface ConversationProps {
    chat: IChat
}

const Conversation: React.FC<ConversationProps> = ({chat}) => {
    const dispatch = useAppDispatch()

    const activateChat = () => {
        if(chat.type === 'game') {
            dispatch(setGameChat(chat))
        } else {
            dispatch(setActiveChat(chat))
        }
    }

    return (
        <ListItem onClick={activateChat} style={{cursor: 'pointer'}} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{chat.name.slice(0,1)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={chat.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            to you
                        </Typography>
                        {` — ${chat.lastMessage ? chat.lastMessage.text : 'no messages'}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default Conversation;
