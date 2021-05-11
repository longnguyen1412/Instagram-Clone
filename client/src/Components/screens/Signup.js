import React, { useState, useContext } from 'react'
import '../screens_css/Signup.css'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../../App'

const Signup = () => {
    const { state } = useContext(UserContext)
    const history = useHistory();
    const [name, setName] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [selectedOption, setSelectedOption] = useState("Nam")

    const postData = () => {
        var re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (re.test(email) === false) {
            M.toast({ html: "Invalid email", classes: "#c62828 red darken-3" })
            return
        }

        if(!name || !email || !password || !nickname) {
            M.toast({ html: "Please add all the fields", classes: "#c62828 red darken-3" })
            return
        }

        fetch("api/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                nickname,
                email,
                password,
                selectedOption
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/login')
                }
            })
    }

    const onValueChange = (e) => {
        setSelectedOption(e.target.value)
    }

    if (state) {
        history.push("/")
    }

    return (
        <div className="card card-signup">
            <h1>Instagram</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tên đầy đủ"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tên người dùng"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="select-gender">
                <label>Giới tính</label>
                <label>
                    <input className="with-gap" name="group1" type="radio" 
                        value="Nam"
                        checked={selectedOption === "Nam"}
                        onChange={onValueChange}
                    />
                    <span>Nam</span>
                </label>
                <label>
                    <input className="with-gap" name="group1" type="radio" 
                        value="Nu"
                        checked={selectedOption === "Nu"}
                        onChange={onValueChange}
                    />
                    <span>Nữ</span>
                </label>
                <label>
                    <input className="with-gap" name="group1" type="radio" 
                        value="Khac"
                        checked={selectedOption === "Khac"}
                        onChange={onValueChange}
                    />
                    <span>Khác</span>
                </label>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue lighten-2 btn-signup" onClick={postData} >Signup</button>
            <div className="gach-ngang"></div>
            <Link to="/login">Bạn đã có tài khoản?</Link>
        </div>
    )
}

export default Signup