import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Context } from '../context/Context';


export const PrivateRoute = ({ children }) => {

    const { user } = useContext(Context);
    const { pathname, search } = useLocation();

    const lastPath = pathname + search;
    localStorage.setItem('lastPath', lastPath);


    return (user)
        ? children
        : <Navigate to="/login" />
}