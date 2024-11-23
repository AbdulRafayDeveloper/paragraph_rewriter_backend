import multer from "multer";
import path from "path";
// import { PDFExtract } from "pdf.js-extract";
import textract from "textract";
import { badRequestResponse, serverErrorResponse } from "./apiResponses.js";
import pdfParse from "pdf-parse";

const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text; // Extracted text
  } catch (err) {
    throw new Error("Error extracting PDF text: " + err.message);
  }
};

// const pdfExtract = new PDFExtract();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = /txt|pdf|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extname) {
    cb(null, true);
  } else {
    cb(new Error("Only .txt, .pdf, and .docx files are allowed!"), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

export const readFileContent = async (file, res) => {
  const extname = path.extname(file.originalname).toLowerCase();

  if (!file.buffer) {
    return badRequestResponse(
      res,
      "No file uploaded. Please upload a valid file.",
      null
    );
  }

  try {
    if (extname === ".pdf") {
      const data = await extractTextFromPDF(file.buffer);
      return data;
    } else if (extname === ".docx") {
      const data = await extractTextFromDocx(file.buffer);
      return data;
    } else if (extname === ".txt") {
      return file.buffer.toString("utf8");
    } else {
      return badRequestResponse(
        res,
        "Unsupported file type. Only .txt, .pdf, and .docx files are allowed."
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Failed to read file content. Please check the format."
    );
  }
};

// const extractTextFromPDF = async (buffer) => {
//   return new Promise((resolve, reject) => {
//     pdfExtract.extractBuffer(buffer, {}, (err, data) => {
//       if (err) return reject(err);
//       const text = data.pages
//         .map((page) => page.content.map((item) => item.str).join(" "))
//         .join("\n");
//       resolve(text);
//     });
//   });
// };


const extractTextFromDocx = async (buffer) => {
  return new Promise((resolve, reject) => {
    textract.fromBufferWithMime(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      buffer,
      (err, text) => {
        if (err) return reject(new Error("Failed to read DOCX content."));
        resolve(text);
      }
    );
  });
};