import { runGroqSentenceRewriter } from "../../helpers/grokIntegration.js";
import {
  badRequestResponse,
  successResponse,
  serverErrorResponse,
} from "../../helpers/apiResponses.js";

const rewriteSentences = async (req, res) => {
  try {
    const { inputText, tone } = req.body;

    if (!inputText || !tone) {
      return badRequestResponse(
        res,
        "Both 'inputText' and 'tone' are mandatory fields.",
        null
      );
    }

    const rewrittenSentences = await runGroqSentenceRewriter(inputText, tone);

    if (rewrittenSentences.status === 200) {
      let { content } = rewrittenSentences;

      content = content.replace(/[#"'\\]/g, "");

      return successResponse(res, "Sentences rewritten successfully", {
        content,
        sentenceCount: rewrittenSentences.sentenceCount,
      });
    } else if (rewrittenSentences.status === 400) {
      return badRequestResponse(res, rewrittenSentences.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later."
      );
    }
  } catch (error) {
    console.error("Error in rewriteSentences:", error);
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later."
    );
  }
};

export default rewriteSentences;
