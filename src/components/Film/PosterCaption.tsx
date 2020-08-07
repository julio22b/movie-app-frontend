import React from 'react';

interface PosterCaptionProps {
    watches: number;
    likes: number;
}

const PosterCaption: React.FC<PosterCaptionProps> = ({ watches, likes }) => {
    return (
        <figcaption>
            <div>
                <i className="watches"></i>
                <span>{watches ? watches : 0}</span>
                <span className="description">
                    Watched by {watches} {watches === 1 ? 'member' : 'members'}
                </span>
            </div>
            <div>
                <i className="likes"></i>
                <span>{likes ? likes : 0}</span>
                <span className="description">
                    Liked by {likes} {likes === 1 ? 'member' : 'members'}
                </span>
            </div>
        </figcaption>
    );
};

export default PosterCaption;
