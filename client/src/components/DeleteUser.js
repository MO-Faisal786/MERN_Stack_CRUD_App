import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const DeleteUser = () => {
    const {state, dispatch} = useContext(userContext);
    const navigate = useNavigate();
    const {id} = useParams();

    const deleteUser = async () => {
        try {
            const res = await fetch(`/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            if (!data) {
                dispatch({ type: "USER", payload: true })
                alert('Account not deleted...');
                console.log("not deleted");
                navigate('/about');
            } else {
                dispatch({ type: "USER", payload: false })
                alert('Account delete successfull...');
                console.log("Account delete successfull...");
                navigate('/logout')
                navigate('/signup');
            }

        } catch (error) {
            dispatch({ type: "USER", payload: true })
            alert('Account not deleted...');
            console.log(error);
            navigate('/about');
        }
    }

    useEffect(()=>{
        deleteUser();
    },[])
    return (
        <div>
            Profile Deleted Successfully...
        </div>
    )
}

export default DeleteUser
