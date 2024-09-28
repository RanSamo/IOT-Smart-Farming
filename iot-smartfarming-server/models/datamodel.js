const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({ // The schema contains the features we have in the dashboard Paz shared in the group chat
    CropName:{
        type:String,
        required:true
    },
    Temperature:{
        type:Number,
        required:true
    },
    Humidity:{
        type:Number,
        required:true
    },
    SoilMoisture:{
        type:Number,
        required:false
    },
    pHLevel:{
        type:Number,
        required:false
    },
    CropHealth:{
        type:String,
        required:false
    },
    IrrigationStatus:{
        type:String,
        required:false
    },
    WeatherForcest:{
        type:String,
        required:false
    }
}, {timestamps:true})

module.exports = mongoose.model('Project', projectSchema)

