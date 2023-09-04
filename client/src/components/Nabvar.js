import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../App';



const Nabvar = () => {
    const { state, dispatch } = useContext(userContext);

    return (
        <>
            <nav className="navbar">
                <div className='left'>
                    <NavLink className="navbar-icon" to="/">ME<span className='RN'>RN</span></NavLink>
                </div>
                <div className="right">

                    {
                        state ? (
                            <ul className="navbar-ul">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">My Profile</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">LogOut</NavLink>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-ul">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signin">Signin</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Register</NavLink>
                                </li>
                            </ul>
                        )
                    }

                </div>

            </nav>
        </>
    );
};

export default Nabvar;