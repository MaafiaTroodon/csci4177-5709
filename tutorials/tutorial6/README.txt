Malhar Mahajan
CSCI 4177/5709 Winter 2026
Tutorial 6: REST API with Database [Individual Deliverable]

GitHub Repository:
<PASTE_GITHUB_REPO_LINK>

GitLab Repository:
<PASTE_GITLAB_REPO_LINK>

Deployment Link:
<PASTE_DEPLOYMENT_LINK>

Overview:
This tutorial is a backend-only REST API built with Node.js and Express. The application is connected to a MongoDB Atlas database using Mongoose. It supports CRUD-style user operations required for Tutorial 6:
- POST create user
- GET all users
- GET user by ID
- PUT update user by ID
- DELETE user by ID

Important Note:
The default route names used in this submission are:
- POST /create
- GET /users
- GET /users/:id
- PUT /update/:id
- DELETE /delete/:id

If Tutorial 5 used different route names for the first four operations, update this project before submission so those routes exactly match your Tutorial 5 routes.

Technology Used:
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

MongoDB Atlas:
This project uses a remotely deployed MongoDB Atlas cluster. The application connects using the MONGODB_URI environment variable stored in the .env file.

Project Structure:
- server.js
- config/db.js
- models/User.js
- controllers/userController.js
- routes/userRoutes.js
- middleware/notFound.js
- middleware/errorHandler.js

User Schema:
- name: String, required
- email: String, required, unique
- age: Number, required

Setup Steps:
1. Open the project folder in the terminal.
2. Run: npm install
3. Copy .env.example to .env
4. Replace MONGODB_URI in .env with your actual MongoDB Atlas connection string.
5. Run: npm run dev
6. The server starts on http://localhost:5000

API Summary:
1. POST /create
   Creates a new user.
2. GET /users
   Returns the list of all users.
3. GET /users/:id
   Returns one user by MongoDB ObjectId.
4. PUT /update/:id
   Updates an existing user by MongoDB ObjectId.
5. DELETE /delete/:id
   Deletes a user by MongoDB ObjectId.

Response Format:
All API responses use JSON with:
- success
- message
- data (when relevant)

Example JSON Body:
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 24
}

Code References:
- Express documentation: https://expressjs.com/
- Mongoose documentation: https://mongoosejs.com/
- MongoDB Atlas documentation: https://www.mongodb.com/docs/atlas/
- Node.js documentation: https://nodejs.org/en/docs

Deployment:
The app can be deployed to Render or Railway. The deployed application must remain remotely accessible for marking. Ensure the deployment link in this README matches the correct Tutorial 6 deployment.

Submission Notes:
- Include this README.txt file in the repository.
- Ensure the GitHub repository is mirrored to GitLab.
- Ensure the GitLab repository is private but accessible to the instructor and TAs.
- Missing GitLab link or missing deployment link can result in severe grade penalties according to the tutorial instructions.
- Confirm the deployed application is working before final submission.
