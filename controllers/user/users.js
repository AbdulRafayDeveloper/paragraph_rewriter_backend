import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  countUsers,
  listUsers,
} from "../../services/userServices.js";
import {
  badRequestResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
} from "../../helpers/apiResponses.js";
import fs from "fs";
import path from "path";
const getAllUsersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || "";
    const userId = req.user._id;
    if (!userId) {
      return unauthorizedResponse(
        res,
        "The user is not authorized for this action",
        null
      );
    }
    let query = { role: { $ne: "admin" } };
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ];
    }
    const totalRecords = await countUsers(query);
    if (!totalRecords) {
      return notFoundResponse(res, "No users found.", null);
    }
    const totalPages = Math.ceil(totalRecords / pageSize);
    const skip = (page - 1) * pageSize;
    const users = await listUsers(query, skip, pageSize);
    if (!users || users.length === 0) {
      return notFoundResponse(res, "No users found for the given page.", null);
    }
    return successResponse(res, "Users fetched successfully.", {
      records: users,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
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

const deleteUserController = async (req, res) => {
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
    if (!user) {
      return notFoundResponse(res, "The user is not found!", null);
    }
    const userDelete = await deleteUser(user);
    if (userDelete) {
      return successResponse(res, "User deleted successfully", userDelete);
    } else {
      return serverErrorResponse(
        res,
        "Unable to delete user. Please try again later"
      );
    }
  } catch (error) {
    return serverErrorResponse(
      res,
      "Internal Server Error. Please try again later"
    );
  }
};

const updateUserController = async (req, res) => {
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
    if (userId !== id) {
      return unauthorizedResponse(res, "You can only update your own profile", null);
    }
    const findUser = await getUserById(id);
    if (!findUser) {
      return notFoundResponse(res, "User is not found", null);
    }
    const updates = { ...req.body };

    if (req.file) {
      updates.profilePicture = `/uploads/${req.file.filename}`;
    }
    const updatedUser = await updateUser(id, updates);
    if (updatedUser) {
      return successResponse(res, "User updated successfully", updatedUser);
    } else {
      return serverErrorResponse(
        res,
        "Failed to update user.Please try again later"
      );
    }
  } catch (error) {
    console.log(error);
    return serverErrorResponse(
      res,
      "Internal Server Error. Please try again later!"
    );
  }
};
export {
  getAllUsersController,
  getOneUserController,
  deleteUserController,
  updateUserController,
};
