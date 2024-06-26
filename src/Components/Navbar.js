import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { toast,Bounce} from 'react-toastify';

export default function Navbar(props) {
    const navigate = useNavigate();

    const logout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
        toast.success('Logout Successfully !', {
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
    }

    let location = useLocation();
    useEffect(()=>{
        console.log(location.pathname);
    },[location]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNote</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/"?'active':""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about"?'active':""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link role="button" to='/Login' className="btn btn-primary mx-2">Login</Link>
                        <Link role="button" to='/Signup' className="btn btn-primary mx-2">Signup</Link>
                    </form>:<button onClick={logout} className='btn btn-primary'>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

