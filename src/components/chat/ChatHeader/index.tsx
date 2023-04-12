import React from 'react'
import styles from './ChatHeader.module.scss'
import { Avatar, IconButton } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

interface ChatHeaderProps {
  setSettingOpen: Function
  name: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({setSettingOpen, name}) => {
  return (
    <div className={styles.header}>
        <div className={styles.chatInfo}>
            <Avatar sx={{width: '50px', height: '50px'}}>
                {name[0]}
            </Avatar>
            <p>{name}</p>
        </div>
       <IconButton onClick={() => setSettingOpen(true)} color={'warning'} sx={{ mr: '20px'}}>
        <SettingsOutlinedIcon sx={{width: '30px', height: '30px',}} />
       </IconButton>
    </div>
  )
}

export default ChatHeader