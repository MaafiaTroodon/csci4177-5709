# Tutorial 4: Back-End Frameworks I

This is an individual deliverable for CSCI 4177/5709 (Winter 2026). The project implements a backend API using Express.js with CRUD-style endpoints for managing users.

* *Date Created*: 10 March 2026
* *Last Modification Date*: 10 March 2026
* *Lab URL*: <https://csci4177-tutorial4-api.onrender.com>
* *Git URL (GitHub)*: <https://github.com/MaafiaTroodon/csci4177-5709/tree/main/tutorials>
* *Git URL (GitLab)*: <https://git.cs.dal.ca/mdmahajan/csci4177-5709.git>

## Author

* [Malhar Mahajan](ml575444@dal.ca)

## Getting Started

### Prerequisites

Install the following:

* Node.js
* npm

### Installing

Clone the repository and go to Tutorial 4:

```bash
cd tutorials/tutorial4
npm install
```

Start the server:

```bash
npm start
```

## API Endpoints

* `GET /users`
* `POST /add`
* `PUT /update/:id`
* `GET /user/:id`
* `GET /user?id=<id>` or `GET /user?username=<firstName>`

## Running the tests

Use `curl` or Postman to test endpoints.

Example:

```bash
curl -s https://csci4177-tutorial4-api.onrender.com/users
```

## Deployment

This backend API is deployed on Render:

* <https://csci4177-tutorial4-api.onrender.com>

## Built With

* [Express.js](https://expressjs.com/) - Backend framework used to build API endpoints
* [Node.js](https://nodejs.org/) - Runtime environment
