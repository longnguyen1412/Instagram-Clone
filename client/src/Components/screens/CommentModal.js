import React, { useState } from 'react'

import "../screens_css/Modal.css"

const Modal = (props) => {
    const [onMessageDelete, setOnMessegeDelete] = useState(false)
    const closeModal = () => {
        props.setOnCommentModal(false)
    }

    const onClickDelete = () => {
        props.deleteComment(props.idFocus, props.cmtIndex)
        closeModal()
    }

    return (
        <div className="modal-post">
            <div className="modal__overlay" onClick={closeModal}></div>
            {
                onMessageDelete ?
                    <ul>
                        <li>
                            <div className="header__message">Xoá comment</div>
                            <p className="body__message">
                                Bạn có chắc chắn muốn xoá comment này?!! <br/>
                                Sau khi xoá sẽ không thể khôi phục lại.
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
                        <li className="warnning" onClick={() => setOnMessegeDelete(true)}>Xoá</li>
                        <li onClick={closeModal}>Huỷ</li>
                    </ul>
            }

        </div>
    )
}

export default Modal