const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({ // the schema here is relevant to the MERN video, I need to make sure what data we want our db to have in it.
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    sets:{
        type:Number,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Project', projectSchema)

