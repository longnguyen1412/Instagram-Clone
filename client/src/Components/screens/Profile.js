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
                <img className="item" src="https://i.pinimg.com/564x/09/d5/b6/09d5b6ef071e3ca9d0261ab4bc9d2a0c.jpg" alt="load error" />
                <img className="item" src="https://i.pinimg.com/564x/0e/32/3c/0e323c1daaa7c4f980c27bda3adb8088.jpg" alt="load error" />
                <img className="item" src="https://i.pinimg.com/564x/bc/a6/22/bca6228994bcb95bdcdc3a8506c301b5.jpg" alt="load error" />
                <img className="item" src="https://i.pinimg.com/564x/52/31/86/52318636bfa98df1df934b0e0d11e048.jpg" alt="load error" />
                <img className="item" src="https://i.pinimg.com/564x/8c/90/ac/8c90aca624744b8c6a51db2973958c6d.jpg" alt="load error" />
                <img className="item" src="https://i.pinimg.com/564x/ec/be/83/ecbe8352336ad252d30beecb0fd7e882.jpg" alt="load error" />
            </div>
        </div>
    )
}

export default Profile