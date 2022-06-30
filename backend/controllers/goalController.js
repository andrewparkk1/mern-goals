const asyncHandler = require('express-async-handler')

const Goal = require("../model/goalModel")
const User = require('../model/userModel')

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc    get goals
// @route   POST /api/goals
// @access  private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add text field')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})



// @desc    get goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    //make sure logged in user is === to goal user
    if (!req.user) {
        res.status(401)
        throw new Error('user not found')
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})

// @desc    delete goals
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }
     //make sure logged in user is === to goal user
    if (!req.user) {
        res.status(401)
        throw new Error('user not found')
    } 
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('user not authorized')
    }

    await goal.remove()

    res.status(200).json({deleted_id: req.params.id})
})


module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}