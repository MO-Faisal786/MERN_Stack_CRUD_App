import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
    return (
        <>

            <div className='notfound'>

                <h1 className='notfound-404'>404</h1>
                <div className='content'>
                <h2>We are sorry page not found</h2>
                <p className='para'>
                    The page you are looking for might have been removed had its name changed is temorarily unavailable.
                </p>
                <NavLink to='/'>Back to homepage</NavLink>
                </div>
            </div>

        </>
    );
};

export default Error;