const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")

const Story = require("../models/Story")

// @desc Add Story
// @route GET /stories/add
router.get("/add", ensureAuth, async (req, res) => {
    res.render('stories/add')
})

module.exports = router