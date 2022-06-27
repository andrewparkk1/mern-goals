const asyncHandler = require('express-async-handler')

// @desc    get goals
// @route   GET /api/goals
// @access  private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json(goals)
})

// @desc    get goals
// @route   POST /api/goals
// @access  private
const createGoal = asyncHandler(async (req, res) => {
    console.log(req.body)
    if (!req.body.text) {
        res.status(400)
        throw new Error('please add text field')
    }
    res.status(200).json({message: `post goals`})
})

// @desc    get goals
// @route   PUT /api/goals/:id
// @access  private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `updated goal ${req.params.id}`})
})

// @desc    delete goals
// @route   DELETE /api/goals/:id
// @access  private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `deleted goal ${req.params.id}`})
})


module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}