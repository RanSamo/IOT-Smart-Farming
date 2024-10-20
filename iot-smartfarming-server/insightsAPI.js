import Groq from 'groq-sdk';
//need to use set GROQ_API_KEY=<my-key> in order to run this Groq_API_Key

//const { getAllAverageData } = require('./healthTrendfunc'); // need to make sure this is the correct way to use it.

const groq = new Groq({
  apiKey: process.env.Groq_API_Key // This is the default and can be omitted
});


export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
  }
  
  export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "Can you please provide 3 most valuable beginner tips for a new farmer?",
        },
      ],
      model: "llama3-8b-8192",
  
    });
  }

main();

