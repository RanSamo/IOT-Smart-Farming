const axios = require('axios');
const Farm = require('../models/farmmodel');

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchCoordinates = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  const { coord } = response.data;
  return { lat: coord.lat, lon: coord.lon };
};

const fetchWeeklyForecast = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data.list;
};

// const processWeeklyForecast = (data) => {
//   const dailyData = {};

//   data.forEach((item) => {
//     const date = item.dt_txt.split(' ')[0]; 
//     if (!dailyData[date]) {
//       dailyData[date] = {
//         tempMax: item.main.temp_max,
//         tempMin: item.main.temp_min,
//         description: item.weather[0].description,
//         icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
//       };
//     } else {
//       dailyData[date].tempMax = Math.max(dailyData[date].tempMax, item.main.temp_max);
//       dailyData[date].tempMin = Math.min(dailyData[date].tempMin, item.main.temp_min);
//     }
//   });

//   return Object.keys(dailyData).map((date) => ({
//     date,
//     ...dailyData[date],
//   }));
// };

const processWeeklyForecast = (data) => {
  const dailyData = {};

  data.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]; 
    const description = item.weather[0].description;

    if (!dailyData[date]) {
      dailyData[date] = {
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        descriptionCount: {},
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };
    }

    dailyData[date].tempMax = Math.max(dailyData[date].tempMax, item.main.temp_max);
    dailyData[date].tempMin = Math.min(dailyData[date].tempMin, item.main.temp_min);

    if (!dailyData[date].descriptionCount[description]) {
      dailyData[date].descriptionCount[description] = 0;
    }
    dailyData[date].descriptionCount[description] += 1;
  });

  Object.keys(dailyData).forEach((date) => {
    const descriptions = dailyData[date].descriptionCount;
    const mostFrequentDescription = Object.keys(descriptions).reduce((a, b) =>
      descriptions[a] > descriptions[b] ? a : b
    );

    dailyData[date].description = mostFrequentDescription; 
  });

  return Object.keys(dailyData).map((date) => ({
    date,
    tempMax: dailyData[date].tempMax,
    tempMin: dailyData[date].tempMin,
    description: dailyData[date].description, 
    icon: dailyData[date].icon, 
  }));
};


const getWeeklyForecastMiddleware = async (req, res) => {
  try {
    const { farmId } = req.params;

    if (!farmId) {
      return res.status(400).json({ error: 'Farm ID is required' });
    }

    const forecast = await getWeeklyForecast(farmId);
    res.status(200).json(forecast);
  } catch (error) {
    console.error('Error in getWeeklyForecastMiddleware:', error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch weekly forecast' });
  }
};


const getWeeklyForecast = async (farmId) => {
  if (!farmId) {
    throw new Error('Farm ID is required');
  }

  try {
    const farm = await Farm.findById(farmId);
    if (!farm) {
      throw new Error('Farm not found');
    }

    if (!farm.location) {
      throw new Error('Farm location is not defined');
    }

    const city = farm.location.trim();

    const { lat, lon } = await fetchCoordinates(city);

    const weeklyData = await fetchWeeklyForecast(lat, lon);

    if (!weeklyData || !Array.isArray(weeklyData)) {
      console.error("Invalid weekly forecast data format:", weeklyData);
      throw new Error("Invalid weekly forecast format");
    }

    return processWeeklyForecast(weeklyData);
  } catch (error) {
    console.error('Error fetching weekly forecast:', error.message);
    throw new Error('Failed to fetch weekly forecast'); 
  }
};

module.exports = {getWeeklyForecast, getWeeklyForecastMiddleware};