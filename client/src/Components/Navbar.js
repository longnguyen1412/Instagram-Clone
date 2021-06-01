import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext)
    const [keySearch, setKey] = useState("")
    const [users, setUsers] = useState([])
    const [isFocus, setIsFocus] = useState(false)
    
    const searchOnChange = (e) => {
        console.log(e.target.value)
        setKey(e.target.value);
        if(e.target.value.trim() !== "") {
            fetch(`/api/searchUser?name=${e.target.value}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            })
                .then(res => res.json())
                .then((data => {
                    setUsers(data)
                    console.log(data)
                }))
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const renderList = () => {
        if(state) {
            return [
                <li className="container-search"
                    onFocus={() => {setIsFocus(true)}}
                    // onBlur={() => setIsFocus(false)}
                >
                    <input className="search-user" placeholder="Tìm kiếm" value={keySearch}
                        onChange={searchOnChange}
                    >
                    </input>
                    <div className={isFocus ? "container-user focus" : "container-user"} >
                        {
                            users.map((user, index) => {
                                return (
                                    <Link to={`/profile/${user._id}`} className="person" onClick={() => setIsFocus(false)}>
                                        <div className="avatar">
                                            <img src={user.urlAvatar} alt="load..." />
                                        </div>
                                        <div className="info">
                                            <b>{user.nickname}</b>
                                            <div>{user.name}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className={isFocus ? "backgroud-user focus": "backgroud-user"}
                        onClick={() => setIsFocus(false)}
                    >

                    </div>
                </li>,
                <li className="nav-item" key="profile">
                    <Link to="/profile">Profile</Link>
                </li>,
                <li className="nav-item" key="create">
                    <Link to="/create">Create Post</Link>
                </li>,
                <li className="nav-item" key="logout">
                    <Link to="/login" onClick={()=>{
                        localStorage.clear()
                        dispatch({type: "LOGOUT"})
                    }}>Đăng xuất</Link>
                </li>
            ]
        }else {
            return [
                <li className="nav-item" key="signup">
                    <Link to="/signup">Signup</Link>
                </li>,
                <li className="nav-item" key="login">
                    <Link to="/login">Login</Link>
                </li>
            ]
        }
    }

    return (
        <nav className="white navbar">
            <div className="nav-wrapper container-ig">
                <Link className="brand-logo" to={state? "/" : "/login"}>Instagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {  
                        renderList()
                    }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar