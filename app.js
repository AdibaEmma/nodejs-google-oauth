require("dotenv").config()
const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars")
const morgan = require("morgan")

const connectDB = require("./db")
const storiesRoutes = require("./routes/index")
const { purge } = require("./routes/index")

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

// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", storiesRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})