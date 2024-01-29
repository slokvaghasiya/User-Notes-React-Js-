import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {

  let navigate = useNavigate();
  const [register, setregister] = useState({ name: '', emailId: '', password: '', cpassword: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: register.name, emailId: register.emailId, password: register.password })
    })
    const json = await res.json();
    console.log(json);
    if (json.status === 200) {
      localStorage.setItem('token', json.token);
      navigate('/login');
      props.showAlert("Account Created Successfully","Success")
  } else {
      props.showAlert("Invalid Credantials","danger")
  }
  }
  const onChange = (e) => {
    setregister({ ...register, [e.target.name]: e.target.value })
  }
  return (
    <div className='container my-3'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Username</label>
        <input type="text" className="form-control" id="text" name='name' aria-describedby="emailHelp" value={register.name} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="emailId" className="form-label">Email address</label>
        <input type="email" className="form-control" id="emialId" name='emailId' aria-describedby="emailHelp" value={register.emailId} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' id="password" value={register.password} onChange={onChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name='cpassword' id="cpassword" value={register.cpassword} onChange={onChange} />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    </div>
  )
}

export default Signup
