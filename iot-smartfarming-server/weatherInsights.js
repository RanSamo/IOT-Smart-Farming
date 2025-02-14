const { getCurrentWeather } = require('./routes/dailyforecast');
const { getWeeklyForecastMiddleware } = require('./routes/weeklyforecast');
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

    const dailyWeatherData = await getWeatherData(req, res, farmId, getCurrentWeather);
    const weeklyWeatherData = await getWeatherData(req, res, farmId, getWeeklyForecastMiddleware);

    if (!dailyWeatherData || !weeklyWeatherData) {
      throw new Error("Failed to fetch weather data");
    }

    const chatCompletion = await getGroqWeatherChatCompletion(req.body.message, dailyWeatherData, weeklyWeatherData);

    if (!chatCompletion || !chatCompletion.choices || !chatCompletion.choices[0]?.message?.content) {
      throw new Error("Invalid response from Groq API");
    }

    const responseText = String(chatCompletion.choices[0]?.message?.content || "").trim();

    const insights = extractInsights(responseText);

    res.status(200).json({
      insights: insights
    });

  } catch (error) {
    console.error("Error in getWeatherInsights:", error.message);
    res.status(500).json({ message: error.message || 'Failed to get insights' });
  }
}

async function getWeatherData(req, res, farmId, weatherFunction) {
  return new Promise((resolve, reject) => {
    req.params.farmId = farmId;
    const originalSend = res.send;
    res.send = function (data) {
      res.send = originalSend;
      resolve(JSON.parse(data));
    };
    weatherFunction(req, res);
  });
}

async function getGroqWeatherChatCompletion(message, dailyWeatherData, weeklyWeatherData) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a consultant for a farmer. You are receiving weekly and daily forecasts summaries, 
        we need 2 insights for daily and 2 insights for weekly,
        please provide the 2 most important ones for each forcest. 
        Write only the insights themselves with no other comments not even "dailt weather/weekly weather" or explanations I need to take your insights and extract them to a map so your comments interfere. Be concise and helpful.`,

      },
      {
        role: 'user',
        content: JSON.stringify({
          dailyWeather: dailyWeatherData,
          weeklyWeather: weeklyWeatherData,
          userMessage: message
        }),
      },
    ],
    model: 'llama3-8b-8192',
  });
}

function extractInsights(responseText) {
    const insights = responseText
      .split(/(?<=\.)\s+/)
      .map(line => line.replace(/^\d+\.\s*/, "").trim())
      .filter(line => line.length > 0 && !line.startsWith("Daily Insights") && !line.startsWith("Weekly Insights"));
  
    // Remove the first line
    if (insights.length > 0) {
      insights.shift();
    }
  
    return insights;
  }

module.exports = { getWeatherInsights };