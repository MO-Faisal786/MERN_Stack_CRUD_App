import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signin from '../images/signin.jpg';
import { userContext } from '../App';

const Lohin = () => {
    const { state, dispatch } = useContext(userContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginMe = async (e) => {
        e.preventDefault();
        try {
            
        
        const res = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await res.json();

        if (res.status !== 201 || !data) {
            dispatch({ type: "USER", payload: false })
            alert(data.message);
        } else {
            dispatch({ type: "USER", payload: true })
            alert(data.message);
            navigate('/');

        }
    } catch (error) {
        dispatch({ type: "USER", payload: false })
            alert("Login not successfull..");
            console.log(error);
            navigate('/signin');
    }
    }


    return (
        <>
            <sectoion className='signin'>

            <div className='form-box'>
                <div className='signin-image'>

                    <img src={signin} alt='sign in img'/>

                    
                </div>
                <div className='signin-form-container'>
                    <div className='heading'>
                        <h2 className='form-tittle'>Sign In</h2>
                    </div>
                    <form method='POST' className='signin-form'>
                        <div className='form-group'>
                            <label htmlFor='email'>
                                <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type='email' name='email' id='email' autoComplete='off'
                                placeholder='your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>
                                <i className="zmdi zmdi-lock"></i>
                            </label>
                            <input type='password' name='password' id='password' autoComplete='off'
                                placeholder='your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group form-button'>
                            <input type='submit' name='signup' id='Btn' className='form-submit' value="Sign in" onClick={loginMe} />
                            
                        </div>
                        <div className='form-group'>
                        <NavLink to='/signup' className='signin-image-link' >I am not already registered!</NavLink>
                            
                        </div>
                        
                    </form>
                </div>

                </div>
            </sectoion>
        </>
    );
};

export default Lohin;