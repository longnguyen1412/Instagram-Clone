const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../config/keys')
const middlewareLogin = require('../middleware/requireLogin')

const User = mongoose.model("User")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Say hello")
})

router.get('/protected', middlewareLogin, (req, res) => {
    return res.json(req.user)
})

router.post('/signup', (req, res) => {
    const {name, nickname, email, password, selectedOption} = req.body
    if(!email || !password || !name || !nickname || !selectedOption) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    User.findOne({ $or: [ {email: email}, {nickname: nickname} ] })
        .then(savedUser => {
            if(savedUser) {
                if(savedUser.email === email) {
                    return res.status(422).json({error: "Email đã tồn tại!"})
                } else {
                    return res.status(422).json({error: "Tên người dùng đã tồn tại!"})
                }
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    let urlAvatar = ""
                    if(selectedOption === "Nam"){
                        urlAvatar = "http://res.cloudinary.com/ig-clone-44/image/upload/v1616225069/rt7myzvt6q5n5hc0bpuy.jpg"
                    }else if(selectedOption === "Nu") {
                        urlAvatar = "http://res.cloudinary.com/ig-clone-44/image/upload/v1616225037/ap3f08ag8ybm9ftybj3l.jpg"
                    }else {
                        urlAvatar = "http://res.cloudinary.com/ig-clone-44/image/upload/v1616227304/ml9uqlv5yriwnss4vylw.jpg"
                    }
                    const user = new User({
                        email,
                        password: hashedPassword,
                        name,
                        nickname,
                        selectedOption,
                        urlAvatar
                    })
        
                    user.save()
                        .then(user => {
                            return res.json({message: "Saved successfully"})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/login', (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(422).json({error: "Please add email or password"})
    }
    User.findOne({email: email})
        .then(saveUser => {
            if(!saveUser) {
                return res.status(422).json({error: "Invalid Email or Password"})
            }
            bcrypt.compare(password, saveUser.password)
                .then(doMatch => {
                    if(doMatch) {
                        const token = jwt.sign({_id: saveUser._id}, JWT_SECRET)
                        const {_id, name, nickname, urlAvatar} = saveUser
                        return res.json({token, user: {_id, name, nickname, urlAvatar}})
                    }
                    else {
                        return res.status(422).json({error: "Invalid Email or Password"})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router