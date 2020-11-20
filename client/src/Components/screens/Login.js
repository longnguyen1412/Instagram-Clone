import React from 'react'
import '../screens_css/Login.css'
import {Link} from 'react-router-dom'

const Login = () => {
    return (
        <div className="card card-login">
            <h1>Instagram</h1>
            <input 
                type="email"
                placeholder="Your email"
            />
            <input 
                type="password"
                placeholder="Password"
            />
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-login">Login</button>
            <div className="gach-ngang"></div>
            <Link to="/signup">Bạn chưa có tài khoản?</Link>
        </div>
    )
}

export default Login