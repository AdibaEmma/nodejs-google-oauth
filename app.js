require("dotenv").config()
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const exphbs = require("express-handlebars")
const methodOverride = require("method-override")
const passport = require("passport")
const googleAuth = require("./config/passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const morgan = require("morgan")
const connectDB = require("./config/db")


const storiesRoutes = require("./routes/index")
const authRoute = require("./routes/auth")
const addStory = require("./routes/stories")

// Passport config
googleAuth(passport)

// connect to database
connectDB()

// express server
const app = express()

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

// Method Override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))

// Logging
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require("./helpers/hbs")

// Handlebars
app.engine(".hbs", exphbs({helpers: {
    formatDate,
    stripTags, 
    truncate,
    editIcon,
    select
},
defaultLayout: "main", 
extname: ".hbs"}))
app.set("view engine", ".hbs")

// Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session()) 

// Set Global Variables
app.use( function (req, res, next) {
    res.locals.user = req.user || null
    next()
})
// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", storiesRoutes)
app.use("/auth", authRoute)
app.use("/stories", addStory)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})