import User from "../models/userModel.js";

const findUser = async (data) => {
  const user = await User.exists(data);
  return user;
};

const findOneUser = async (data) => {
  const user = await User.findOne(data);
  return user;
};

const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

export { findUser, findOneUser, createUser, getAllUsers, getUserById };
