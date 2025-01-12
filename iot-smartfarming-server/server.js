require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

// routes calling
const projectRoutes = require('./routes/projectroutes');
const userRoutes = require('./routes/userroutes');
// express app
const app = express()

// this might be redundant cause of the .env file, need to check.
const port = 5000

// middleware
app.use(express.json())

app.use((req, res, next) => {  
   console.log(req.path, req.method)
   next()
})  


app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);


app.use(projectRoutes)


// Connect to mongodb
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
      app.listen(port, () => {
         console.log('connected to db & listening on port: ', port)})
     
   })
   .catch((err) => {
      console.log(err)
   })


