import React from 'react'
import styles from './SendIcon.module.scss'
import { IconButton } from '@mui/material'
import Image from 'next/image'

interface SendIconProps {
    disabled?: boolean;
    onClick?: () => void;
  }

  const SendIcon: React.FC<SendIconProps> = ({ disabled, onClick }) => {
    return (
      <IconButton
        disabled={disabled}
        onClick={onClick}
      >
        <Image src='/img/send.svg' width="30" height='30' alt={'Send icon'} />
      </IconButton>
    )
  }

export default SendIcon