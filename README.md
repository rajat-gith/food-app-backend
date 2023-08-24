# Food Recipe App Backend

Welcome to the backend repository for the Food Recipe App. This repository contains the server-side implementation of the app, built using Node.js, MongoDB, and Express.js. The app allows users to search for recipes based on names or ingredients.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Routes](#routes)
- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search recipes by name or ingredients.
- Retrieve detailed recipe information including name, description, ingredients, steps, images, and user details.
- Built-in error handling and data validation.

## Installation

1. Clone this repository to your local machine using:
2. Navigate to the project directory:
3. Install the required dependencies:

## Routes

- `POST /api/register`: Register User
- `POST /api/login`: Login User
- `GET /api/receipes`: Fetch all receipes
- `GET /api/receipes/user/:userId/recipes`: Fetch all receipes created by a specific user
- `GET /api/receipes/:id`: Fetch receipe by Id
- `PUT /api/receipes/:id/update`: Update receipe


- Query parameter: `keyword` (required) - The search keyword.
- Returns: List of recipes matching the search criteria.

## Dependencies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- Cors
- Dotenv
- Jsonwebtoken
- Multer
- Nodemon

## Getting Started

1. Make sure you have Node.js and MongoDB installed on your machine.
2. Configure your MongoDB connection in `config.js` or through environment variables.
3. Install the project dependencies using `npm install`.
4. Run the server using `npm start`.
5. Access the API at `http://localhost:3000/api`.

