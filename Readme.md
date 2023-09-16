# Node.js MySQL API

This is a simple Node.js API for managing a list of beers in a MySQL database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 14 or higher)
- MySQL database set up with a table named 'beers' (columns: id, name, tagline, description, image)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>


Install project dependencies:

npm install 
npm install express dotenv express-handlebars body-parser mysql
npm install --save-dev nodemon



To start our application / our local server simply type the following command in the command line:
npm start



Create a .env file in the project root and configure your MySQL database connection:

DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name



Start the Node.js application:
npm start





The API will be accessible at http://localhost:5000.

API Endpoints
GET /: Get all beers
GET /:id: Get a specific beer by ID
POST /: Add a new beer
PUT /:id: Update a beer by ID
DELETE /:id: Delete a beer by ID
Usage
You can use tools like curl, Postman, or your preferred API client to interact with the API endpoints.

Example API Requests
Get all beers
curl http://localhost:5000


Get a specific beer by ID
curl http://localhost:5000/1


Add a new beer

curl -X POST -H "Content-Type: application/json" -d '{
  "name": "New Beer",
  "tagline": "Tagline",
  "description": "Description",
  "image": "beer.jpg"
}' http://localhost:5000



Update a beer by ID
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Updated Beer",
  "tagline": "Updated Tagline",
  "description": "Updated Description",
  "image": "updated_beer.jpg"
}' http://localhost:5000/1



Delete a beer by ID
curl -X DELETE http://localhost:5000/1



License
This project is licensed under the MIT License - see the LICENSE file for details.





Replace `<repository-url>`, `your_db_user`, `your_db_password`, and `your_db_name` with the appropriate values for your project.

This `README.md` file provides a brief introduction to the project, explains how to set it up and use it, and includes example API requests.


