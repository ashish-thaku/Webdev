# Webdev
MERN STACK

# Listings Management App
A simple full-stack web app built with **Express**, **MongoDB**, and **Mongoose** to create, read, update, and delete property listings. It includes a user-friendly interface to edit listings with image URLs, descriptions, pricing, and location.

---

## Features

- View all listings on the index page with images, titles, and prices
- Edit listings using a clean form
- Update listing data including title, description, image URL, price, country, and location
- RESTful routing with Express and method-override for PUT requests
- Image URL stored as a string and displayed correctly on the front end

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- EJS templating engine
- Method Override for PUT/DELETE forms
- Bootstrap 5 for basic styling

---

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/listings-app.git
cd listings-app
npm install

## Setup MongoDB: 
MONGODB_URI=mongodb://localhost:27017/listingsDB

##Project Structure
/init
    data.js
    index.js         #data for db
/models
  Listing.js         # Mongoose schema for listings
/routes
  listings.js        # Express routes for CRUD operations
/views
  listings/
    index.ejs        # List all listings
    edit.ejs         # Edit form for listings
/public
  /css               # Static CSS files
app.js               # Main Express app entry point





