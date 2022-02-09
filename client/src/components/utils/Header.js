import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ header, padding }) => {
    return (
        <header className={`bg-purple-600 ${padding} text-white mb-2 font-Equinox-bold text-center`}>
            {header}
        </header>
    );
};

export default Header;

Header.defaultProps = {
    title: 'Header',
    padding: 'p-3',
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    padding: PropTypes.string.isRequired,
};
