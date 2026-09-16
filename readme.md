# Airbnb Clone

Fully hand-written backend code for an Airbnb clone using Node.js, Express, MongoDB, and Tailwind CSS. The platform allows users to browse homes, register as guests or hosts, and manage properties.

## 🚀 Features

### User Authentication & Authorization
- **Sign Up / Log In / Log Out**: Secure user authentication using `bcrypt` for password hashing.
- **Roles**: 
  - **Guest**: Can browse homes, add homes to their favorites, and book homes.
  - **Host**: Can manage their own properties (add, edit, delete homes).
- **Session Management**: Secure sessions stored in MongoDB using `connect-mongodb-session`.

### Core Functionalities
- **Property Management (Hosts)**: 
  - Add new homes with details like name, price, location, rating, and image.
  - Image upload functionality handled via `multer`.
  - Edit and delete owned homes.
- **Guest Features**:
  - Browse all available homes.
  - Add or remove homes from a personalized favorites list.
- **Form Validation**: Server-side form validation using `express-validator`.
- **Flash Messages**: Interactive success/error notifications via `connect-flash`.

## 🛠️ Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Template Engine**: EJS (Embedded JavaScript templating)
- **Styling**: Tailwind CSS (via `@tailwindcss/cli`)
- **File Uploads**: Multer
- **Development Tool**: Nodemon

## 📁 Project Structure

- `/controllers` - Contains the logic for handling requests (Auth, Host, Store).
- `/models` - Mongoose database schemas (`home.js`, `user.js`).
- `/routes` - Express routers mapping endpoints to controllers.
- `/views` - EJS templates for rendering the frontend (`auth`, `host`, `store`, `partials`).
- `/public` - Static assets including images and compiled Tailwind CSS.
- `/utils` - Utility functions (e.g., file uploading configuration).
- `/validator` - Custom validation logic for forms.
- `app.js` - The main entry point of the application setting up the server, database connection, and middleware.

## ⚙️ Setup & Installation

1. Clone the repository and navigate into the project directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create the Tailwind CSS build (if needed):
   ```bash
   npm run build:css
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and visit `http://localhost:3000`.

*Note: Ensure your MongoDB connection string in `app.js` is correct and accessible before starting the server.*
