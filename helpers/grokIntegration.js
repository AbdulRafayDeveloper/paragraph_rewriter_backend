import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const runGroqQuery = async (message, tone) => {
  try {
    
    if (!message) {
      throw new Error("Message is required");
    }

    
    const wordCount = message.split(' ').length;
    if (wordCount > 1500) {
      throw new Error("Message exceeds the word limit of 1500 words");
    }

    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Rewrite the following text in a ${tone} tone: "${message}"`,
        },
      ],
      model: "llama3-8b-8192",
    });

    
    const responseContent = chatCompletion.choices[0]?.message?.content || "No response from Groq";
    return responseContent;
    
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error(error.message);
  }
};

export { runGroqQuery };
