const { getCurrentWeather } = require('./routes/dailyforecast');
const Groq = require('groq-sdk');
const axios = require('axios');

const groq = new Groq({
  apiKey: process.env.Groq_API_Key 
});

async function getDailyWeatherInsights(req, res) {
  try {
      if (!req.params || !req.params.farmId) {
        return res.status(400).json({ message: 'Farm ID is required' });
      }

      const { farmId } = req.params;

      if (!req.body || !req.body.message) {
        return res.status(400).json({ message: 'Message is required in request body' });
      }

      console.log("Fetching daily weather insights for farmId:", farmId);

      const weatherData = await fetchDailyWeather(farmId);

      if (!weatherData) {
        throw new Error("Failed to fetch daily weather data");
      }

      const chatCompletion = await getGroqDailyChatCompletion(req.body.message, weatherData);

      if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices[0]?.message?.content) {
        throw new Error("Invalid response from Groq API");
      }

      const responseText = String(chatCompletion.choices[0]?.message?.content || "").trim();

const insights = responseText
  .split(/(?<=\.)\s+/) 
  .map(line => line.replace(/^\d+\.\s*/, "").trim())
  .filter(line => line.length > 0);

res.status(200).json({
  message: insights.map((line, index) => `${index + 1}. ${line}`)
});


  } catch (error) {
      console.error("Error in getDailyWeatherInsights:", error.message);
      res.status(500).json({ message: error.message || 'Failed to get insights' });
  }
}

async function fetchDailyWeather(farmId) {
  try {
    const url = `http://localhost:5000/current-weather/${farmId}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Failed to fetch daily weather");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching daily weather data:", error.message);
    return null;
  }
}

async function getGroqDailyChatCompletion(message, weatherData) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are an expert agricultural consultant. Based on the provided **daily weather forecast**, give two insights to help the farmer manage their crops efficiently. Be concise and practical.`,
      },
      {
        role: 'assistant',
        content: `Daily weather forecast:\n
        - City: ${weatherData.location.cityName}
        - Conditions: ${weatherData.weatherConditions.description}
        - Temperature: ${weatherData.temperature.current}°C (Min: ${weatherData.temperature.min}°C, Max: ${weatherData.temperature.max}°C)
        - Feels Like: ${weatherData.temperature.feelsLike}°C
        - Humidity: ${weatherData.humidity.percentage}%
        - Wind: ${weatherData.wind.speed} m/s, Direction: ${weatherData.wind.direction}°
        - Cloud Coverage: ${weatherData.clouds.coverage}%
        - Sunrise: ${weatherData.sunTimes.sunrise}
        - Sunset: ${weatherData.sunTimes.sunset}`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    model: 'llama3-8b-8192',
  });
}

module.exports = { getDailyWeatherInsights };
