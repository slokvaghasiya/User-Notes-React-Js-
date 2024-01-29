import './App.css';
import React,{useState} from 'react'
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from './Components/About';
import NoteState from './Context/notes/noteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [alert,setAlert] = useState(null)
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  } 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />
          <div className='container'>

            <Routes>

              <Route exact path='/' element={<Home showAlert={showAlert} />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/Login' element={<Login showAlert={showAlert}/>} />
              <Route exact path='/Signup' element={<Signup showAlert={showAlert}/>}  />

            </Routes>

          </div>
        </Router>
      </NoteState>
    </>

  );
}

export default App;
