//import express server
const express = require('express')

//import user controller
const userController = require('./Controllers/userController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const jobController = require('./Controllers/jobController')
const appController = require('./Controllers/appController')

//import pdfmulter

const pdfmulterConfig = require('./middleware/pdfmulterMiddleware')
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

//add job 
route.post('/add-job',jobController.addjobController)

//path to get All jobs
route.get('/all-jobs',jobController.getAllJobController)

//path ro delete a job
route.delete('/delete-jobs/:id',jobController.deleteAJobController)

//path to get all application
route.get('/all-application',appController.getAllApplicationController)

//path to apply for an job
route.post('/apply-job',jwtMiddleware,pdfmulterConfig.single('resume'),appController.addapplicationContoller)

//routes export
module.exports = route