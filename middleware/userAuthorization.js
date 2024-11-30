import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  successResponse,
  badRequestResponse,
  notFoundResponse,
  conflictResponse,
  serverErrorResponse,
  unauthorizedResponse,
} from "../helpers/apiResponses.js";
const authenticateLoginToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return badRequestResponse(res, "Authentication token is required", null);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return notFoundResponse(res, "Authentication token is not provided", null);
  }

  try {
    const decoded = jwt.verify(token, process.env.ADMIN_LOGIN_TOKEN);

    req.user = { _id: decoded.id, role: decoded.role };
    if (req.user.role !== "admin") {
      return unauthorizedResponse(
        res,
        "Access denied. Admin role required.",
        null
      );
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return unauthorizedResponse(res, "Expired token, log in again");
    } else if (error.name === "JsonWebTokenError") {
      return unauthorizedResponse(res, "Invalid token, log in again");
    } else {
      return serverErrorResponse(res, "An unexpected error occurred");
    }
  }
};

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return badRequestResponse(res, "Authentication token is required", null);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return notFoundResponse(res, "Authentication token is not provided", null);
  }

  try {
    const decodedUnverified = jwt.decode(token);

    if (!decodedUnverified || !decodedUnverified.role) {
      return unauthorizedResponse(res, "Invalid token format", null);
    }

    const secretKey =
      decodedUnverified.role === "user"
        ? process.env.USER_LOGIN_TOKEN
        : decodedUnverified.role === "admin"
        ? process.env.ADMIN_LOGIN_TOKEN
        : null;

    if (!secretKey) {
      return unauthorizedResponse(res, "Invalid user role in token", null);
    }
    const decoded = jwt.verify(token, secretKey);

    req.user = { _id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return unauthorizedResponse(res, "Expired token, log in again", null);
    } else if (error.name === "JsonWebTokenError") {
      console.log(error);
      return unauthorizedResponse(res, "Invalid token, log in again", null);
    } else {
      return serverErrorResponse(res, "An unexpected error occurred");
    }
  }
};

export { authenticateLoginToken, authenticateUser };
