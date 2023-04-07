import React from 'react'
import styles from './SelectChatTemplate.module.scss'
import clsx from 'clsx'


interface SelectChatTemplateProps {
    typeOfChat: string
}

const SelectChatTemplate: React.FC<SelectChatTemplateProps> = ({typeOfChat}) => {
  
    return (
    <>
        <div className={clsx(styles.wrapper, typeOfChat === 'game' ? styles.game : styles.chat)}>
            <h3>{typeOfChat === 'game' ? 'Select a game to start playing' : 'Select a chat to start messaging'}</h3>
        </div>
        <div className={styles.overlay}></div>
    </>
  )
}

export default SelectChatTemplate