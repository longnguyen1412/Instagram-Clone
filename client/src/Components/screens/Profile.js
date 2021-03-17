import React, { useContext, useState, useEffect } from 'react'
import '../screens_css/Profile.css'
import { UserContext } from '../../App'

const Profile = () => {
    const [myPosts, setMyPosts] = useState([])
    const { state } = useContext(UserContext)

    useEffect(() => {
        fetch('/myPosts', {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setMyPosts(result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px", padding: "15px", borderBottom: "1px solid #ccc" }}>
                <div className="khung-avatar" ef="/home">
                    <img
                        className="avatar"
                        src="https://images.unsplash.com/photo-1604751344909-7dafcca7e760?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                        alt="load error"
                    />
                </div>
                <div className="thong-tin">
                    <h4>{state.name}</h4>
                    <div className="so-luong">
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
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
    )
}

export default Profile