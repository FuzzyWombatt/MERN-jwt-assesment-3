import React, { useState, useContext } from 'react';
import BugContext from '../../context/bug/bugContext';
import AlertContext from '../../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alerts from '../layout/Alerts';

const Search = () => {
    const bugContext = useContext(BugContext);
    const alertContext = useContext(AlertContext);

    const [text, setText] = useState('');
    const [alert, showAlert] = useState(false)

    const {searchBugs} = bugContext
    const {setAlert} = alertContext

    const onChange = (eve) => {
        setText(eve.target.value);
    };

    const onSubmit = (eve) => {
        eve.preventDefault();
        if (text === '') {
            showAlert(true)
            setAlert('Please enter a valid search query');
            setTimeout(() => showAlert(false), 2500)
        } else {
            searchBugs(text);
            setText('');
        }
    };

    return (
        <div className='self-center flex flex-col w-11/12'>
            {alert ? <Alerts /> : null}
            <form className='flex flex-col' onSubmit={onSubmit}>
                <input
                    className='border-2 mb-4 mt-4'
                    type='text'
                    name='text'
                    placeholder='Search Items by name...'
                    value={text}
                    onChange={onChange}></input>
                <button
                    className='text-white bg-gray-600 mb-4 border-2 p-1 cursor-pointer hover:bg-gray-200 hover:text-black'
                    type='submit'>
                    Search <FontAwesomeIcon icon='search' className='ml-2' />
                </button>
            </form>
        </div>
    );
};

export default Search;
