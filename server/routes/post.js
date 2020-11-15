const express = require('express')
const mongoose = require('mongoose')

const middlewareLogin = require('../middleware/requireLogin')
const router = express.Router()
const Post = mongoose.model("Post")

router.post('/createPost', middlewareLogin, (req, res) => {
    const {title, body} = req.body
    if(!title || !body) {
        return res.status(422).json({err: "Please add all the fields"})
    }
    const post = new Post({
        title,
        body,
        postedBy: req.user.id
    })

    post.save()
        .then(result => {
            return res.json({post: result})
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/allPost', (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .then(posts => {
            return res.json({posts})
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/myPosts', middlewareLogin, (req, res) => {
    var id = req.user.id;
    Post.find({postedBy: id})
        .populate("postedBy", "_id name")
        .then(myPost => {
            return res.json({myPost})
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router