import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Expire = ({date}) => {
    //73 hours due to floor
    let time = Math.floor(73 - ((Date.parse(new Date())-Date.parse(date)))/(1000*3600)); 

    return (
        <Fragment >
            {time > 0 ? <div className='text-green-800 font-bold text-xl'>{time} hours</div> : <FontAwesomeIcon color='red' icon='times-circle'/>}
        </Fragment>
    )
}


export default Expire
