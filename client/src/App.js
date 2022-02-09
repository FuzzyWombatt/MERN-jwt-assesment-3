import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBug,
    faFolderPlus,
    faHome,
    faInfoCircle,
    faQuestion,
    faSearch,
    faSignInAlt,
    faSignOutAlt,
    faUndoAlt,
    faWindowClose,
    faTrashAlt,
    faArrowRight,
    faArrowLeft,
    faExchangeAlt,
    faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoutes from './components/routing/PrivateRoutes';
import Bug from './components/bugs/Bug'

import setAuthToken from './utils/setAuthToken';

library.add(
    faBug,
    faInfoCircle,
    faHome,
    faSignOutAlt,
    faSignInAlt,
    faQuestion,
    faWindowClose,
    faFolderPlus,
    faSearch,
    faUndoAlt,
    faTrashAlt,
    faArrowRight,
    faArrowLeft,
    faExchangeAlt,
    faTimesCircle
);

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    exact path='/'
                    element={<PrivateRoutes component={Home} />}
                />
                <Route exact path='/bugs/:_id' element={<PrivateRoutes component={Bug} />}/>
                <Route exact path='/about' element={<About />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
