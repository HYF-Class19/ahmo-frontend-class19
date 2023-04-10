import React from 'react';
import styles from './ChatTabs.module.scss'
import { Button } from '@mui/material';

interface ChatTabsProps {
    selectedType: 'group' | 'direct' | 'game' | 'all';
    setSelectedType: (type: any) => void
    setIsActive: (isActive: boolean) => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({setSelectedType, selectedType, setIsActive}) => {

    return (
        <div className={styles.tabs}>
            <ul>
                <li onClick={() => setSelectedType('all')}>
                    <Button color='warning' variant={selectedType === 'all' ? 'contained' : 'text'}>All</Button>
                </li>
                <li onClick={() => setSelectedType('direct')}>
                <Button color='warning' variant={selectedType === 'direct' ? 'contained' : 'text'}>Direct chats</Button>
                </li>
                <li onClick={() => setSelectedType('group')}>
                <Button color='warning' variant={selectedType === 'group' ? 'contained' : 'text'}>Groups</Button>
                </li>
                <li onClick={() => setSelectedType('game')}>
                <Button color='warning' variant={selectedType === 'game' ? 'contained' : 'text'}>Chat Games</Button>
                </li>
                <li onClick={() => setIsActive(true)}>
                <Button color='warning' variant={'outlined'}>Create Chat</Button>
                </li>
            </ul>
        </div>
    );
};

export default ChatTabs;
