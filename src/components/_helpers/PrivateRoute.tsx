import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute: React.FC<{ render: any; path: string; exact: boolean }> = ({
    render: Component,
    ...props
}) => {
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);
    useEffect(() => {
        const user = localStorage.getItem('filmlyCurrentUser');
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);
    if (authenticated === null) {
        return <></>;
    }
    return (
        <Route
            {...props}
            render={(props) => (authenticated ? <Component {...props} /> : <Redirect to={'/'} />)}
        ></Route>
    );
};
export default PrivateRoute;
