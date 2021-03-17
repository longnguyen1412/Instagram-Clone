import React, { useState, useEffect } from 'react'
import '../screens_css/Profile.css'
import {useParams} from 'react-router-dom'

import M from 'materialize-css'

const Profile = () => {
    const [profile, setProfile] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetch(`/user/${id}`, {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                if(result.error){
                    M.toast({html: "Not found!", classes: "#c62828 red darken-3"})
                }else {
                    console.log(result)
                    setProfile(result)
                }
            })
            .catch(err => {
                console.log(err)
            })
            // eslint-disable-next-line
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: id
            })
        })
            .then(res => res.json())
            .then(user => {
                console.log(user)
                var newProfile = {...profile}
                newProfile.user = user
                setProfile(newProfile)
            })
    }

    return (
        <>
        {
            profile ?
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
                        <div>
                            <h4>{profile.user.name}</h4>
                            <button onClick={followUser}>Follow</button>
                        </div>
                        <div className="so-luong">
                            <h6>{profile.posts.length} post</h6>
                            <h6>{profile.user.followers.length} followers</h6>
                            <h6>{profile.user.following.length} following</h6>
                        </div>
                    </div>
                </div>

                <div className="gallery">
                    {
                        profile.posts.map(post => {
                            return (
                                <img className="item" src={post.photoUrl} alt="load error" />
                            )
                        })
                    }
                </div>
            </div>
            :
            <div class="progress">
                <div class="indeterminate"></div>
            </div>
        }
        </>
    )
}

export default Profile