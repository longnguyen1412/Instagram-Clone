import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="white">
            <div class="nav-wrapper container-ig">
                <Link className="brand-logo" to="/">Instagram</Link>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>
                        <Link to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/create">Create Post</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar