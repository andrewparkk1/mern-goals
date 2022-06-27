const express = require('express')
const router = express.Router()

const {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
} = require('../controllers/goalController')

const {protect} = require("../middleware/authMiddleware")
// router.get('/', getGoals)
// router.post('/', createGoal)
// router.put('/:id', updateGoal)
// router.delete('/:id', deleteGoal)

router.route('/').get(protect, getGoals).post(protect, createGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)


module.exports = router