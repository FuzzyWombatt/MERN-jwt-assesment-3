import React, { useState, useContext, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { setAlert } = alertContext;
    const { loginUser, error, clearErrors, isAuthenticated } = authContext;

    const { email, password } = user;

    useEffect(() => {
        if (error === 'Invalid credentials') {
            setAlert(error);
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error]);

    const handleChange = (eve) => {
        setUser({ ...user, [eve.target.name]: eve.target.value });
    };

    const handleSubmit = (eve) => {
        eve.preventDefault();
        if (password === '' || email === '') {
            setAlert('Please enter all fields');
        } else {
            loginUser({
                email,
                password,
            });
        }
    };

    if (isAuthenticated) return <Navigate to='/' />;

    return (
        <div className='grid h-full pt-24 bg-purple-400'>
            <div className='flex flex-col w-400 bg-.3 rounded-lg self-center justify-self-center'>
                <h1 className='pt-8 pb-4 text-center text-4xl text-white w-full font-Equinox'>
                    Account Login
                </h1>
                <form className='pt-8 pb-4 pr-10 pl-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col relative pt-4 mb-4'>
                        <input
                            required
                            className='border-b-2 bg-transparent text-white focus:outline-none focus:border-purple-300'
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                        <label className='absolute text-white' htmlFor='email'>
                            {/* had issues as an arrow function so just did it here in jsx...yuck */}
                            {'Email'.split('').map((letter, ind) => {
                                let transDelay = ind * 50;

                                return (
                                    <span
                                        key={uuidv4()}
                                        style={{
                                            transitionDelay: `${transDelay}ms`,
                                        }}>
                                        {letter}
                                    </span>
                                );
                            })}
                        </label>
                    </div>
                    <div className='flex flex-col relative pt-6 mb-10'>
                        <input
                            required
                            className='border-b-2 bg-transparent text-white focus:outline-none focus:border-purple-300'
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                        <label
                            className='absolute  text-white'
                            htmlFor='password'>
                            {'Password'.split('').map((letter, ind) => {
                                let transDelay = ind * 50;

                                return (
                                    <span
                                        key={uuidv4()}
                                        style={{
                                            transitionDelay: `${transDelay}ms`,
                                        }}>
                                        {letter}
                                    </span>
                                );
                            })}
                        </label>
                    </div>
                    <div>
                        <Alerts />
                        <input
                            className='w-full pt-3 pb-3 bg-purple-600 text-white cursor-pointer font-Equinox hover:bg-purple-400 mb-10 rounded-md'
                            type='submit'
                            value='Login'
                        />
                    </div>
                    <div className='text-center text-xl text-white'>
                        <span className='font-Equinox whitespace-pre'>
                            Dont have an account?{' '}
                        </span>
                        <Link to='/register'>
                            <p className='hover:text-purple-300 inline-block'>
                                Register
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
