const express = require('express')
require('dotenv').config()
const cors = require("cors")
const session = require("express-session")
const cookieParser = require('cookie-parser')
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoute")
const productRoutes = require("./routes/productRoute")
const orderRoutes = require("./routes/orderRoutes")
const reviewRoute = require("./routes/reviewRoute")
const app = express()
app.use(express.json())
app.use(cors({
    origin:process.env.FRONT_URL,
    credentials:true
}))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_KEY ,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

{/* Routes */}

app.use('/api/auth',authRoutes)
app.use('/api/product',productRoutes)
app.use("/api/user",userRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/review",reviewRoute)



module.exports = app