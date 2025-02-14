const express = require('express');
const { getAllData,
    getSingleData,
    getLastData,
    createData,
    deleteData,
    updateData
} = require('../controllers/projectController');
const { getinsights } = require('../insightsAPI');
const {getCurrentWeather} = require('../routes/dailyforecast');
const { getWeeklyForecastMiddleware } = require('../routes/weeklyforecast'); 
//const {getWeatherInsights} = require('../weatherInsightsRouter');
const { getDailyWeatherInsights } = require('../dailyWeatherInsights');
const { getWeatherInsights } = require('../weatherInsights'); 

const router = express.Router();




// GET all data - irrelevant for now.
//router.get('/', getAllData);

// GET last data
router.get('/getLastData', getLastData); //This GET gets the last data recoreded in the DB.

// GET dailyforecast
router.get('/current-weather/:farmId', getCurrentWeather);

// GET weeklyforecast
router.get('/weeklyforecast/:farmId', getWeeklyForecastMiddleware);


// the Groq says this is the preffered way to do it, but I think the above works as well, need to check.
//TODO. need to check which of the posts are better for this function, will see after Paz's part in the frontend.
router.post('/api/insights', async (req, res) => {
    await getinsights(req,res);
});

router.post('/api/weatherinsights/:farmId', async (req, res) => {
    await getWeatherInsights(req,res);
});

// GET one data
router.get('/:id', getSingleData);

// POST new data
router.post('/api/data', createData);

// DELETE data
router.delete('/api/data/:id', deleteData);

// PATCH data
router.patch('/api/data/:id', updateData);


module.exports = router; 