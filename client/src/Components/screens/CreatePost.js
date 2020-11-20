import React from 'react'
import '../screens_css/CreatePost.css'

const CreatePost = () => {
    return (
        <div className="card input-filed">
            <input className="create-input" type="text" placeholder="title" />
            <input className="create-input" type="text" placeholder="body" />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" />
                </div>
            </div>

            <div>
                <button className="btn btn-create">
                    Submit post
                </button>
            </div>
        </div>
    )
}

export default CreatePost