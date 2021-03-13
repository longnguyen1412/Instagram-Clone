import React, { useState } from 'react'

import "../screens_css/Modal.css"

const Modal = (props) => {
    const [onMessageDelete, setOnMessegeDelete] = useState(false)
    const closeModal = () => {
        props.setOnModal(false)
    }

    const onClickDelete = () => {
        props.deletePost(props.idFocus)
        closeModal()
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
                            props.isPostedByUser ? <li className="warnning" onClick={() => setOnMessegeDelete(true)}>Xoá</li> : <li className="warnning">Bỏ theo dõi</li>
                        }
                        <li>Chia sẻ</li>
                        <li onClick={closeModal}>Huỷ</li>
                    </ul>
            }

        </div>
    )
}

export default Modal