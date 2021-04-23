import React, { useEffect, useState, useContext } from 'react'
import '../screens_css/Home.css'
import M from 'materialize-css'

import { UserContext } from '../../App'

import Modal from "./Modal"
import CommentModal from "./CommentModal"
import Ads from '../ads/Ads'
import { Link } from 'react-router-dom'

const Home = () => {
    const { state } = useContext(UserContext)
    const [data, setData] = useState(null)
    const [onModal, setOnModal] = useState(false)
    const [onCommentModal, setOnCommentModal] = useState(false)
    const [isPostedByUser, setIsPostedByUser] = useState(false)
    const [idFocus, setIdFocus] = useState("")
    const [cmtIndex, setCmtIndex] = useState(null)

    useEffect(() => {
        fetch('/api/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error)
                } else if (result instanceof Array) {
                    setData(result)
                }
            })
    }, [])

    const likePost = (id) => {
        fetch('/api/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                var newData = data.map(post => {
                    if (post._id === id) {
                        return result
                    } else {
                        return post
                    }
                })
                setData(newData)
            })
    }

    const unlikePost = (id) => {
        fetch('/api/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                var newData = data.map(post => {
                    if (post._id === id) {
                        return result
                    } else {
                        return post
                    }
                })
                setData(newData)
            })
    }

    const iconLikeOnClick = (e, id) => {
        var element = e.target
        if (element.classList.contains("far")) {
            likePost(id)
            element.className = "fas fa-heart ani-scale1"
        } else {
            unlikePost(id)
            element.className = "far fa-heart"
        }
    }

    //Hàm thực hiện xoá comment nhận vào id post, index comment 
    const deleteComment = (postId, index) => {
        fetch('/api/uncomment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: postId,
                commentIndex: index
            })
        })
            .then(res => res.json())
            .then(result => {
                if(!result || result.error){
                    return M.toast({ html: "delete failed!", classes: "#c62828 red darken-3" })
                }

                var newData = data.map(post => {
                    if (post._id === postId) {
                        return result
                    } else {
                        return post
                    }
                })
                setData(newData)
            })
            .catch(err => {
                M.toast({ html: "delete failed!", classes: "#c62828 red darken-3" })
            })
    }

    const ImageOnDoubleClick = (id) => {
        var element = document.getElementById(id)
        likePost(id)
        element.className = "fas fa-heart ani-scale1"
        var iconHeart = document.getElementById("idHeart" + id)
        iconHeart.style.display = "block"
        setTimeout(() => iconHeart.style.display = "none", 1500)
    }

    const makeComment = (text, postId) => {
        fetch('/api/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
            .then(result => {
                if(!result || result.error) {
                    return M.toast({ html: result.error, classes: "#c62828 red darken-3" })
                }

                const newData = data.map(post => {
                    if (post._id === result._id) {
                        return result
                    } else {
                        return post
                    }
                })
                setData(newData)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deletePost = (postId) => {
        fetch(`/api/deletepost/${postId}`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result.err) {
                    M.toast({ html: result.error, classes: "#c62828 red darken-3" })
                } else {
                    const newData = data.filter(post => post._id !== postId)
                    setData(newData)
                    M.toast({ html: "Delete success!", classes: "#43a047 green darken-1" })
                }
            })
    }

    const dotOnClick = (postedById, id) => {
        setIdFocus(id)
        if (postedById === state._id) {
            setIsPostedByUser(true)
        } else {
            setIsPostedByUser(false)
        }
        setOnModal(true)
    }

    return (
        <>
        {
            !data ?
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
            :
            <div className="home">
                <div className="news-feed">
                    {
                        data.map(post => {
                            var classNameIcon = "far fa-heart"
                            var userId = state._id
                            if (post.likes.includes(userId)) {
                                classNameIcon = "fas fa-heart ani-scale1"
                            }
                            return (
                                <div className="card home-card" key={post._id}>
                                    <div className="nav-card">
                                        <div className="nav-card-info">
                                            <Link to={post.postedBy._id === userId ? "/profile" : "/profile/" + post.postedBy._id}>
                                                <div className="info_posted">
                                                    <div className="avatar">
                                                        <img src={post.postedBy.urlAvatar} alt="bug" />
                                                    </div>
                                                    <div className="info">
                                                        <b>{post.postedBy.name}</b>
                                                    </div>
                                                </div>
                                            </Link>
                                            {
                                                post.title && <span>{post.title}</span>
                                            }
                                        </div>
                                        <i className="fas fa-ellipsis-h" onClick={() => dotOnClick(post.postedBy._id, post._id)}></i>
                                    </div>
                                    <div className="card-image" onDoubleClick={() => ImageOnDoubleClick(post._id)}>
                                        <img src={post.photoUrl} alt="load err" />
                                        <i className="fas fa-heart iconHeart effect1" id={"idHeart" + post._id}></i>
                                    </div>
                                    <div className="listIcon">
                                        <i className={classNameIcon} id={post._id} onClick={(e) => iconLikeOnClick(e, post._id)}></i>
                                        <i className="far fa-comment fa-flip-horizontal"></i>
                                        <i className="far fa-paper-plane"></i>
                                        <i className="far fa-bookmark"></i>
                                    </div>
                                    <div className="countLike">
                                        {post.likes.length} lượt thích
                                </div>
                                    <div className="card-content">
                                        <span className="userName">{post.postedBy.name} </span>
                                        <span className="postName">{post.body}</span>
                                        {
                                            post.comments.map((comment, index) => {
                                                return (
                                                    <h6 key={index} className="post-comment">
                                                        <div className="comment-container">
                                                            <span className="userName">{comment.postedBy.name} </span>
                                                            <span className="comment-text">{comment.text}</span>
                                                        </div>
                                                        {
                                                            comment.postedBy._id === userId &&
                                                            <i className="fas fa-ellipsis-h comment-icon"
                                                                onClick={() => {
                                                                    setOnCommentModal(true)
                                                                    setIdFocus(post._id)
                                                                    setCmtIndex(index)
                                                                }}
                                                            ></i>
                                                        }
                                                    </h6>
                                                )
                                            })
                                        }
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            makeComment(e.target[0].value, post._id)
                                            e.target[0].value = ""
                                        }}>
                                            <input type="text" placeholder="add a comment" />
                                        </form>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="quang-cao">
                    <div className="fixed">
                        <Ads></Ads>
                    </div>
                </div>

                {
                    onModal &&
                    <Modal setOnModal={setOnModal}
                        isPostedByUser={isPostedByUser}
                        deletePost={deletePost}
                        idFocus={idFocus}
                    >
                    </Modal>
                }
                {
                    onCommentModal &&
                    <CommentModal
                        setOnCommentModal={setOnCommentModal}
                        deleteComment={deleteComment}
                        idFocus={idFocus}
                        cmtIndex={cmtIndex}
                    >
                    </CommentModal>
                }
            </div>
        }
        </>
    )
}

export default Home