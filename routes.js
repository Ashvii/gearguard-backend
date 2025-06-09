//import express server
const express = require('express')

//import user controller
const userController = require('./Controllers/userController')
const jwtMiddleware = require('./middleware/jwtMiddleware')

//instance
const route = new express.Router()



//path for register
route.post('/register',userController.registerController)

//path for login
route.post('/login',userController.loginController)

//path for complaint
route.post('/Breakdown',userController.breakdownController)

//path for getting complaints
route.get('/all-complaints',jwtMiddleware, userController.getAllComplaintsAdminController)


//path to get all users
route.get('/all-users',jwtMiddleware,userController.getAllUsersController)

//routes export
module.exports = route