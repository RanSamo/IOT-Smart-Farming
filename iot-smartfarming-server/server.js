require('dotenv').config()

const express = require('express')


// routes calling
const projectRoutes = require('./routes/projectroutes')
// express app
const app = express()

// this might be redundant cause of the .env file, need to check.
const port = process.env.PORT || 5000

// middleware
app.use(express.json())

app.use((req, res, next) => {
   console.log(req.path, req.method)
   next()
})  


app.use(projectRoutes)

app.listen(port, () => {
   console.log('server is running on port: ', port)})
