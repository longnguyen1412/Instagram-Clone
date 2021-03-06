import React, {useEffect, useState} from 'react'
import '../screens_css/Home.css'

import Ads from '../ads/Ads'

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            if(result.error){
                console.log(result.error)
            }else if(result instanceof Array){
                setData(result)
                console.log(result)
            }
        })
    }, [])

    const likePost = (id) => {
        fetch('/like', {
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
                if(post._id === id){
                    return result
                }else {
                    return post
                }
            })
            setData(newData)
            console.log(newData)
        })
    }

    const unlikePost = (id) => {
        fetch('/unlike', {
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
                if(post._id === id){
                    return result
                }else {
                    return post
                }
            })
            setData(newData)
        })
    }

    const iconLikeOnClick = (e, id) => {
        var element = e.target
        if(element.classList.contains("far")) {
            likePost(id)
            element.className = "fas fa-heart ani-scale1"
        }else {
            unlikePost(id)
            element.className = "far fa-heart"
        }
    }

    const ImageOnDoubleClick = (id) => {
        var element = document.getElementById(id)
        likePost(id)
        element.className = "fas fa-heart ani-scale1"
        var iconHeart = document.getElementById("idHeart" + id)
        iconHeart.style.display = "block"
        setTimeout(() => iconHeart.style.display = "none", 1500)
    //     var classNameHeart = iconHeart.className
    //     if(classNameHeart === "fas fa-heart effect1"){
    //         iconHeart.className = "fas fa-heart effect2"
    //     }else {
    //         iconHeart.className = "fas fa-heart effect1"
    //     }
    }

    return (
        <div className="home">
            <div className="news-feed">
            {
                data.map(post => {
                    var classNameIcon = "far fa-heart"
                    var userId = JSON.parse(localStorage.getItem("user"))._id
                    if(post.likes.includes(userId)) {
                        classNameIcon = "fas fa-heart"
                    }
                    return(
                        <div className="card home-card" key={post._id}>
                            <h5>{post.postedBy.name}</h5>
                            <div className="card-image" onDoubleClick={()=>ImageOnDoubleClick(post._id)}>
                                <img src={post.photoUrl} alt="load err" />
                                <i className="fas fa-heart iconHeart effect1" id={"idHeart"+post._id}></i>
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
                                <span className="postTitle">{post.title}</span>
                                <span className="postName">{post.body}</span>
                                <input type="text" placeholder="add a comment" />
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
        </div>
    )
}

export default Home