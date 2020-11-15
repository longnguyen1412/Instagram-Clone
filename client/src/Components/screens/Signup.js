import React from 'react'
import '../screens_css/Signup.css'
import {Link} from 'react-router-dom'

const Signup = () => {
    return (
        <div className="card card-signup">
            <h1>Instagram</h1>
            <input 
                type="text"
                placeholder="Your name"
            />
            <input 
                type="email"
                placeholder="Your email"
            />
            <input 
                type="password"
                placeholder="Password"
            />
            <button className="btn btn-signup">Signup</button>
            <div className="gach-ngang"></div>
            <Link to="/login">Bạn đã có tài khoản?</Link>
        </div>
    )
}

export default Signup