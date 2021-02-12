require("dotenv").config()
const express = require("express")
const exphbs = require("express-handlebars")
const morgan = require("morgan")

const connectDB = require("./db")

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

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})