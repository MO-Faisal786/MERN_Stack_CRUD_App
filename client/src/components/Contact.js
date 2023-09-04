import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';

const Contact = () => {
    const {state, dispatch} = useContext(userContext);
    const Navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const contactUs = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            // console.log(res);
            const data = await res.json();
            // console.log(data);       
            if(!data || res.status !== 200) {
                dispatch({type:"USER", payload:false});
                const error = new Error("Unauthorised user");
                throw error;
            }else{
                setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
                dispatch({type:"USER", payload:true});
            }
            

        } catch (error) {
            Navigate('/signin');
        }

    }

    useEffect(() => {
        contactUs();
    }, []);

    

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value });
    }


    const submitData = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = userData;

        const res = await fetch('/contact', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, message })
        })

        const data = await res.json();
        if (!data) {
            console.log("message Note sent..");
        } else {
            alert("Message sent...");
            setUserData({ ...userData, message: "" })
        }
    }

    return (
        <div className="contact-container">
            <div className='upper'>
                <div className='detail-box'>
                    <img src='https://img.icons8.com/office/24/000000/iphone.png' alt='Phone' />
                    <div className='detail'>
                        <div className='contact_info_tittle'>
                            Phone
                        </div>
                        <div className='contact_info_text'>
                            +91 708 883 2660
                        </div>
                    </div>
                </div>
                <div className='detail-box'>
                    <img src='https://img.icons8.com/office/24/000000/iphone.png' alt='Phone' />
                    <div className='detail'>
                        <div className='contact_info_tittle'>
                            Email
                        </div>
                        <div className='contact_info_text'>
                            fm704034@gmail.com
                        </div>
                    </div>
                </div>
                <div className='detail-box'>
                    <img src='https://img.icons8.com/office/24/000000/iphone.png' alt='Phone' />
                    <div className='detail'>
                        <div className='contact_info_tittle'>
                            Phone
                        </div>
                        <div className='contact_info_text'>
                            +91 708 883 2660
                        </div>
                    </div>
                </div>
            </div>
            <div className='lower'>

                <div className='contact_form_heading'>
                    Get in touch
                </div>
                <form method='POST' id='contact_form'>
                    <div className='contact_form_name'>
                        <div className='input-field'>
                            <input type='text' 
                                value={userData.name} name='name' onChange={handleInput} placeholder='Your name' required={true} />
                        </div>
                        <div className='input-field'>
                            <input type='email' 
                                value={userData.email} name='email' onChange={handleInput} placeholder='Your email' required={true} />
                        </div>
                        <div className='input-field'>
                            <input type='number'
                                value={userData.phone} name='phone' onChange={handleInput} placeholder='Your Phone  number' required={true} />
                        </div>
                    </div>

                    <div className='contact_form_text'>
                        <textarea  value={userData.message} cols='143' rows='10' name='message' onChange={handleInput} placeholder='Message' />
                    </div>

                    <div className='contact_form_button'>
                        <button type='submit' className='Btn'  id='Btn' onClick={submitData}>Send Message</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Contact;