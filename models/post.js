const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    likes: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: ObjectId,
                ref:"User"
            }
        }
    ]
})

mongoose.model("Post", postSchema)