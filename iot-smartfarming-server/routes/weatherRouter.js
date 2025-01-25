const express = require('express');
const axios = require('axios');
const Farm = require('../models/farmmodel');

const router = express.Router();

const API_KEY = process.env.API_KEY; // מפתח API מוגדר בקובץ .env
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// פונקציה לניקוי המיקום
const normalizeCityName = (city) => {
  return city.trim().replace(/\s+/g, '+'); // מסיר רווחים ומחליף רווחים ב-+
};

// פונקציה לשליפת נתוני מזג האוויר מה-API
const fetchCurrentWeather = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`; // מוסיף יחידות מטריות
  const response = await axios.get(url);
  return response.data;
};

// פונקציה לעיבוד הנתונים
const processWeatherData = (data) => {
  return {
    location: {
      cityName: data.name,
    },
    weatherConditions: {
      description: data.weather[0].description, // תיאור כללי
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, // URL לאייקון
    },
    temperature: {
      current: data.main.temp, // טמפרטורה נוכחית
      min: data.main.temp_min, // טמפרטורה מינימלית
      max: data.main.temp_max, // טמפרטורה מקסימלית
      feelsLike: data.main.feels_like, // תחושת טמפרטורה
    },
    humidity: {
      percentage: data.main.humidity, // לחות יחסית
    },
    wind: {
      speed: data.wind.speed, // מהירות רוח
      direction: data.wind.deg, // כיוון הרוח
    },
    clouds: {
      coverage: data.clouds.all, // כיסוי עננים באחוזים
    },
    sunTimes: {
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(), // זמן זריחה
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(), // זמן שקיעה
    },
  };
};

// ראוטר לקבלת נתוני מזג האוויר לפי farmId
router.get('/current-weather/:farmId', async (req, res) => {
    let farmId = req.params.farmId.trim();
    
  try {
    // שליפת פרטי החווה ממסד הנתונים
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    // בדיקת תקינות של מיקום החווה
    if (!farm.location) {
      return res.status(400).json({ error: 'Farm location is not defined' });
    }

    // עיבוד שם העיר למבנה המתאים ל-API
    const city = normalizeCityName(farm.location);

    // שליפת נתוני מזג האוויר מה-API
    const weatherData = await fetchCurrentWeather(city);

    // עיבוד הנתונים למבנה המבוקש
    const processedData = processWeatherData(weatherData);

    // שליחת התגובה ללקוח
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
