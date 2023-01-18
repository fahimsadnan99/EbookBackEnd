const express = require('express');
const {allUsers,signin,signup} = require('../controller/UserController')



const User = express.Router()

User.route("/signin").post(signin)
User.route("/signup").post(signup)
User.route("/allUser").get(allUsers)


module.exports = User;