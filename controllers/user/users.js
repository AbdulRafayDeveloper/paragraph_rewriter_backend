import { getAllUsers, getUserById } from "../../services/userServices.js";
import {
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
} from "../../helpers/apiResponses.js";

const getAllUsersController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return unauthorizedResponse(
        res,
        "The user is not authorized for this action",
        null
      );
    }
    const users = await getAllUsers();
    if (users) {
      return successResponse(res, "All users fetched successfully", users);
    } else {
      return serverErrorResponse(
        res,
        "Failed to fetch users. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal Server Error. Please try again later!"
    );
  }
};

const getOneUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return unauthorizedResponse(
        res,
        "The user is not authorized for this action",
        null
      );
    }
    const id = req.params.id;
    const user = await getUserById(id);
    if (user) {
      return successResponse(res, "User fetched successfully", user);
    } else {
      return notFoundResponse(res, "User not found", null);
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal server error. Please try again later"
    );
  }
};

export { getAllUsersController, getOneUserController };
