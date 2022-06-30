const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// @desc    register new user 
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

/* Checking if the name, email, and password are empty. If they are empty, it will throw an error. */
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('pleasee add all fields')
    }

    //check if user already exists
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('user already exists')
    }

    //has password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// @desc    login user 
// @route   POST /api/users/login
// @access  public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)

        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

// @desc    get me 
// @route   Get /api/users/me
// @access  private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


//generate jwt
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}



module.exports = {
    registerUser,
    loginUser,
    getMe
}