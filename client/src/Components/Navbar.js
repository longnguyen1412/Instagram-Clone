import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar = () => {
    const {state, dispatch} = useContext(UserContext)
    const renderList = () => {
        if(state) {
            return [
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

    console.log("navbar render")

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