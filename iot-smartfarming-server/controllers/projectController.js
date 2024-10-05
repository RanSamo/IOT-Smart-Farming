const projdata = require('../models/datamodel');
const mongoose = require('mongoose');

// get all data
const getAllData = async (req, res) => {
    try{
        const allData = await projdata.find().sort({ createdAt: -1 }); // sort by newest first
        res.status(200).json(allData);
    }
    catch(error){
        res.status(404).json({ error: error.message });
    }
}

// get a single data
const getSingleData = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.

    const singleData = await projdata.findById(id);
    if(!singleData) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json(singleData);
    
}
// TODO. Need to create a getter function to get the last data added to the DB.
const getLastData = async (req, res) =>{
    
    try{
        const lastData = await projdata.findOne().sort({ createdAt: -1 });
        if (!lastData) return res.status(404).json({message: `No data found`});
        res.status(200).json(lastData);
    }
    catch(error){
        res.status(404).json({ error: error.message });
    }
}

// post new data
const createData = async (req, res) => {  // TODO. Need to generate the data to simulate the sensors. 
    // generate the data
    const generateTemperature = () =>(Math.random() * (30-20) + 20).toFixed(2); // 20 to 30 degrees Celsius.
    const generateHumidity = () =>(Math.random() * (70-50) + 50).toFixed(2); // 50% to 70%.
    const generateSoilMoisture = () => (Math.random() * (60-20) + 20).toFixed(2); // 20% to 60%.
    const generateLightIntensity = () => (Math.random() * 100).toFixed(2); // the range is between 0 to 100 lux.
    const generatepHLevel = () => (Math.random() * (8-5) + 5).toFixed(2); // pH of 6 to 7.5 is optimal, range can be from 5 to 8.
    const generateCropHealth = () => { //TODO. this might be more complex, might be dependent on the other values.
        const health = ['Good', 'Fair'];
        return health[Math.floor(Math.random() * health.length)];
    }
    const generateIrrigationStatus = () => { //TODO. this value might be dependent to the time of the day.
        const status = ['On', 'Off'];
        return status[Math.floor(Math.random() * status.length)];
    }
    const generateWeatherForecast = () => {
        const forecast = ['Sunny', 'Rainy', 'Cloudy','stormy'];
        return forecast[Math.floor(Math.random() * forecast.length)];
    }
    const data = {
        Temperature: generateTemperature(),
        Humidity: generateHumidity(),
        SoilMoisture: generateSoilMoisture(),
        LightIntensity: generateLightIntensity(),
        pHLevel: generatepHLevel(),
        CropHealth: generateCropHealth(),
        IrrigationStatus: generateIrrigationStatus(),
        WeatherForcest: generateWeatherForecast()
    }
    // add to db
    try{
        const newData = await projdata.create(data); // need to check what and how to add the data to the DB.
        res.status(200).json(newData);
        console.log("Data added to database");
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}


// delete data -  Works on deleting using id, might need to change to delete using other fields.
const deleteData = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.

    const data= await projdata.findOneAndDelete({_id: id});

    if (!data) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json({message: 'Data deleted successfully'});
   
}

// update data - Works on updating using id, might need to change to update using other fields.
const updateData = async (req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.
    const data = await projdata.findOneAndUpdate({_id:id},{
        ...req.body // whatever is in the body of the request, update it.
    })
    if (!data) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json(data);
}

module.exports = { 
    getAllData,getSingleData,getLastData,createData,deleteData,updateData
};