const express = require('express')
const mongoose = require('mongoose')

const middlewareLogin = require('../middleware/requireLogin')
const router = express.Router()
const Post = mongoose.model("Post")

router.post('/createPost', middlewareLogin, (req, res) => {
    const { title, body, url } = req.body
    if (!title || !body || !url) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const post = new Post({
        title,
        body,
        photoUrl: url,
        postedBy: req.user.id
    })

    post.save()
        .then(result => {
            return res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/allPost', middlewareLogin, (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            return res.json(posts)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/myPosts', middlewareLogin, (req, res) => {
    var id = req.user.id
    Post.find({ postedBy: id })
        .populate("postedBy", "_id name")
        .then(myPost => {
            return res.json({ myPost })
        })
        .catch(err => {
            console.log(err)
        })
})

router.put('/like', middlewareLogin, (req, res) => {
    Post.findById(req.body.postId)
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(post => {
            if (post.likes.includes(req.user.id)) {           //Nếu người dùng đã like thì trả về luôn post
                return res.json(post)
            } else {                                         //Nếu chưa like thì thêm người dùng vào likes rồi trả về post đã update
                Post.findByIdAndUpdate(req.body.postId, {
                    $push: { likes: req.user.id }
                }, {
                    new: true
                })
                    .populate("postedBy", "_id name")
                    .populate("comments.postedBy", "_id name")
                    .exec((err, result) => {
                        if (err) {
                            return res.status(422).json({ error })
                        } else {
                            res.json(result)
                        }
                    })
            }
        })
})

router.put('/unlike', middlewareLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user.id }
    }, {
        new: true
    })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error })
            } else {
                res.json(result)
            }
        })
})

router.put('/comment', middlewareLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user.id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error })
            } else {
                res.json(result)
            }
        })
})

router.delete('/deletepost/:postId', middlewareLogin, (req, res) => {
    Post.findOne({_id: req.params.postId})
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            if (!post) {
                return res.status(422).json({ error: "post null!" })
            }
            if (post.postedBy._id.toString() === req.user.id.toString()) {
                post.remove()
                    .then(result => {
                        return res.json({ message: "successfully deleted" })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(422).json({ error: err })
                    })
            }
            else {
                return res.status(422).json({error: "Delete error!"})
            }
        })
})

module.exports = router