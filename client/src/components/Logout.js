import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(userContext);

    const Navigate =useNavigate()
    useEffect(()=>{
        fetch('/logout',{
            method: "GET",
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials:"include"
        }).then((res)=>{
            dispatch({type:"USER", payload:false})
            alert("logout succesfull...")
            Navigate('/signin');
        }).catch((error)=>{
            // console.log(error);
            alert("logout unsuccesfull...")
            Navigate('/');
        })
    })
  return (
    <>
      logout success...
    </>
  )
}

export default Logout
