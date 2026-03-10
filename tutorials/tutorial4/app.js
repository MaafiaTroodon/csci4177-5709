const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const users = [
  {
    id: crypto.randomUUID(),
    firstName: "ABC",
    email: "abc@abc.ca"
  },
  {
    id: crypto.randomUUID(),
    firstName: "XYZ",
    email: "xyz@xyz.ca"
  }
];

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Tutorial 4 Backend API",
    success: true,
    endpoints: {
      listUsers: "GET /users",
      addUser: "POST /add",
      updateUser: "PUT /update/:id",
      getUserByPath: "GET /user/:id",
      getUserByQuery: "GET /user?id=<id> or /user?username=<firstName>"
    }
  });
});

app.get("/users", (req, res) => {
  return res.status(200).json({
    message: "Users retrieved",
    success: true,
    users
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    });
  }

  return res.status(200).json({
    success: true,
    user
  });
});

app.get("/user", (req, res) => {
  const { id, username } = req.query;

  if (!id && !username) {
    return res.status(400).json({
      message: "Provide id or username query parameter",
      success: false
    });
  }

  const user = users.find((item) => item.id === id || item.firstName === username);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false
    });
  }

  return res.status(200).json({
    success: true,
    user
  });
});

app.post("/add", (req, res) => {
  const { firstName, email } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({
      message: "firstName and email are required",
      success: false
    });
  }

  const newUser = {
    id: crypto.randomUUID(),
    firstName,
    email
  };

  users.push(newUser);

  return res.status(201).json({
    message: "User added",
    success: true
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, email } = req.body;

  if (!firstName && !email) {
    return res.status(400).json({
      message: "Provide at least one field: firstName or email",
      success: false
    });
  }

  const userIndex = users.findIndex((item) => item.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
      success: false
    });
  }

  if (firstName) {
    users[userIndex].firstName = firstName;
  }

  if (email) {
    users[userIndex].email = email;
  }

  return res.status(200).json({
    message: "User updated",
    success: true
  });
});

app.use((req, res) => {
  return res.status(404).json({
    message: "Route not found",
    success: false
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    message: "Internal server error",
    success: false
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
