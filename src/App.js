import './App.css';
import React from 'react'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './Context/notes/noteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <ToastContainer />
      <NoteState>
        <Router>
          <Navbar />
          <div className='App'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/Login' element={<Login/>} />
              <Route exact path='/Signup' element={<Signup/>}  />

            </Routes>

          </div>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
