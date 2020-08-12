import React from 'react';

const NewListForm = () => {
    return (
        <form className="new-list-form">
            <h4 className="h4-subtitle">New List</h4>
            <div className="list-name">
                <label htmlFor="name">Name of list</label>
                <input type="text" required maxLength={30} name="name" />
            </div>
            <div className="list-description">
                <label htmlFor="description">Description</label>
                <textarea name="description" cols={30} rows={5} maxLength={500}></textarea>
            </div>
            <div className="actions-container">
                <div className="add-film">
                    <button className="green-btn" type="button">
                        ADD A FILM
                    </button>
                    <input type="text" placeholder="Enter name of film..."/>
                </div>
                <div className="cancel-save">
                    <button className="cancel" type="button">
                        CANCEL
                    </button>
                    <button className="save green-btn">SAVE</button>
                </div>
            </div>
        </form>
    );
};

export default NewListForm;
