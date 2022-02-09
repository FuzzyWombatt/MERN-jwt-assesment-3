import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BugContext from '../../context/bug/bugContext';
import Header from '../utils/Header';
import Expire from '../utils/Expire';

const BugItem = ({ bug }) => {
    const bugContext = useContext(BugContext);

    const { asignee, title, _id, date} = bug;

    const handleClick = () => {
        bugContext.deleteBug(_id);
    };

    return (
        <div className='flex flex-col border-2 rounded-md'>
            <Header header={`Bug: ${_id}`} padding={'p-1'}/>
            <div className=' grid grid-cols-2 pr-4 pl-4'>
                <section className='mr-2 text-center'>
                    <h3>Expires In:</h3>
                    <Expire date={date}/>
                </section>
                <section className='flex flex-col justify-center'>
                    <p className='mb-2'>Name: {title}</p>
                    <p>Asignee: {asignee}</p>
                </section>
            </div>
            <div className=' mt-2 w-full grid grid-cols-2 gap-x-4 pr-4 pl-4 pb-4'>
                <Link
                    className='bg-gray-600 text-center text-white border-2 hover:bg-gray-200 hover:text-black block pt-1 pb-1'
                    to={`/bugs/${_id}`}>
                    More <FontAwesomeIcon icon='arrow-right' className='ml-2' />
                </Link>
                <button
                    className='bg-gray-600 text-center text-white border-2 hover:bg-gray-200 hover:text-black block pt-1 pb-1'
                    onClick={() => handleClick()}>
                    Delete <FontAwesomeIcon icon='trash-alt' className='ml-2' />
                </button>
            </div>
        </div>
    );
};

BugItem.propTypes = {
    bug: PropTypes.object.isRequired,
};


export default BugItem;
