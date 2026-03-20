const mongoose = require("mongoose");
const User = require("../../models/User");

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};

exports.handler = async (event, context) => {
  try {
    await connectDB();

    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: 'Method not allowed' })
      };
    }

    const users = await User.find().sort({ createdAt: -1 });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Users fetched successfully.",
        data: users
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};