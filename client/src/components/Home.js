import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../App';


const Home = () => {
    const {state, dispatch} = useContext(userContext);


    const [userName, setUserName] = useState("");

    const getHomeData = async () => {
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
            setUserName(data.name);


        } catch (error) {
            console.log("This is home page");
        }
    }

    useEffect(() => {
        getHomeData();
    }, []);

    userName?dispatch({type:"USER", payload:true}):dispatch({type:"USER", payload:false});
    
    return (
        <>
            <div className='home-page'>

                <p className='home-para'>Welcome</p>
                <h1 className='home-heading'>{userName ? userName : "We are the"} Mern Developer</h1>

            </div>
        </>
    );
};

export default Home;