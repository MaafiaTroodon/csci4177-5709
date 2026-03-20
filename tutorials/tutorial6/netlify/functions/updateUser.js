const mongoose = require("mongoose");
const User = require("../../models/User");

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};

const isMissingRequiredFields = (name, email, age) =>
  name === undefined || email === undefined || age === undefined;

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.handler = async (event, context) => {
  try {
    await connectDB();

    if (event.httpMethod !== 'PUT') {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: 'Method not allowed' })
      };
    }

    const { id } = event.queryStringParameters;
    const { name, email, age } = JSON.parse(event.body);

    if (!isValidObjectId(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid user ID."
        })
      };
    }

    if (isMissingRequiredFields(name, email, age)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "name, email, and age are required."
        })
      };
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
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: "User not found."
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "User updated successfully.",
        data: updatedUser
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};