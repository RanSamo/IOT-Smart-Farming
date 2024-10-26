const Groq = require('groq-sdk');
//need to use set GROQ_API_KEY=<my-key> in order to run this Groq_API_Key

//const { getAllAverageData } = require('./healthTrendfunc'); // need to make sure this is the correct way to use it.

const groq = new Groq({
  apiKey: process.env.Groq_API_Key // This is the default and can be omitted
});



async function getinsights(req, res) {
  try {
      const chatCompletion = await getGroqChatCompletion(req.body.message);
      res.json({ message: chatCompletion.choices[0]?.message?.content });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get insights' });
  }
}
  
  async function getGroqChatCompletion(message) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are are acting as a consulant for a farmer. The farmer is growing ${message}. Please provide a response as short as possible, and as decisive as possible to the farmer.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama3-8b-8192",
      
    });
  }

module.exports = { getinsights }

