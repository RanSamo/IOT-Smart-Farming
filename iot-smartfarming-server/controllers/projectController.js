const projdata = require('../models/datamodel');
const mongoose = require('mongoose');
const { getAllAverageData } = require('./healthTrendfunc');
const { response } = require('express');

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
// A getter function to get the last data added to the DB.
const getLastData = async (req, res) => {
    const { farmId } = req.params; // Retrieve the farmId from the request parameters

    try {
        // Find the latest data for the specific farmId
        const lastData = await projdata.findOne({ farmId }).sort({ createdAt: -1 });
        if (!lastData) return res.status(404).json({ message: `No data found for farmId: ${farmId}` });

        // Fetch the health trend data for the specific farmId
        const healthTrendData = await getAllAverageData(farmId);

        // Combine the last data and the health trend data
        const responseData = {
            lastData, healthTrendData
        };
        res.status(200).json(responseData);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// post new data
// const createData = async (req, res) => {  // Generating the data to simulate the sensors. 
//     // generate the data
//     const generateTemperature = () =>(Math.random() * (30-20) + 20).toFixed(2); // 20 to 30 degrees Celsius.
//     const generateHumidity = () =>(Math.random() * (70-50) + 50).toFixed(2); // 50% to 70%.
//     const generateSoilMoisture = () => (Math.random() * (60-20) + 20).toFixed(2); // 20% to 60%.
//     const generateLightIntensity = () => (Math.random() * 100).toFixed(2); // the range is between 0 to 100 lux.
//     const generatepHLevel = () => (Math.random() * (8-5) + 5).toFixed(2); // pH of 6 to 7.5 is optimal, range can be from 5 to 8.
//     const generateCropHealth = () => { // This might be more complex, might be dependent on the other values.
//         const health = ['Good', 'Fair'];
//         return health[Math.floor(Math.random() * health.length)];
//     }
//     const generateIrrigationStatus = () => { // This value might be dependent to the time of the day.
//         const status = ['On', 'Off'];
//         return status[Math.floor(Math.random() * status.length)];
//     }
//     const generateWeatherForecast = () => {
//         const forecast = ['Sunny', 'Rainy', 'Cloudy','Stormy'];
//         return forecast[Math.floor(Math.random() * forecast.length)];
//     }
//     const data = {
//         temperature: generateTemperature(),
//         humidity: generateHumidity(),
//         soilMoisture: generateSoilMoisture(),
//         lightIntensity: generateLightIntensity(),
//         phLevel: generatepHLevel(),
//         cropHealth: generateCropHealth(),
//         irrigationStatus: generateIrrigationStatus(),
//         weatherForecast: generateWeatherForecast()
//     }
//     // add to db
//     try{
//         const newData = await projdata.create(data); // need to check what and how to add the data to the DB.
//         res.status(200).json(newData);
//         console.log("Data added to database");
//     }
//     catch(error){
//         res.status(400).json({ error: error.message });
//     }
// };

// post new data for all farms
const createData = async (req, res) => {
    try {
        // Retrieve all distinct farmIds from the farms collection
        const farmIds = await mongoose.connection.collection('farms').distinct('_id');

        // Function to generate random sensor data
        const generateTemperature = () => (Math.random() * (30 - 20) + 20).toFixed(2); // 20 to 30 degrees Celsius.
        const generateHumidity = () => (Math.random() * (70 - 50) + 50).toFixed(2); // 50% to 70%.
        const generateSoilMoisture = () => (Math.random() * (60 - 20) + 20).toFixed(2); // 20% to 60%.
        const generateLightIntensity = () => (Math.random() * 100).toFixed(2); // 0 to 100 lux.
        const generatepHLevel = () => (Math.random() * (8 - 5) + 5).toFixed(2); // pH of 5 to 8.
        const generateCropHealth = () => {
            const health = ['Good', 'Fair'];
            return health[Math.floor(Math.random() * health.length)];
        };
        const generateIrrigationStatus = () => {
            const status = ['On', 'Off'];
            return status[Math.floor(Math.random() * status.length)];
        };
        const generateWeatherForecast = () => {
            const forecast = ['Sunny', 'Rainy', 'Cloudy', 'Stormy'];
            return forecast[Math.floor(Math.random() * forecast.length)];
        };

        // Generate data for each farm and save to the database
        const generatedData = await Promise.all(farmIds.map(async (farmId) => {
            const data = {
                farmId: farmId.toString(),
                temperature: generateTemperature(),
                humidity: generateHumidity(),
                soilMoisture: generateSoilMoisture(),
                lightIntensity: generateLightIntensity(),
                phLevel: generatepHLevel(),
                cropHealth: generateCropHealth(),
                irrigationStatus: generateIrrigationStatus(),
                weatherForecast: generateWeatherForecast()
            };
            return await projdata.create(data);
        }));

        res.status(200).json(generatedData);
        console.log("Data added to database for all farms");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete data -  Works on deleting using id, might need to change to delete using other fields.
const deleteData = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No data with id: ${id}`); // catch invalid id.

    const data= await projdata.findOneAndDelete({_id: id});

    if (!data) return res.status(404).json({message: `No data with id: ${id}`});
    res.status(200).json({message: 'Data deleted successfully'});
   
}

//delete all the data in the DB
const deleteAllData = async (req, res) => {
    try{
        await projdata.deleteMany({});
        res.status(200).json({message: 'All data deleted successfully'});
    }catch (error){
        res.status(404).json({ error: error.message });
    }
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
    getAllData,getSingleData,getLastData,createData,deleteData,deleteAllData,updateData
};