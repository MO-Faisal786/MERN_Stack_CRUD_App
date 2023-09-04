import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import signuppic from '../images/Signup.svg';


const Register = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        confirmpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, phone, work, password, confirmpassword } = user;
        try {
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    work: work,
                    password: password,
                    confirmpassword: confirmpassword
                })
            });

            const data = await res.json();
            // console.log(res);
            // console.log(res.status);

            if (res.status === 422 || !data) {
                alert("Registration unsuccessful...");
                console.log("no success");
            } else {
                alert("Registration successfull...");
                console.log("Registration successfull...");
                navigate('/signin');
            }
        } catch (error) {
            console.log(error.message);
        }

    }


    return (
        <>
            <section className='signin'>
                <div className='form-box'>
                    <div className='signin-image'>

                        <img src={signuppic} alt='register img'/>

                    </div>
                    <div className='signin-form-container'>
                        <div className='heading'>
                            <h2 className='form-tittle'>Sign Up</h2>
                        </div>
                        <form method='POST' className='signin-form' id='register-form'>
                            <div className='form-group'>
                                <label htmlFor='name'>
                                    <i className="zmdi zmdi-account"></i>
                                </label>
                                <input type='text' name='name' id='name' autoComplete='off'
                                    value={user.name}
                                    onChange={handleInputs}
                                    placeholder='your name'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='email'>
                                    <i className="zmdi zmdi-email"></i>
                                </label>
                                <input type='email' name='email' id='email' autoComplete='off'
                                    value={user.email}
                                    onChange={handleInputs}
                                    placeholder='your email'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='phone'>
                                    <i className="zmdi zmdi-phone"></i>
                                </label>
                                <input type='tel' name='phone' id='phone' autoComplete='off'
                                    value={user.phone}
                                    onChange={handleInputs}
                                    placeholder='your phone'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='work'>
                                    <i className="zmdi zmdi-slideshow"></i>
                                </label>
                                <input type='text' name='work' id='work' autoComplete='off'
                                    value={user.work}
                                    onChange={handleInputs}
                                    placeholder='your profession'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>
                                    <i className="zmdi zmdi-lock"></i>
                                </label>
                                <input type='password' name='password' id='password' autoComplete='off'
                                    value={user.password}
                                    onChange={handleInputs}
                                    placeholder='your password'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='cpassword'>
                                    <i className="zmdi zmdi-lock"></i>
                                </label>
                                <input type='password' name='confirmpassword' id='confirmpassword' autoComplete='off'
                                    value={user.confirmpassword}
                                    onChange={handleInputs}
                                    placeholder='confirm password'
                                />
                            </div>
                            <div className='form-group form-button'>
                                <input type='submit' name='signup' id='Btn' className='form-submit' value="Register" onClick={PostData} />
                            </div>
                            <div className='form-group form-button'>
                                <NavLink to='/signin' className='signup-image-link' >I am already registered!</NavLink>

                            </div>
                        </form>



                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;