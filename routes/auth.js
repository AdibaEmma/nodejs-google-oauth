const express = require("express")
const passport = require("passport")
const router = express.Router()

// Google login
router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

router.get("/google/callback", passport.authenticate("google", {failureRedirect: "/" }), (req, res) => {
    res.redirect("/dashboard")
})

// Logout User
router.get("/logout", (req, res) => {
    req.logOut()
    res.redirect("/")
})

module.exports = router