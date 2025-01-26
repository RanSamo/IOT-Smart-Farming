
const express = require('express');
const axios = require('axios');
const Farm = require('../models/farmmodel');

const router = express.Router();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// פונקציה לשליפת קואורדינטות
const fetchCoordinates = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  const { coord } = response.data;
  return { lat: coord.lat, lon: coord.lon };
};

// פונקציה לשליפת תחזית שבועית
const fetchWeeklyForecast = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data.list;
};

// פונקציה לעיבוד התחזית לפורמט מבוקש
const processWeeklyForecast = (data) => {
  const dailyData = {};

  // סידור נתונים לפי יום
  data.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]; // קבלת תאריך בלבד
    if (!dailyData[date]) {
      dailyData[date] = {
        tempMax: item.main.temp_max,
        tempMin: item.main.temp_min,
        description: item.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };
    } else {
      dailyData[date].tempMax = Math.max(dailyData[date].tempMax, item.main.temp_max);
      dailyData[date].tempMin = Math.min(dailyData[date].tempMin, item.main.temp_min);
    }
  });

  // עיבוד הנתונים למערך
  return Object.keys(dailyData).map((date) => ({
    date,
    ...dailyData[date],
  }));
};

// ראוטר לתחזית שבועית
router.get('/weeklyforecast/:farmId', async (req, res) => {
    const farmId = req.params.farmId.trim();

  try {
    // שליפת פרטי החווה ממסד הנתונים
    const farm = await Farm.findById(farmId);
    if (!farm) {
      return res.status(404).json({ error: 'Farm not found' });
    }

    if (!farm.location) {
      return res.status(400).json({ error: 'Farm location is not defined' });
    }

    const city = farm.location.trim();

    // שליפת קואורדינטות על בסיס שם העיר
    const { lat, lon } = await fetchCoordinates(city);

    // שליפת תחזית שבועית
    const weeklyData = await fetchWeeklyForecast(lat, lon);

    // עיבוד התחזית לפורמט המבוקש
    const processedData = processWeeklyForecast(weeklyData);

    // שליחת התחזית ללקוח
    res.json(processedData);
  } catch (error) {
    console.error('Error fetching weekly forecast:', error.message);
    res.status(500).json({ error: 'Failed to fetch weekly forecast' });
  }
});

module.exports = router;