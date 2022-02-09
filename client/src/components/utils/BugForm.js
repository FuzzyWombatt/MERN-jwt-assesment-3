import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import BugContext from '../../context/bug/bugContext';
import Alerts from '../layout/Alerts';
import AlertContext from '../../context/alert/alertContext';

const ItemForm = ({header, type, icon, button, id }) => {
    const bugContext = useContext(BugContext);
    const alertContext = useContext(AlertContext);

    const [other, showAlert] = useState(false);

    const [bug, setBug] = useState({
        title: '',
        description: '',
    });


    const { title, description } = bug;

    const handleChange = (eve) => {
        setBug({ ...bug, [eve.target.name]: eve.target.value });
    };

    const handleReset = () => {
        setBug({
            title: '',
            description: '',
        });
    };

    const handleSubmit = (eve) => {
        eve.preventDefault();

        if (type === 'add') {
            if(bug.title === ''){
                showAlert(true);
                alertContext.setAlert('Please enter a title');
                setTimeout(() => showAlert(false), 2500)
            }else if(bug.description === ''){
                showAlert(true);
                alertContext.setAlert('Please enter a description');
                setTimeout(() => showAlert(false), 2500)
            }else{
                bugContext.addBug(bug);
                handleReset();
            }
        } else if (type === 'modify') {
            bugContext.modifyBug(bug, id);
            handleReset();
        }
    };

    return (
        <form
            className='flex flex-col border-2'
            onSubmit={(eve) => handleSubmit(eve)}
            onReset={() => handleReset()}>
            <Header header={header}/>
            <label className='w-11/12 self-center'>Name:</label>
            <input
                className='w-11/12 self-center border-2 mb-3'
                type='text'
                placeholder='Enter a Bug title'
                name='title'
                value={title}
                onChange={(eve) => handleChange(eve)}
            />
            <label className='w-11/12 self-center'>Description:</label>
            <input
                className='w-11/12 self-center border-2 mb-3'
                type='text'
                placeholder='Enter a Description'
                name='description'
                value={description}
                onChange={(eve) => handleChange(eve)}
            />
            <div className='mb-4 self-center w-11/12'>
                {other ? <Alerts /> : null}
            </div>
            <button
                type='reset'
                className='text-white bg-gray-600 mb-4 border-2 p-1 cursor-pointer hover:bg-gray-200 hover:text-black w-11/12 self-center '>
                Clear <FontAwesomeIcon icon='undo-alt' className='ml-2' />
            </button>
            <button
                type='submit'
                className='text-white bg-gray-600 mb-4 border-2 p-1 cursor-pointer hover:bg-gray-200 hover:text-black w-11/12 self-center '>
                {button} <FontAwesomeIcon icon={icon} className='ml-2' />
            </button>
        </form>
    );
};

ItemForm.defaultProps = {
    title: 'Form',
};

ItemForm.propTypes = {
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
};

export default ItemForm;
