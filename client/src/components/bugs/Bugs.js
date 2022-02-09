import React, { Fragment, useContext, useEffect } from 'react';

import BugContext from '../../context/bug/bugContext';
import AddBug from './AddBug';
import BugItem from './BugItem';
import Spinner from '../layout/Spinner';

const Bugs = () => {
    const bugContext = useContext(BugContext);

    const { bugs, getBugs, loading } = bugContext;

    useEffect(() => {
        getBugs();
        //eslint-disable-next-line
    },[])

    if(loading) return <Spinner />

    return (
        <Fragment>
            <AddBug />
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center mr-4 ml-4 mb-2 w-11/12 self-center'>
                {bugs.map((bug) => {
                    return <BugItem key={bug._id} bug={bug} />;
                })}
            </div>
        </Fragment>
    );
};

export default Bugs;
