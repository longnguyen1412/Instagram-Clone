import React from 'react'
import '../screens_css/CreatePost.css'

const CreatePost = () => {
    return (
        <div className="card create-post">
            <input className="create-input" type="text" placeholder="title" />
            <input className="create-input" type="text" placeholder="body" />
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                    <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
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