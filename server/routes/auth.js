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
    const {name, email, password} = req.body
    if(!email || !password || !name) {
        return res.status(422).json({error: "please add all the fields"})
    }
    User.findOne({email: email})
        .then(savedUser => {
            if(savedUser) {
                return res.status(422).json({error: "User already exists with that email!"})
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password: hashedPassword,
                        name
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
                        //return res.json({message: "Successfully signed in"})
                        const token = jwt.sign({_id: saveUser._id}, JWT_SECRET)
                        const {_id, name, email} = saveUser
                        return res.json({token, user: {_id, name, email}})
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