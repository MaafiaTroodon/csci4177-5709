const mongoose = require("mongoose");
const User = require("../../models/User");

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
};

const isMissingRequiredFields = (name, email, age) =>
  name === undefined || email === undefined || age === undefined;

exports.handler = async (event, context) => {
  try {
    await connectDB();

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ success: false, message: 'Method not allowed' })
      };
    }

    const { name, email, age } = JSON.parse(event.body);

    if (isMissingRequiredFields(name, email, age)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "name, email, and age are required."
        })
      };
    }

    const existingUser = await User.findOne({ email: String(email).toLowerCase() });
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          message: "A user with this email already exists."
        })
      };
    }

    const user = await User.create({ name, email, age });

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: "User created successfully.",
        data: user
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};