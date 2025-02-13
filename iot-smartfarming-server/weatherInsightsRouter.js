//const {getWeeklyForecast} = require('./routes/weeklyforecast');
//const {getDailyWeatherInsights} = require('./dailyWeatherInsights');
const {getCurrentWeather} = require('./routes/dailyforecast');
const {getWeeklyForecast} = require('./routes/weeklyforecast');
const Groq = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.Groq_API_Key 
});


async function getWeatherInsights(req, res) {
  try {
      if (!req.params || !req.params.farmId) {
        return res.status(400).json({ message: 'Farm ID is required' });
      }

      const { farmId } = req.params;
      
      if (!req.body || !req.body.message) {
        return res.status(400).json({ message: 'Message is required in request body' });
      }

      console.log("Fetching weather insights for farmId:", farmId);
      
      const chatCompletion = await getGroqChatCompletion(req.body.message, farmId);

      if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices[0]?.message?.content) {
        throw new Error("Invalid response from Groq API");
      }

      const responseText = String(chatCompletion.choices[0]?.message?.content || "").trim();
      
      const insights = responseText
      .split(/(?<=\.)\s+/) 
      .map(line => line.replace(/^\d+\.\s*/, "").trim())
      .filter((line, index, arr) =>
      !(index > 0 && arr[index - 1].endsWith(":") && line === "1.") 
  );

res.status(200).json({
  message: insights.map((line, index) => `${index + 1}. ${line}`)
});



      

  } catch (error) {
      console.error("Error in getWeatherInsights:", error.message);
      res.status(500).json({ message: error.message || 'Failed to get insights' });
  }
}


async function getGroqChatCompletion(message, farmId) {
  const weeklyWeatherSummary = getWeeklyForecast(farmId);
  const dailyWeatherSummary = getCurrentWeather(farmId);
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a consultant for a farmer. You are receiving weekly and daily forecasts summaries, we need 2 insights for each of the summaries, please provide the 2 most important ones for each forcest. Be concise and helpful.
 `,
      },
      {
        role: 'assistant',
        content: `Weather forecasts: ${weeklyWeatherSummary, dailyWeatherSummary}`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    model: 'llama3-8b-8192',
  });
}

module.exports = { getWeatherInsights };



// // פונקציה לשליפת תחזית מזג האוויר מהראוטר הקיים
// const fetchWeatherForecastFromRouter = async (farmId) => {
//   const url = `http://localhost:5000/api/weather/weeklyforecast/${farmId}`;
//   const response = await axios.get(url);
//   return response.data;
// };

// async function getWeatherInsights(req, res) {
//   try {
//     const { farmId, message } = req.body;

//     if (!farmId || !message) {
//       return res
//         .status(400)
//         .json({ message: 'farmId and message are required fields.' });
//     }

//     // שליפת תחזית מזג האוויר מהראוטר הקיים
//     const weatherData = await fetchWeatherForecastFromRouter(farmId);

//     // עיבוד התחזית לפורמט טקסטואלי
//     const weatherSummary = weatherData
//       .map(
//         (day) =>
//           `${day.date}: ${day.description}, temperatures between ${day.tempMin}°C and ${day.tempMax}°C`
//       )
//       .join('. ');

//     // קריאה ל-Groq לקבלת תובנות
//     const chatCompletion = await getGroqChatCompletion(message, weatherSummary);

//     res.json({ message: chatCompletion.choices[0]?.message?.content });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to get weather insights' });
//   }
// }

// async function getGroqChatCompletion(message, weatherSummary) {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: 'system',
//         content: `You are a consultant for a farmer. Use the provided weather forecast to offer advice. Be concise and helpful.`,
//       },
//       {
//         role: 'assistant',
//         content: `Weather forecast: ${weatherSummary}`,
//       },
//       {
//         role: 'user',
//         content: message,
//       },
//     ],
//     model: 'llama3-8b-8192',
//   });
// }

// async function getWeatherInsights(req, res) {
//   try {
//       const { farmId } = req.params;
//       const chatCompletion = await getGroqChatCompletion(req.body.message, farmId);
//       res.json({ message: chatCompletion.choices[0]?.message?.content });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Failed to get insights' });
//   }
// }
