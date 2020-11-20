import React, { useState } from 'react'
import '../screens_css/Signup.css'
import {Link} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const postData = () => {
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error) {
                M.toast({html: data.error})
            }
        })
    }

    return (
        <div className="card card-signup">
            <h1>Instagram</h1>
            <input 
                className="input-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-signup" onClick={postData} >Signup</button>
            <div className="gach-ngang"></div>
            <Link to="/login">Bạn đã có tài khoản?</Link>
        </div>
    )
}

export default Signup