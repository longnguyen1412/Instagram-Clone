const express = require('express')
const mongoose = require('mongoose')

const middlewareLogin = require('../middleware/requireLogin')
const router = express.Router()
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user', middlewareLogin, (req, res) => {
    User.findOne({_id: req.user.id})
        .select("-password")
        .then(user => {
            if(!user) {
                return res.status(404).json({error: "Not found!"})
            }
            return res.status(200).json(user)
        })
        .catch(err => {
            return res.status(404).json({error: err})
        })
})

router.get('/user/:id', middlewareLogin, (req, res) => {
    User.findOne({_id: req.params.id})
        .select("-password")
        .then(user => {
            if(!user) {
                return res.status(404).json({error: "Not found!"})
            }
            Post.find({postedBy: user._id})
                .populate("postedBy", "_id name")
                .then(posts => {
                    return res.status(200).json({user, posts: posts.reverse()})
                })
                .catch(err => {
                    return res.status(422).json({error: err})
                })
        })
        .catch(err => {
            return res.status(404).json({error: err})
        })
})

router.put('/follow', middlewareLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {                                 //Tìm user được theo dõi rồi thêm
        $push: {followers: req.user.id}                                         //id người theo dõi vào mảng followers
    },{
        new: true
    })
        .select("-password")
        .then(result1 => {      //result1: người được theo dõi
            if(!result1) {
                return res.status(404).json({error: "Not found!"})
            }
            User.findByIdAndUpdate(req.user.id, {                               //Sau đó tìm user theo dõi và thêm
                $push: {following: req.body.followId}                           //thêm id người được theo dõi vào mảng following
            }, {
                new: true
            })
                .select("-password")
                .then(result2 => {      //result2 người theo dõi
                    if(!result2) {
                        return res.status(404).json({error: "Not found!"})
                    }
                    res.status(200).json(result1)
                })
                .catch(err => {
                    console.log(err)
                    res.status(422).json({error: err})
                })
        })
        .catch(err => {
            console.log(err)
            return res.status(422).json({error: err})
        })
})

router.put('/unfollow', middlewareLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unFollowId, {                                 //Xoá id người theo dõi khỏi
        $pull: {followers: req.user.id}                                         //mảng followers
    },{
        new: true
    })
        .select("-password")
        .then(result1 => {      //result1: người được theo dõi
            if(!result1) {
                return res.status(404).json({error: "Not found!"})
            }
            User.findByIdAndUpdate(req.user.id, {                               //Xoá id người được theo dõi khỏi
                $pull: {following: req.body.unFollowId}                           //mảng following
            }, {
                new: true
            })
                .select("-password")
                .then(result2 => {      //result2 người theo dõi
                    if(!result2) {
                        return res.status(404).json({error: "Not found!"})
                    }
                    return res.status(200).json(result1)
                })
                .catch(err => {
                    console.log(err)
                    return res.status(422).json({error: err})
                })
        })
        .catch(err => {
            console.log(err)
            res.status(422).json({error: err})
        })
})

module.exports = router