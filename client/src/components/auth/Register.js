import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
    });
    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (error === 'User already exists') {
            setAlert(error);
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const { name, email, password, passwordCheck } = user;

    const handleChange = (eve) => {
        setUser({ ...user, [eve.target.name]: eve.target.value });
    };

    const handleSubmit = (eve) => {
        eve.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields');
        } else if (password !== passwordCheck) {
            setAlert('Please make sure both passwords match');
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };

    if (isAuthenticated) return <Navigate to='/' />;

    return (
        <div className='grid h-full pt-24 bg-purple-400'>
            <div className='flex flex-col bg-.3 w-400 self-center justify-self-center rounded-lg'>
                <h1 className='text-center text-2xl font-Equinox text-white  w-full pt-2'>
                    Account Register
                </h1>
                <form className='pt-4 pb-4 pr-10 pl-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col pt-4 mb-4 relative'>
                        <input
                            required
                            className='border-b-2 bg-transparent text-white focus:outline-none focus:border-purple-300'
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                        />
                        <label className='absolute text-white' htmlFor='email'>
                            {'Name'.split('').map((letter, ind) => {
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
                    <div className='flex flex-col pt-4 mb-4 relative'>
                        <input
                            required
                            className='border-b-2 bg-transparent text-white focus:outline-none focus:border-purple-300'
                            type='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                        <label className='absolute text-white' htmlFor='email'>
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
                    <div className='flex flex-col pt-4 mb-4 relative'>
                        <input
                            required
                            className='border-b-2 bg-transparent text-white focus:outline-none focus:border-purple-300'
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                        />
                        <label
                            className='absolute text-white'
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
                    <div className='flex flex-col pt-4 mb-8 relative'>
                        <input
                            required
                            className='border-b-2 bg-transparent text-white focus:outline-none focus:border-purple-300'
                            type='password'
                            name='passwordCheck'
                            value={passwordCheck}
                            onChange={handleChange}
                        />
                        <label
                            className='absolute text-white'
                            htmlFor='password'>
                            {'Confirm Password'.split('').map((letter, ind) => {
                                let transDelay = ind * 40;

                                return (
                                    <span
                                        key={uuidv4()}
                                        className='whitespace-pre'
                                        style={{
                                            transitionDelay: `${transDelay}ms`,
                                        }}>
                                        {letter}
                                    </span>
                                );
                            })}
                        </label>
                    </div>
                    <Alerts />
                    <div>
                        <input
                            className='w-full pt-2 pb-2 bg-purple-600 text-white cursor-pointer font-Equinox hover:bg-purple-300'
                            type='submit'
                            value='Register'
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
