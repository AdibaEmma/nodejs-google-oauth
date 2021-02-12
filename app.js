require("dotenv").config()
const express = require("express")

const connectDB = require("./db")

// connect to database
connectDB()

const app = express()

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})