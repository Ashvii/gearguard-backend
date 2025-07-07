//import dotenv file
const dotenv = require('dotenv')
dotenv.config()  //will load environmental variable

//import express library
const express = require('express')

//import cors
const cors = require('cors')
const route = require('./routes')

//import data base file
require('./databaseconnection')

// ✅ import path to serve static files
const path = require('path')

//create server - express()
const gearguardserver = express()

//server use cors
gearguardserver.use(cors())
gearguardserver.use(express.json())


// ✅ Serve uploaded resumes publicly
gearguardserver.use('/pdfUploads', express.static(path.join(__dirname, 'pdfUploads')))


gearguardserver.use(route)

//create port 
PORT = 4000 || process.env.PORT

gearguardserver.listen(PORT,()=>{

    console.log(`server running successfully ${PORT}`);
    
})