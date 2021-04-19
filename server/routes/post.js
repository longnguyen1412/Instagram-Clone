const express = require('express')
const mongoose = require('mongoose')

const middlewareLogin = require('../middleware/requireLogin')
const router = express.Router()
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.post('/createPost', middlewareLogin, (req, res) => {                 //Tạo mới một post và lưu vào database
    const { body, url } = req.body
    if (!body || !url) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const post = new Post({
        body,
        photoUrl: url,
        postedBy: req.user.id
    })

    post.save()
        .then(result => {
            return res.status(200).json({ post: result })
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({error: err})
        })
})

router.post('/changeAvatar', middlewareLogin, (req, res) => {                 //Thay avatar
    const { body, url } = req.body
    if (!body || !url) {
        return res.status(422).json({ error: "Please add all the fields" })
    }
    const post = new Post({
        title: "đã cập nhật ảnh đại diện mới.",
        body,
        photoUrl: url,
        postedBy: req.user.id
    })

    post.save()
        .then(result => {
            User.findByIdAndUpdate(req.user.id, {
                $set: {urlAvatar: url}
            }, {
                new: true
            })
                .then(user => {
                    return res.status(200).json({ post: result })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(422).json({error: err})
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({error: err})
        })
})

router.get('/allPost', middlewareLogin, (req, res) => {         //Trả về tất cả các post trong database khi load trang home
    Post.find()
        .populate("postedBy", "_id name urlAvatar")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            return res.status(200).json(posts.reverse())
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({error: err})
        })
})

router.get('/myPosts', middlewareLogin, (req, res) => {     //Trả về mảng các post của user đang đăng nhập
    var id = req.user.id
    Post.find({ postedBy: id })
        .populate("postedBy", "_id name")
        .then(myPost => {
            return res.status(200).json(myPost.reverse())
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({error: err})
        })
})

router.put('/like', middlewareLogin, (req, res) => {        //like post: thêm id người dùng vào mảng likes của post
    Post.findById(req.body.postId)
        .populate("postedBy", "_id name urlAvatar")
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
                    .populate("postedBy", "_id name urlAvatar")
                    .populate("comments.postedBy", "_id name")
                    .exec((err, result) => {
                        if (err) {
                            return res.status(422).json({ error: err })
                        } else {
                            res.json(result)
                        }
                    })
            }
        })
})

router.put('/unlike', middlewareLogin, (req, res) => {              //Xoá id người dùng khỏi mảng likes của post
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user.id }
    }, {
        new: true
    })
        .populate("postedBy", "_id name urlAvatar")
        .populate("comments.postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.put('/comment', middlewareLogin, (req, res) => {         //Thêm comment vào mảng comments của post
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
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.delete('/deletepost/:postId', middlewareLogin, (req, res) => {           // Xoá 1 post
    Post.findOne({_id: req.params.postId})
        .populate("postedBy", "_id name")
        .exec((err, post) => {
            if (err) {
                return res.status(422).json({ error: err })
            }
            if (!post) {
                return res.status(422).json({ error: "post null!" })
            }
            if (post.postedBy._id.toString() === req.user.id.toString()) {      //Kiểm tra bài đăng có phải của user không, nếu đúng mới xoá
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