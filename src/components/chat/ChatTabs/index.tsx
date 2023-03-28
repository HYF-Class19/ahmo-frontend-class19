import React from 'react';
import styles from './ChatTabs.module.scss'

interface ChatTabsProps {
    selectedType: 'all' | 'game';
    setSelectedType: (type: "game" | "all") => void
    setIsActive: (isActive: boolean) => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({setSelectedType, selectedType, setIsActive}) => {

    return (
        <div className={styles.tabs}>
            <ul>
                <li onClick={() => setSelectedType('all')}>
                   All
                </li>
                <li onClick={() => setSelectedType('game')}>
                    Chat Games
                </li>
                <li onClick={() => setIsActive(true)}>Create {selectedType === 'all' ? 'Group' : "Game"}</li>
            </ul>
        </div>
    );
};

export default ChatTabs;
