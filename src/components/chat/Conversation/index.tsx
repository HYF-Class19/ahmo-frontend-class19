import React from 'react';
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {getLastMessage} from "@/utils/obj-helper";
import {useAppDispatch} from "@/hooks/useAppHooks";
import {setActiveChat} from "@/store/slices/chatSlice";

interface ConversationProps {
    item: any
}

const Conversation: React.FC<ConversationProps> = ({item}) => {
    const dispatch = useAppDispatch()

    const activateChat = () => {
        console.log(item)
        dispatch(setActiveChat(item))
    }

    return (
        <ListItem onClick={activateChat} alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{item.attributes.name.slice(0,1)}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={item.attributes.name}
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
                        {` — ${getLastMessage(item)}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default Conversation;
