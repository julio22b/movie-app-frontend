import React from 'react';

const Bio: React.FC<{ bio: string }> = ({ bio }) => {
    return (
        <article className="bio">
            <h4 className="h4-subtitle">BIO</h4>
            <p dangerouslySetInnerHTML={{ __html: bio }}></p>
        </article>
    );
};

export default Bio;
