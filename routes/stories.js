const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")

const Story = require("../models/Story")

// @desc Show Add Story
// @route GET /stories/add
router.get("/add", ensureAuth, async (req, res) => {
    res.render('stories/add')
})

// @desc Process Add Story
// @route POST /stories/add
router.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id

        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
        res.render('error/500')
    }
})

module.exports = router