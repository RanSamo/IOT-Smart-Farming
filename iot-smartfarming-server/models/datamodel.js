const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({ // The schema contains the features we have in the dashboard Paz shared in the group chat
    PropertyName:{
        type:String,
        required:true //this must be added by the user.
    },
    CropName:{
        type:String,
        required:true //this must be added by the user.
    },
    Temperature:{
        type:Number,
        required:false //this might be generated randomly.
    },
    Humidity:{
        type:Number,
        required:false //this might be generated randomly.
    },
    SoilMoisture:{
        type:Number,
        required:false //this might be generated randomly.
    },
    pHLevel:{
        type:Number,
        required:false //this might be generated randomly.
    },
    CropHealth:{
        type:String,
        required:false //this might be generated randomly.
    },
    IrrigationStatus:{
        type:String,
        required:false //this might be generated randomly.
    },
    WeatherForcest:{
        type:String,
        required:false //this might be generated randomly.
    }
}, {timestamps:true})

module.exports = mongoose.model('Project', projectSchema)

