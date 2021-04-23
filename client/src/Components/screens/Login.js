import React, { useState, useContext, useEffect } from 'react'
import '../screens_css/Login.css'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../App'
import M from 'materialize-css'

const Login = () => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const postData = (e) => {
        e.target.classList.add("none-even")
        var re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (re.test(email) === false) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            e.target.classList.remove("none-even")
            return;
        }

        fetch("/api/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    e.target.classList.remove("none-even")
                }
                else {
                    M.toast({ html: "Login success", classes: "#43a047 green darken-1" })
                    localStorage.setItem("jwt", data.token)
                    localStorage.setItem("user", JSON.stringify(data.user))
                    dispatch({ type: "USER", payload: data.user })
                    history.push('/')
                }
            })
    }

    useEffect(() => {
        if(state) {
            history.push('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="card card-login">
            <h1>Instagram</h1>
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
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-login" onClick={postData}>Login</button>
            <div className="gach-ngang"></div>
            <Link to="/signup">Bạn chưa có tài khoản?</Link>
        </div>
    )
}

export default Login