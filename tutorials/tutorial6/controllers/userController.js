const mongoose = require("mongoose");
const User = require("../models/User");

const isMissingRequiredFields = (name, email, age) =>
  name === undefined || email === undefined || age === undefined;

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;

    if (isMissingRequiredFields(name, email, age)) {
      return res.status(400).json({
        success: false,
        message: "name, email, and age are required."
      });
    }

    const existingUser = await User.findOne({ email: String(email).toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists."
      });
    }

    const user = await User.create({ name, email, age });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user
    });
  } catch (error) {
    return next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users
    });
  } catch (error) {
    return next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID."
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user
    });
  } catch (error) {
    return next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID."
      });
    }

    if (isMissingRequiredFields(name, email, age)) {
      return res.status(400).json({
        success: false,
        message: "name, email, and age are required."
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID."
      });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: deletedUser
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
