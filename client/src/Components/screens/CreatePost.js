import React, {useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import '../screens_css/CreatePost.css'

const CreatePost = () => {
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        console.log("onChange!")
        if(url) {
            fetch("/createPost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
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
                    M.toast({html: "Login success", classes: "#43a047 green darken-1"})
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    const postDetails = () => {
        if(!title || !body || !image) {
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
            setUrl(data.url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="card input-filed">
            <input className="create-input"
                type="text"
                placeholder="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input className="create-input"
                type="text"
                placeholder="body" 
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