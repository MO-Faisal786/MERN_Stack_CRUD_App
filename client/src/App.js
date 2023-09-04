import React, { createContext, useReducer } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nabvar from './components/Nabvar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Lohin';
import Register from './components/Register';
import Logout from './components/Logout';
import Error from './components/Error';
import EditUser from './components/EditUser';
import DeleteUser from './components/DeleteUser';
import { reducer, initialState } from './reducer/UseReducer';

// create context
export const userContext = createContext();

const Routing = () =>{
  return (
    <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="/editprofile/:id" element={<EditUser/>} />
            <Route path="delete/:id" element={<DeleteUser/>}/>
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<Error />} />
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='container'>
      <userContext.Provider value={{state, dispatch}}>

          <Nabvar />
          <Routing />
      </userContext.Provider>
    </div>
  );
}

export default App;