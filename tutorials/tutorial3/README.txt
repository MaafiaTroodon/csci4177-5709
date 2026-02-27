FName LName
CSCI 4177/5709 - Tutorial 3 (Front-End Frameworks II)
Winter 2026

Repository Links
- GitHub (private): https://github.com/<your-username>/csci4177-5709
- GitLab (private): https://git.cs.dal.ca/<your-netid>/csci4177-5709

Deployment Link (Netlify)
- https://<your-netlify-site>.netlify.app

Tutorial 3 Folder
- tutorials/tutorial3

Tech Stack
- React + Vite
- react-router-dom
- Fetch API

Implemented Routes
- /login
- /users
- /users/:id

Features
- Login with Email + Password form
- POST login request to https://express-t4.onrender.com/api/login using:
  - username = form email
  - password = form password
- Redirect to /users on successful login
- Auth flag stored in localStorage as t3_auth=1
- Protected routes: /users and /users/:id redirect to /login when unauthenticated
- User listing from GET https://express-t4.onrender.com/api/users
- Client-side search filter by first name or last name (case-insensitive)
- User detail view from GET https://express-t4.onrender.com/api/users/:id
- Netlify SPA redirect config included in netlify.toml

Local Setup
1) cd tutorials/tutorial3
2) npm install
3) npm run dev
4) Open the local URL shown by Vite

Build
1) npm run build
2) (optional) npm run preview

Notes for Submission
- Rename this file to: FName_LName_README.txt before Brightspace submission.
- Ensure this README includes BOTH GitHub + GitLab repo links and Netlify deployment link.
- Keep repositories private.
- Add instructor and TAs as Maintainers on GitLab (required for marking).
