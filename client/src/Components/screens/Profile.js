import React, { useContext, useEffect, useState } from 'react'
import '../screens_css/Profile.css'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [myPosts, setMyPosts] = useState(null)
    const [user, setUser] = useState(null)
    const { state } = useContext(UserContext)

    useEffect(() => {
        fetch(`/api/user/${state._id}`, {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setMyPosts(result.posts)
                setUser(result.user)
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                myPosts && user ?
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", padding: "15px", borderBottom: "1px solid #ccc" }}>
                            <div className="khung-avatar">
                                <img
                                    className="avatar"
                                    src={user.urlAvatar}
                                    alt="load error"
                                />
                                <span><Link to="/changeAvatar"><i className="fas fa-camera"></i></Link></span>
                            </div>
                            <div className="thong-tin">
                                <h4>{user.name}</h4>
                                <div className="so-luong">
                                    <h6>{myPosts.length} posts</h6>
                                    <h6>{user.followers.length} followers</h6>
                                    <h6>{user.following.length} following</h6>
                                </div>
                            </div>
                        </div>

                        <div className="gallery">
                            {
                                myPosts.map(myPost => {
                                    return (
                                        <img className="item" src={myPost.photoUrl} alt="load error" />
                                    )
                                })
                            }
                        </div>
                    </div>
                    :
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
            }
        </>

    )
}

export default Profile