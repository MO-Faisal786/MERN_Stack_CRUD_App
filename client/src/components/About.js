import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userContext } from '../App';
import faisal from '../images/Faisal.jpg';

const About = () => {
    const {state, dispatch} = useContext(userContext);
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const aboutMePage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });
            // console.log(res);
            const data = await res.json();
            // console.log(data);

            if (res.status !== 200 || !data) {
                const error = new Error(res.error);
                throw error;
            } else {
                setUserData(data);
            }
        } catch (error) {
            navigate('/signin');
        }

    }

    useEffect(() => {
        aboutMePage();
    }, []);

    dispatch({type:'USER', payload:true})

    const color = {
        color: "blue"
    };

    return (
        <>
            <div className="about-container">
                <div className='about-sub-container'>
                    <div className='about-left'>
                        <div className='img'>
                            <img src={faisal} alt='my photo' height={200} />
                        </div>
                        <div className='work-link'>
                            <p className='first'>Work link</p>
                            <p>Youtube</p>
                            <p>Instagram</p>
                            <p>Github</p>
                            <p>Web Developer</p>
                            <p>Figma</p>
                            <p>Software Engineer</p>
                        </div>
                    </div>
                    <form method='GET' className='about-right'>
                        <div className='profile-head'>
                            <h1>{userData.name}</h1>
                            <h2 style={color}>{userData.work}</h2>
                            <p className='profile-rating'>Rankings 1/10</p>
                            <div className='editbtn'>
                                <button type='submit' ><Link className='Btn' to={`/editprofile/${userData._id}`}>Edit Profile</Link></button>
                            </div>
                        </div>
                        <div className='profile-body'>
                            <h2>About Me</h2>
                            <div className='profile-body-box'>
                                <div className='row'>
                                    <div className=''>
                                        <label>user ID</label>
                                    </div>
                                    <div className=''>
                                        <p>{userData._id}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className=''>
                                        <label>{"Name"}</label>
                                    </div>
                                    <div className=''>
                                        <p>{userData.name}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div>
                                        <label>Email</label>
                                    </div>
                                    <div>
                                        <p>{userData.email}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div>
                                        <label>Phone</label>
                                    </div>
                                    <div>
                                        <p>{userData.phone}</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div>
                                        <label>Profession</label>
                                    </div>
                                    <div>
                                        <p>{userData.work}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bottum-7'>
                                <button type='submit' ><Link className='Btn' to={`/delete/${userData._id}`}>Delete Profile</Link></button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )

};

export default About;