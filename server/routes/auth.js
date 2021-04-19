const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../keys')
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
    const {name, email, password, selectedOption} = req.body
    if(!email || !password || !name || !selectedOption) {
        return res.status(422).json({error: "please add all the fields"})
    }
    User.findOne({email: email})
        .then(savedUser => {
            if(savedUser) {
                return res.status(422).json({error: "User already exists with that email!"})
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
                        const {_id, name, email, followers, following, urlAvatar} = saveUser
                        return res.json({token, user: {_id, name, email, followers, following, urlAvatar}})
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