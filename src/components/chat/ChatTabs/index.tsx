import React from 'react';
import styles from './ChatTabs.module.scss'

interface ChatTabsProps {
    selectedType: number;
    setSelectedType: (type: number) => void
    setIsActive: (isActive: boolean) => void;
}

const ChatTabs: React.FC<ChatTabsProps> = ({setSelectedType, selectedType, setIsActive}) => {
    return (
        <div className={styles.tabs}>
            <ul>
                <li>
                   All
                </li>
                <li>
                    Chat Games
                </li>
                <li onClick={() => setIsActive(true)}>Create Group</li>
            </ul>
        </div>
    );
};

export default ChatTabs;
