import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<{ render: any; path: string; exact: boolean }> = ({
    render: Component,
    ...props
}) => {
    const authenticated = !!localStorage.getItem('filmlyCurrentUser');
    return (
        <Route
            {...props}
            render={(props) => (authenticated ? <Component {...props} /> : <Redirect to={'/'} />)}
        ></Route>
    );
};
export default PrivateRoute;
