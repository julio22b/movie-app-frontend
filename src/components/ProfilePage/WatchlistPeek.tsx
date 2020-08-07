import React from 'react';
import { MovieInstance } from '../../features/types';

const WatchlistPeek: React.FC<{ watchlist: MovieInstance[] }> = ({ watchlist }) => {
    return (
        <div className="watchlist-peek">
            <h4 className="h4-subtitle">
                Watchlist <span>{watchlist.length}</span>
            </h4>
            <div>LITTLE 6 POSTERS HERE</div>
        </div>
    );
};

export default WatchlistPeek;
