import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const runGroqQuery = async (message, tone) => {
  try {
    if (!message) {
      return { status: 400, message: "Message is required" };
    }

    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return {
        status: 400,
        message: "Message exceeds the word limit of 1500 words",
      };
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

    const responseContent =
      chatCompletion.choices[0]?.message?.content || "No response from Groq";
    return { status: 200, message: "Success", content: responseContent };
  } catch (error) {
    console.error("Error in runGroqQuery:", error);
    return {
      status: 500,
      message: "Internal server error. Please try again later",
    };
  }
};

const runGroqParagraphGenerator = async (
  inputText,
  tone,
  length,
  paragraphCount
) => {
  try {
    if (!inputText || typeof inputText !== "string") {
      return {
        status: 400,
        message: "Input text is required and must be a string",
      };
    }
    if (
      ![
        "Formal",
        "Informal",
        "Professional",
        "Diplomatic",
        "Academic",
        "Simplified",
        "Persuasive",
      ].includes(tone)
    ) {
      return { status: 400, message: "Invalid tone selected" };
    }
    if (!["Default", "Concise", "Detailed"].includes(length)) {
      return { status: 400, message: "Invalid paragraph length" };
    }
    if (![1, 3, 5].includes(paragraphCount)) {
      return { status: 400, message: "Invalid paragraph count" };
    }
    const prompt = `
      Based on the input: "${inputText}",
      generate ${paragraphCount} ${length.toLowerCase()} paragraph(s) in a ${tone} tone. 
      Ensure that the response is coherent, relevant, and well-structured.
      Do not use introductory phrases like "here is the response".
    `;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    const responseContent =
      chatCompletion.choices[0]?.message?.content || "No response from Groq";

    const wordCount = responseContent
      .split(/\s+/)
      .filter((word) => word.trim() !== "").length;

    return {
      status: 200,
      message: "Success",
      content: responseContent.trim(),
      wordCount,
    };
  } catch (error) {
    console.error("Error in runGroqParagraphGenerator:", error);
    return {
      status: 500,
      message: "Internal server error. Please try again later",
    };
  }
};

const runGroqSentenceRewriter = async (inputText, tone) => {
  try {
    if (!inputText || typeof inputText !== "string") {
      return {
        status: 400,
        message: "Input text is required and must be a string",
      };
    }

    const validTones = ["simplify", "shorten", "improver", "randomizer"];
    if (!validTones.includes(tone)) {
      return {
        status: 400,
        message: `Invalid tone. Valid tones are: ${validTones.join(", ")}`,
      };
    }

    const sentences = inputText.split(/(?<=\.)\s+/);
    const rewrittenSentences = [];

    for (const sentence of sentences) {
      if (sentence.trim() === "") continue;

      const prompt = `Rewrite the sentence: "${sentence}" in a ${tone} tone. Ensure it is well-structured, precise, and appropriate for the tone selected. 
      Do not use introductory phrases like "here is the response". Dont give any kind of notes just the answer to prompt should be the rewritten text`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
      });

      const rewrittenSentence =
        chatCompletion.choices[0]?.message?.content
          ?.replace(/[\#\"\'\\]/g, "")
          .trim() || null;

      if (!rewrittenSentence) {
        return {
          status: 400,
          message: `Failed to rewrite sentence: "${sentence}". No valid response from Groq.`,
        };
      }

      rewrittenSentences.push(rewrittenSentence);
    }

    const outputText = rewrittenSentences.join(" ");

    return {
      status: 200,
      message: "Sentences rewritten successfully",
      content: outputText,
      sentenceCount: rewrittenSentences.length,
    };
  } catch (error) {
    console.error("Error in runGroqSentenceRewriter:", error);
    return {
      status: 500,
      message: "Internal server error. Please try again later",
    };
  }
};

export { runGroqQuery, runGroqParagraphGenerator, runGroqSentenceRewriter };
