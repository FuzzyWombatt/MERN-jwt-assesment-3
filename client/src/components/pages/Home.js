import React from 'react';

import Bugs from '../bugs/Bugs';
import Search from '../bugs/Search';

const Home = () => {
    return (
        <div className='pt-24 flex flex-col'>
            <Search />     
            <Bugs />
        </div>
    );
};

export default Home;
