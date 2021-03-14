const express = require('express')
const mongoose = require('mongoose')

const middlewareLogin = require('../middleware/requireLogin')
const router = express.Router()
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id', (req, res) => {
    User.findOne({_id: req.params.id})
        .select("-password")
        .then(user => {
            if(!user) {
                return res.status(404).json({error: "Not found!"})
            }
            Post.find({postedBy: user._id})
                .populate("postedBy", "_id name")
                .then(posts => {
                    return res.status(200).json({user, posts})
                })
                .catch(err => {
                    return res.status(422).json({error: err})
                })
        })
        .catch(err => {
            return res.status(404).json({error: err})
        })
})

module.exports = router