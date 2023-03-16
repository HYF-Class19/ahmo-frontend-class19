import React from 'react';
import {Box, ListItemButton, ListItemText} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";
import Conversation from "@/components/chat/Conversation";
import {getChatSnippet} from "@/utils/obj-helper";
import {useAppDispatch, useAppSelector} from "@/hooks/useAppHooks";
import {selectUserData} from "@/store/slices/userSlice";

interface ChatTypeProps {
    data: any,
    type: 'group' | 'direct'
}

const ChatType: React.FC<ChatTypeProps> = ({data, type}) => {
    const [open, setOpen] = React.useState(true);
    const userData = useAppSelector(selectUserData)

    return (
        <Box
            sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
            }}
        >
            <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                    px: 3,
                    pt: 2.5,
                    pb: open ? 0 : 2.5,
                    '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
            >
                <ListItemText
                    primary={type === 'group' ? 'Groups' : 'Direct'}
                    primaryTypographyProps={{
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                        color: 'primary',
                    }}
                    secondary={getChatSnippet(data,userData!.id)}
                    secondaryTypographyProps={{
                        noWrap: true,
                        fontSize: 12,
                        lineHeight: '16px',
                        color: 'black',
                    }}
                    sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                    sx={{
                        mr: -1,
                        opacity: 0,
                        transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                        transition: '0.2s',
                    }}
                />
            </ListItemButton>
            {open &&
                data.map((item: any) => <Conversation key={item.id} item={item} />
                )}
        </Box>
    );
};

export default ChatType;
