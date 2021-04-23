import React, { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory, useParams } from 'react-router-dom'
import '../screens_css/CreatePost.css'

const CreatePost = () => {
    const history = useHistory()
    const [body, setBody] = useState("")
    const [post, setPost] = useState({})
    const [user, setUser] = useState({})

    const {id} = useParams()

    useEffect(() => {
        fetch("/api/user", {
            method: "get",
            headers: {
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

        //Load post
        fetch(`/api/post/${id}`, {
            method: 'get',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                if(!result) {
                    return M.toast({ html: "404 Not found!", classes: "#c62828 red darken-3" })
                }
                if(result.error){
                    return M.toast({ html: result.error, classes: "#c62828 red darken-3" })
                }

                setPost(result)
                setBody(result.body)
            })
            .catch(err => {
                console.log(err)
            })

            // eslint-disable-next-line
    }, [])

    const updatePost = () => {
        if(!body) {
            return M.toast({ html: "Please add all the fields!", classes: "#c62828 red darken-3" })
        }

        fetch(`/api/post/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                text: body
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Update post success!", classes: "#43a047 green darken-1" })
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
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
            <div className="card__header">Sửa bài viết</div>
            <div className="card__info">
                <div className="nav-card-info">
                    <div className="nav-info">
                        <div className="avatar">
                            <img src={user.urlAvatar} alt="bug" />
                        </div>
                        <div className="info">
                            <b>{user.name}</b> <br />
                            <span>Long Nguyễn</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card__body">
                <textarea
                    className="create-input"
                    value={body}
                    onChange={textAreaOnChange}
                >
                </textarea>
                <img
                    className="img__preview"
                    src={post.photoUrl}
                    alt="loading..."
                />
            </div>

            <div>
                <button className="btn btn-create"
                    onClick={updatePost}
                    style={{marginTop: "25px"}}
                >
                    Update post
                </button>
            </div>
        </div>
    )
}

export default CreatePost