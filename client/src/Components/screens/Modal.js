import React, { useState, useContext } from 'react'
import {Link} from 'react-router-dom'

import { UserContext } from '../../App'
import "../screens_css/Modal.css"

const Modal = (props) => {
    const {state} = useContext(UserContext)
    const [onMessageDelete, setOnMessegeDelete] = useState(false)
    const [isFollowing, setIsFollowing] = useState( props.postFocus.postedBy.followers.includes(state._id) )

    const closeModal = () => {
        props.setOnModal(false)
    }

    const onClickDelete = () => {
        props.deletePost(props.idFocus)
        closeModal()
    }

    const followUser = () => {
        fetch('/api/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: props.postFocus.postedBy._id
            })
        })
            .then(res => res.json())
            .then(user => {
                return
            })
            .catch(err => {
                console.log(err)
            })

        setIsFollowing(true)
    }

    const unFollowUser = () => {
        fetch('/api/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unFollowId: props.postFocus.postedBy._id
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user.error) {
                    return console.log(user.error)
                }
            })
            .catch(err => {
                console.log(err)
            })

        setIsFollowing(false)
    }

    return (
        <div className="modal-post">
            <div className="modal__overlay" onClick={closeModal}></div>
            {
                onMessageDelete ?
                    <ul>
                        <li>
                            <div className="header__message">Xoá bài viết?</div>
                            <p className="body__message">
                                Nếu bạn không muốn xoá bài viết này, bạn có thể lưu trữ bài viết.
                                Chỉ bạn mới có thể xem bài viết.
                            </p>
                        </li>
                        <li onClick={onClickDelete} className="warnning">
                            Xoá
                        </li>
                        <li onClick={closeModal}>
                            Huỷ
                        </li>
                    </ul>
                    :
                    <ul>
                        <li className="warnning">Báo cáo</li>
                        {
                            props.isPostedByUser ?
                            [
                                <li className="warnning" onClick={() => setOnMessegeDelete(true)} key="delete">Xoá</li>,
                                <li key="update"><Link to={"/updatepost/" + props.idFocus}>Chỉnh sửa bài viết</Link></li>
                            ]
                            :
                            (
                                isFollowing ?
                                    <li className="bo-theo-doi" onClick={unFollowUser}>Bỏ theo dõi</li>
                                :
                                    <li className="theo-doi" onClick={followUser}>Theo dõi</li>
                            )
                                
                        }
                        <li>Chia sẻ</li>
                        <li onClick={closeModal}>Huỷ</li>
                    </ul>
            }

        </div>
    )
}

export default Modal