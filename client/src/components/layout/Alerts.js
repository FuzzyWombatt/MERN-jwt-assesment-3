import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => {
            return (
                <div key={alert.id} className='self-center bg-gray-100 pt-2 pb-2 pl-2 text-left text-gray-600 w-full mb-2'>
                    <FontAwesomeIcon icon='info-circle' /> {alert.msg}
                </div>
            );
        })
    );
};

export default Alerts;
