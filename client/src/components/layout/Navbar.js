import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth/authContext';
import BugContext from '../../context/bug/bugContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const bugContext = useContext(BugContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearBugs, getBugs } = bugContext;

    const handleClick = () => {
        logout();
        clearBugs();
    };

    const authLinks = (
        <Fragment>
            <li className='self-center mr-4 text-2xl'>
                {/*this must be ternary conditional due to async load*/}
                {user ? `Welcome ${user.name}` : null}
            </li>
            <li className='self-center m-2 cursor-pointer'>
                <button onClick={getBugs} className='hover:text-purple-300 flex flex-col items-center'>
                    <FontAwesomeIcon icon='home' />
                    <p>Home</p>
                </button>
            </li>
            <button
                className='hover:text-purple-300 flex flex-col items-center self-center cursor-pointer m-2'
                onClick={handleClick}>
                <FontAwesomeIcon icon='sign-out-alt' />
                <p>Logout</p>
            </button>
        </Fragment>
    );

    const guestLinks = (
        <li className='self-center m-2'>
            <Link to='/login'>
                <div className='hover:text-purple-300 flex flex-col items-center'>
                    <FontAwesomeIcon icon='sign-in-alt' />
                    <p>Login</p>
                </div>
            </Link>
        </li>
    );

    return (
        <nav className='bg-purple-600 p-3 text-white flex flex-row mb-2 font-Equinox absolute w-full'>
            <FontAwesomeIcon
                color='white'
                icon={icon}
                className='mr-4 self-center rotate-45 text-2xl'
            />
            <h1 className='flex flex-col justify-center text-3xl'>{title}</h1>
            <ul className='flex flex-row flex-1 justify-end'>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </nav>
    );
};

Navbar.defaultProps = {
    title: 'Bug Tracker',
    icon: 'bug',
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Navbar;
