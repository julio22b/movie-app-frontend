import React from 'react';

interface ActionButtonProps {
    icon_path: string;
    caption: string;
    handleClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon_path, caption, handleClick }) => {
    return (
        <button onClick={handleClick} className="action-btn">
            <img src={icon_path} alt={caption} />
            <figcaption>{caption}</figcaption>
        </button>
    );
};

export default ActionButton;
