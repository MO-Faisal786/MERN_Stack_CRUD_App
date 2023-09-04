import React, { useState, useEffect,useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../App';

const EditUser = () => {
  const {state, dispatch} = useContext(userContext);
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    phone:"",
    work:""
  });

  const Navigate = useNavigate();
  const {id} = useParams();

  const editPage = async () => {
    try {
        const res = await fetch('/getdata', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        // console.log(res);
        const data = await res.json();
        // console.log(d ata);       
        if(!data || res.status !== 200) {
            const error = new Error("Unauthorised user");
            throw error;
        }else{
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone, work:data.work });
        }
        

    } catch (error) {
        console.log(error);
    }

}

useEffect(() => {
  editPage();
}, []);

dispatch({type:"USER", payload:true})

const updateData = async (e) => {
  e.preventDefault();

  const { name, email, phone, work } = userData;

  const res = await fetch(`/edit/${id}`, {
      method: "PUT",
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, work })
  })

  const data = await res.json();
  if (!data) {
    alert("Data not updated...")
      console.log("Data Not updated..");
  } else {
      alert("Profile udated...");
      Navigate('/about');
  }
}


  const handleData = (e) =>{
    
      const name = e.target.name;
      const value = e.target.value;

      setUserData({ ...userData, [name]: value });
  }
  

  return (
    <div className='edit-container'>
      <div className='edit-sub-container'>
        <h1>Edit User</h1>
        <form method='PUT' className='edit-form'>
            <div className='edit-input-group'>
              <label htmlFor="name">Name:</label>
              <input type='text' name='name' id='name'value={userData.name} onChange={handleData} placeholder='Your Name'/>
            </div>
            <div className='edit-input-group'>
              <label htmlFor="email">Email:</label>
              <input type='text' name='email' id='email'value={userData.email} onChange={handleData} placeholder='Your Email'/>
            </div>
            <div className='edit-input-group'>
              <label htmlFor="phone">Phone:</label>
              <input type='text' name='phone' id='phone'value={userData.phone} onChange={handleData} placeholder='Your Phone'/>
            </div>
            <div className='edit-input-group'>
              <label htmlFor="profession">Profession:</label>
              <input type='text' name='work' id='profession' value={userData.work} onChange={handleData} placeholder='Profession'/>
            </div>
            <div className='edit-input-group edit-input-btn'>
              <input type='submit' className='Btn' value="Update" onClick={updateData}/>
            </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
