import { runGroqParagraphGenerator } from "../../helpers/grokIntegration.js";
import { badRequestResponse, successResponse, serverErrorResponse } from "../../helpers/apiResponses.js";

const generateParagraphs = async (req, res) => {
  try {
    const { inputText, tone, length, paragraphCount } = req.body;
    if (!inputText || !tone || !length || !paragraphCount) {
      return badRequestResponse(
        res,
        "All fields are mandatory: inputText, tone, length, and paragraphCount",
        null
      );
    }
    const generatedParagraphs = await runGroqParagraphGenerator(
      inputText,
      tone,
      length,
      parseInt(paragraphCount, 10)
    );

    if (generatedParagraphs.status === 200) {
      let { content, wordCount } = generatedParagraphs;
      content = content.replace(/[#"'\\]/g, "");
      return successResponse(res, "Paragraphs generated successfully", {
        content,
        wordCount,
      });
    } else if (generatedParagraphs.status === 400) {
      return badRequestResponse(res, generatedParagraphs.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later"
      );
    }
  } catch (error) {
    console.error("Error in generateParagraphs:", error);
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

export default generateParagraphs;
