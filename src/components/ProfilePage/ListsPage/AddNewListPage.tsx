import React from 'react';
import NewListForm from './NewListForm';
import DraggableFilmsContainer from './DraggableFilmsContainer';

const AddNewListPage = () => {
    return (
        <div className="new-list-page">
            <NewListForm />
            <DraggableFilmsContainer />
        </div>
    );
};

export default AddNewListPage;
