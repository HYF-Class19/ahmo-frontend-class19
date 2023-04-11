import React from 'react'
import styles from './ChatHeader.module.scss'
import { Avatar, IconButton } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

interface ChatHeaderProps {
  setSettingOpen: Function
}

const ChatHeader: React.FC<ChatHeaderProps> = ({setSettingOpen}) => {
  return (
    <div className={styles.header}>
        <div className={styles.chatInfo}>
            <Avatar sx={{width: '50px', height: '50px'}}>
                G
            </Avatar>
            <p>Alex</p>
        </div>
       <IconButton onClick={() => setSettingOpen(true)} color={'warning'} sx={{ mr: '20px'}}>
        <SettingsOutlinedIcon sx={{width: '30px', height: '30px',}} />
       </IconButton>
    </div>
  )
}

export default ChatHeader