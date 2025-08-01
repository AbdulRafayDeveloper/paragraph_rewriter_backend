import { runGroqQuery } from "../../helpers/grokIntegration.js";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "../../helpers/apiResponses.js";

// API FOR NORMAL TEXT REWRITE
const normalTextRewrite = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return badRequestResponse(
        res,
        "Message exceeds the word limit of 1500 words",
        null
      );
    }

    const rewrittenText = await runGroqQuery(
      message,
      "Normal tone and dont use any kind of introductory phrases of text like 'here is te rewritten text' etc"
    );

    if (rewrittenText.status) {
      const formattedText = rewrittenText.content.replace(/\n/g, "");
      return successResponse(res, "Text rewritten successfully", formattedText);
    } else if (rewrittenText.status === 400) {
      return badRequestResponse(res, rewrittenText.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later!"
      );
    }
  } catch (error) {
    console.log(error);
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later!"
    );
  }
};

// API FOR FLUENT TEXT REWIRTE
const fluentTextRewrite = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return badRequestResponse(
        res,
        "Message exceeds the word limit of 1500 words",
        null
      );
    }
    const rewrittenText = await runGroqQuery(
      message,
      "Fluent tone and dont use any kind of introductory phrases of text like 'here is te rewritten text' etc"
    );

    if (rewrittenText.status === 200) {
      const formattedText = rewrittenText.content.replace(/\n/g, "");
      return successResponse(res, "Text rewritten successfully", formattedText);
    } else if (rewrittenText.status === 400) {
      return badRequestResponse(res, rewrittenText.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

// API FOR FORMAL TEXT REWRITE
const formalTextRewrite = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return badRequestResponse(
        res,
        "Message exceeds the word limit of 1500 words",
        null
      );
    }
    const rewrittenText = await runGroqQuery(
      message,
      "Formal tone and dont use any kind of introductory phrases of text like 'here is te rewritten text' etc"
    );

    if (rewrittenText.status === 200) {
      const formattedText = rewrittenText.content.replace(/\n/g, "");
      return successResponse(res, "Text rewritten successfully", formattedText);
    } else if (rewrittenText.status === 400) {
      return badRequestResponse(res, rewrittenText.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

// API FOR INNOVATIVE TEXT REWRITE
const innovativeTextRewrite = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return badRequestResponse(
        res,
        "Message exceeds the word limit of 1500 words",
        null
      );
    }
    const rewrittenText = await runGroqQuery(
      message,
      "Innovative tone and dont use any kind of introductory phrases of text like 'here is te rewritten text' etc"
    );

    if (rewrittenText.status === 200) {
      const formattedText = rewrittenText.content.replace(/\n/g, "");
      return successResponse(res, "Text rewritten successfully", formattedText);
    } else if (rewrittenText.status === 400) {
      return badRequestResponse(res, rewrittenText.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

// API FOR COHERENT TEXT REWRITE
const coherentTextRewrite = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return badRequestResponse(
        res,
        "Message exceeds the word limit of 1500 words",
        null
      );
    }
    const rewrittenText = await runGroqQuery(
      message,
      "Coherent tone and dont use any kind of introductory phrases of text like 'here is te rewritten text' etc"
    );

    if (rewrittenText.status === 200) {
      const formattedText = rewrittenText.content.replace(/\n/g, "");
      return successResponse(res, "Text rewritten successfully", formattedText);
    } else if (rewrittenText.status === 400) {
      return badRequestResponse(res, rewrittenText.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

// API FOR ACADEMIC TEXT REWRITE
const academicTextRewrite = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return badRequestResponse(res, "All fields are mandatory", null);
    }
    const wordCount = message.split(" ").length;
    if (wordCount > 1500) {
      return badRequestResponse(
        res,
        "Message exceeds the word limit of 1500 words",
        null
      );
    }
    const rewrittenText = await runGroqQuery(
      message,
      "Academic tone and dont use any kind of introductory phrases of text like 'here is te rewritten text' etc"
    );

    if (rewrittenText.status === 200) {
      const formattedText = rewrittenText.content.replace(/\n/g, "");
      return successResponse(res, "Text rewritten successfully", formattedText);
    } else if (rewrittenText.status === 400) {
      return badRequestResponse(res, rewrittenText.message, null);
    } else {
      return serverErrorResponse(
        res,
        "Internal server error. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

export {
  normalTextRewrite,
  fluentTextRewrite,
  formalTextRewrite,
  innovativeTextRewrite,
  coherentTextRewrite,
  academicTextRewrite,
};
