import React from 'react';
import styles from './ChatTabs.module.scss'

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
                    All
                </li>
                <li onClick={() => setSelectedType('direct')}>
                    Direct chats
                </li>
                <li onClick={() => setSelectedType('group')}>
                    Groups
                </li>
                <li onClick={() => setSelectedType('game')}>
                    Chat Games
                </li>
                <li onClick={() => setIsActive(true)}>Create {selectedType === 'all' ? 'Chat' : selectedType}</li>
            </ul>
        </div>
    );
};

export default ChatTabs;
