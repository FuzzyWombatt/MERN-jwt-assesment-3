import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BugContext from '../../context/bug/bugContext';
import BugForm from '../utils/BugForm'
import Header from '../utils/Header';
import Expire from '../utils/Expire'
import Spinner from '../layout/Spinner'
 
const Bug = () => {
    const bugContext = useContext(BugContext);
    const { _id } = useParams();

    const { bug, loading } = bugContext;

    useEffect(() => {
        bugContext.getBug(_id);
        //eslint-disable-next-line
    }, []);

    const {
        title,
        description,
        asignee,
        date,
    } = bug;

    console.log(bug)
    

    if(loading) return <Spinner />

    return (
            <div className='p-24 w-11/12 self-center'>
                <div className='w-full mb-4 mt-2'>
                    <Link
                        to='/'
                        className=' bg-gray-600 pt-2 pb-2 pr-6 pl-6 text-center text-white border-2 hover:bg-gray-200 hover:text-black'>
                        <FontAwesomeIcon icon='arrow-left' /> Back to search
                    </Link>
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-4'>
                    <div className='mb-4'>
                        <BugForm
                            header='Bug Modification Form'
                            type='modify'
                            button='Modify Bug'
                            id={_id}
                            icon='exchange-alt'
                        />
                    </div>
                    <div className='flex flex-col border-2 mb-4 col-span-2'>
                        <Header
                            header='Bug Information'
                            className='col-span-2'
                        />
                        <div className='grid grid-cols-3 h-full'>
                            <div className='flex flex-col text-center items-center col-span-1 justify-center '>
                                <h1 className='mb-4 lg:text-3xl'>
                                    Expires In:
                                    <Expire date={date}/>
                                </h1>
                            </div>
                            <div className='flex flex-col pl-8 col-span-2 justify-center'>
                                <p className='lg:text-xl mb-3'>Id: {_id}</p>
                                <p className='lg:text-xl mb-3'>Name: {title}</p>
                                <p className='lg:text-xl mb-3'>
                                    Description: {description}
                                </p>
                                <p className='lg:text-xl mb-3'>
                                    Asignee: {asignee}
                                </p>
                                <p className='lg:text-xl mb-3'>
                                    Date: {date}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default Bug;
