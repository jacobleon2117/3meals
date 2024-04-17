# 3MEALS

This folder contains the server-side code for managing recipes.

## Files:
- `recipes.js`: Defines the Mongoose schema for recipes and exports the Recipe model.
- `server.js`: Main server file responsible for handling incoming HTTP requests and routing them to the appropriate endpoints. It utilizes Express.js framework for building the RESTful API.
- `styles.css`: Contains CSS styles for styling the HTML elements in the front-end.
- `index.html`: Main HTML file for the application. It contains the structure and layout for displaying recipes and interacting with them.
- `favorite.html`: HTML file for displaying favorite recipes. It contains the structure and layout for showing recipes that users have marked as favorites.

## Getting Started:
To run the server, follow these steps:
1. Make sure you have Node.js and npm installed on your machine.
2. Navigate to the server folder in your terminal.
3. Run `npm install` to install the dependencies.
4. Once the dependencies are installed, run `npm start` to start the server.
5. The server will now be running locally on port 3000 by default.

## API Endpoints:
- `GET /recipes`: Fetches all recipes.
- `GET /recipes/:id`: Fetches a single recipe by ID.
- `POST /recipes`: Creates a new recipe.
- `PUT /recipes/:id`: Updates an existing recipe by ID.
- `DELETE /recipes/:id`: Deletes a recipe by ID.
- `GET /api/recipes`: Fetches recipes from Edamam API based on the search query.
- `GET /api/closest-matches`: Handles closest matches to a search query.

## Dependencies:
- Express: Fast, unopinionated, minimalist web framework for Node.js.
- Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
- Path: Module for handling file paths.
- Cors: Middleware for enabling Cross-Origin Resource Sharing.
- Node-fetch: A light-weight module that brings window.fetch to Node.js.

## MongoDB Configuration:
The server connects to a MongoDB database hosted on MongoDB Atlas. The connection string is provided in the `mongoose.connect()` function call in `server.js`.

## Edamam API Credentials:
The server utilizes the Edamam API to fetch recipes. The application ID and key are stored in `edamamAppId` and `edamamAppKey` variables in `server.js`. Make sure to keep these credentials secure.
