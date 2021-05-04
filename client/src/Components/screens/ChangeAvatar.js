import React, {useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
// import '../screens_css/CreatePost.css'

const ChangeAvatar = () => {
    const history = useHistory()
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [imgPreview, setImgPreview] = useState(null)
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch("/api/user", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                setUser(result)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const createPost = (url) => {
        if(url) {
            fetch("/api/changeAvatar", {
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
            createPost(data.secure_url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])
        const selected = e.target.files[0]
        if(selected) {
            let reader = new FileReader()
            reader.onloadend = () => {
                setImgPreview(reader.result)
            }
            reader.readAsDataURL(selected)
        }else {
            setImgPreview(null)
        }
    }

    const textAreaOnChange = (e) => {
        setBody(e.target.value)
    
        if(e.target.value.length > 120) {
            e.target.style.fontSize = "20px"
        } else {
            e.target.style.fontSize = "32px"
        }
        e.target.style.height = "auto"
        e.target.style.height = e.target.scrollHeight + "px"
    }

    return (
        <div className="card input-filed">
            <div className="card__header">Đổi ảnh đại diện</div>
            <div className="card__info">
                <div className="nav-card-info">
                    <div className="nav-info">
                        <div className="avatar">
                            <img src={user.urlAvatar} alt="bug" />
                        </div>
                        <div className="info">
                            <b>{user.nickname}</b> <br />
                            <span>{user.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card__body">
                <textarea
                    className="create-input"
                    placeholder="Hãy nói gì đó về ảnh này..."
                    value={body}
                    onChange={textAreaOnChange}
                >
                </textarea>
                {
                    imgPreview &&
                    <img 
                    className="img__preview"
                    src={imgPreview}
                    alt="load error!"
                />
                }
            </div>
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file"
                        accept="image/*,image/heif,image/heic"
                        onChange={handleImageChange}
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

export default ChangeAvatar