import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { toast,Bounce} from 'react-toastify';

function Login(props) {
    const navigate = useNavigate()
    // const [uselogin, setlogin] = useState({ emailId: "", password: "" })
    const [useEmail, setEmail] = useState('')
    const [usePassword, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailId: useEmail, password: usePassword })
        })
        const json = await res.json();
        console.log(json);
        if (json.status === 200) {
            localStorage.setItem('token', json.token);
            toast.success('Login Successful !', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            navigate('/');
        } else {
            toast.error('Invalid Email Or Paassword!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            // props.showAlert("Invalid Details","danger")
        }
    }
    const onChange = (e) => {
        setEmail(e.target.value);
    }
    const onChange2 = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className='container pt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="emailId" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="emailId" value={useEmail} name='emailId' />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={onChange2} value={usePassword} id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
            </form >
        </div>
    )
}

export default Login
