const mongoose = require("mongoose");
const User = require("../../models/User");

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.handler = async (event, context) => {
  try {
    await connectDB();

    if (event.httpMethod !== 'DELETE') {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: 'Method not allowed' })
      };
    }

    const { id } = event.queryStringParameters;

    if (!isValidObjectId(id)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "Invalid user ID."
        })
      };
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
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
        message: "User deleted successfully.",
        data: deletedUser
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};