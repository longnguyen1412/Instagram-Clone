import React, { useState, useEffect, useContext } from 'react'
import '../screens_css/Profile.css'
import {useParams} from 'react-router-dom'
import { UserContext } from '../../App'

import M from 'materialize-css'

const Profile = () => {
    const { state } = useContext(UserContext)

    const [profile, setProfile] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        fetch(`/api/user/${id}`, {
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
                    setProfile(result)
                }
            })
            .catch(err => {
                console.log(err)
            })
            // eslint-disable-next-line
    }, [])

    const followUser = () => {
        fetch('/api/follow', {
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
                var newProfile = {...profile}
                newProfile.user = user
                setProfile(newProfile)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const unFollowUser = () => {
        fetch('/api/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unFollowId: id
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user.error) {
                    return console.log(user.error)
                }

                var newProfile = {...profile}
                newProfile.user = user
                setProfile(newProfile)
            })
            .catch(err => {
                console.log(err)
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
                            src={profile.user.urlAvatar}
                            alt="load error"
                        />
                    </div>
                    <div className="thong-tin">
                        <div>
                            <h4>{profile.user.name}</h4>
                            {
                                !profile.user.followers.includes(state._id) ?
                                <button onClick={followUser}>Follow</button>
                                :
                                <button onClick={unFollowUser}>Unfollow</button>
                            }
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