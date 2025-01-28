const express = require('express');
const axios = require('axios');
const Farm = require('../models/farmmodel');

const router = express.Router();

const API_KEY = process.env.API_KEY; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const normalizeCityName = (city) => {
  return city.trim().replace(/\s+/g, '+'); 
};

const fetchCurrentWeather = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`; 
  const response = await axios.get(url);
  return response.data;
};

const processWeatherData = (data) => {
  return {
    location: {
      cityName: data.name,
    },
    weatherConditions: {
      description: data.weather[0].description, 
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, 
    },
    temperature: {
      current: data.main.temp,
      min: data.main.temp_min, 
      max: data.main.temp_max, 
      feelsLike: data.main.feels_like, 
    },
    humidity: {
      percentage: data.main.humidity,
    },
    wind: {
      speed: data.wind.speed, 
      direction: data.wind.deg, 
    },
    clouds: {
      coverage: data.clouds.all, 
    },
    sunTimes: {
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(), 
    },
  };
};

const getCurrentWeather = async(req, res) =>
{
  const farmId = req.params.farmId.trim();

  try {
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    if (!farm.location) {
      return res.status(400).json({ error: 'Farm location is not defined' });
    }

    const city = normalizeCityName(farm.location);

    const weatherData = await fetchCurrentWeather(city);

    const processedData = processWeatherData(weatherData);

    res.json(processedData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

module.exports = {getCurrentWeather};


// router.get('/current-weather/:farmId', async (req, res) => {
//     let farmId = req.params.farmId.trim();
    
//   try {
//     const farm = await Farm.findById(farmId);
//     if (!farm) {
//       return res.status(404).json({ error: 'Farm not found' });
//     }

//     if (!farm.location) {
//       return res.status(400).json({ error: 'Farm location is not defined' });
//     }

//     const city = normalizeCityName(farm.location);

//     const weatherData = await fetchCurrentWeather(city);

//     const processedData = processWeatherData(weatherData);

//     res.json(processedData);
//   } catch (error) {
//     console.error('Error fetching weather data:', error.message);
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
// });