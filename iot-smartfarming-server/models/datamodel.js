const mongoose = require('mongoose')

const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({ // The schema contains the features we have in the dashboard Paz shared in the group chat
    // TODO. we need to figure out if these 2 fields are needed or not.
    /* PropertyName:{
        type:String,
        required:false 
    },
    CropName:{
        type:String,
        required:false 
    },*/
    temperature:{ // the range or most crops is between 20 to 30 degrees Celsius.
        type:Number,
        required:false //this might be generated randomly.
    },
    humidity:{ //  the range for most crops is between 50% to 70%.
        type:Number,
        required:false //this might be generated randomly.
    },
    soilMoisture:{ // the range for most crops is between 20% to 60%.
        type:Number,
        required:false //this might be generated randomly.
    },
    lightIntensity:{ // the range from 0 to 100 lux.
        type:Number,
        required:false
    },
    phLevel:{ // pH of 6 to 7.5 is optimal, range can be from 5 to 8.
        type:Number,
        required:false //this might be generated randomly.
    },
    cropHealth:{
        type:String,
        required:false //this might be generated randomly.
    },
    irrigationStatus:{
        type:String,
        required:false //this might be generated randomly.
    },
    weatherForecast:{
        type:String,
        required:false //this might be generated randomly.
    }
}, {timestamps:true})

module.exports = mongoose.model('Project', projectSchema)

