import React from 'react'
import styles from './ChatHeader.module.scss'
import { Avatar, IconButton } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const ChatHeader = () => {
  return (
    <div className={styles.header}>
        <div className={styles.chatInfo}>
            <Avatar sx={{width: '50px', height: '50px'}}>
                G
            </Avatar>
            <p>Alex</p>
        </div>
       <IconButton color={'warning'} sx={{ mr: '20px'}}>
        <SettingsOutlinedIcon sx={{width: '30px', height: '30px',}} />
       </IconButton>
    </div>
  )
}

export default ChatHeader