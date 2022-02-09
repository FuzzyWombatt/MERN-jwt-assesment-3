import React, {useContext, useEffect} from 'react'
import { Navigate } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext'
import Spinner from '../../components/layout/Spinner';

const PrivateRoutes = ({component: Component}) => {
    const authContext = useContext(AuthContext)

    const {isAuthenticated,loadUser, loading} = authContext;

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    if (loading) return <Spinner />
    if (isAuthenticated) return <Component />;
    return <Navigate to='/login' />;
}

export default PrivateRoutes
