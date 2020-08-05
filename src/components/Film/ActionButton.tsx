import React from 'react';

interface ActionButtonProps {
    icon_path: string;
    caption: string;
    marked: boolean;
    handleClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon_path, caption, marked, handleClick }) => {
    return (
        <button onClick={handleClick} className="action-btn">
            <img src={icon_path} alt={caption} />
            <p className={marked ? 'marked' : ''}>{caption}</p>
        </button>
    );
};

export default ActionButton;
