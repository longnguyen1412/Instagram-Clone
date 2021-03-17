import React, {useState} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import '../screens_css/CreatePost.css'

const CreatePost = () => {
    const history = useHistory()
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")

    const createPost = (url) => {
        if(url) {
            fetch("/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body,
                    url
                })
            }).then(res => res.json())
            .then((data) => {
                if(data.error) {
                    M.toast({html: data.error, classes: "#c62828 red darken-3"})
                }
                else {
                    console.log(data)
                    M.toast({html: "Create post success!", classes: "#43a047 green darken-1"})
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const postDetails = () => {
        if(!body || !image) {
            M.toast({html: "Please add all the fields!", classes: "#c62828 red darken-3"})
            return
        }

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "insta-clone")
        data.append("cloud_name", "cnq")

        //Post ảnh lên cloudinary
        fetch("https://api.cloudinary.com/v1_1/ig-clone-44/image/upload", {
            method: "post",
            body: data,
        })
        .then(res => res.json())
        .then(data => {
            createPost(data.url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="card input-filed">
            <input className="create-input"
                type="text"
                placeholder="Bạn đang nghĩ gì?!!" 
                value={body}
                onChange={(e) => setBody(e.target.value)}    
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" 
                        onChange={(e) => {setImage(e.target.files[0])}}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" />
                </div>
            </div>

            <div>
                <button className="btn btn-create" onClick={postDetails}>
                    Submit post
                </button>
            </div>
        </div>
    )
}

export default CreatePost