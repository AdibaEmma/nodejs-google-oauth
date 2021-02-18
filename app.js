require("dotenv").config()
const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const passport = require("passport")
const googleAuth = require("./config/passport")
const session = require("express-session")
const morgan = require("morgan")
const connectDB = require("./config/db")
const storiesRoutes = require("./routes/index")
const authRoute = require("./routes/auth")

// Passport config
googleAuth(passport)

// connect to database
connectDB()

// express server
const app = express()

// Logging
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Handlebars
app.engine(".hbs", exphbs({defaultLayout: "main", extname: ".hbs"}))
app.set("view engine", ".hbs")

// Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session()) 

// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", storiesRoutes)
app.use("/auth", authRoute)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})