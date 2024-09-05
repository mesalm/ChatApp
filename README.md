# funChat Project

Welcome to the `funChat` project! This is a chat application that provides users with features for real-time communication, profile management, and more.

## Overview

The `funChat` project is designed to offer users the ability to:

- **Login and Logout**: Users can log in to their accounts and log out when they are done.
- **Update Profile**: Users can update their profile information, including their username, phone number, and profile picture.
- **Real-Time Messaging**: Engage in real-time conversations with friends.
- **Profile Picture Upload**: Users can upload and update their profile pictures.

## Features

- **User Authentication**: Secure login and logout functionality using JWT (JSON Web Tokens).
- **Profile Management**: Update user profile details such as username, phone number, and profile picture.
- **Real-Time Communication**: Chat with friends in real-time using Socket.IO.
- **Profile Picture Handling**: Upload and display profile pictures.

## Requirements

Ensure you have the following tools and software:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)
- [npm](https://www.npmjs.com/) (or [Yarn](https://yarnpkg.com/))

## Installation

Follow these steps to install the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
Navigate to the project directory:

bash
Copy code
cd YOUR_REPOSITORY_NAME
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root of the project and specify the necessary environment variables such as:

env
Copy code
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_uri
Running the Project
To start the project, use:

bash
Copy code
npm start
Open your browser and go to http://localhost:4000 to access the application.
## Swagger Documentation

Swagger is used to document the API endpoints. To view the documentation:

1. Run the server: `npm start`
2. Open your browser and navigate to: `http://localhost:4000/api-docs`

## Endpoints

- **GET /**: Serve the home page.
- **GET /chat**: Serve the chat page (authenticated).
- **GET /login**: Serve the login page.
- **GET /updateUser**: Serve the update user page (authenticated).
- **GET /404**: Serve the 404 error page.
- **GET /register**: Serve the registration page.
- **GET /HomePage**: Serve the home page (authenticated).
- **GET /profile**: Serve the profile page (authenticated).
- **GET /api/v1/userProfile**: Get user profile data (authenticated).
- **POST /api/v1/register**: Register a new user.
- **POST /api/v1/login**: Log in a user.
- **POST /api/v1/updateUser**: Update user details.
- **POST /logout**: Log out the current user.

Authentication and Profile Management
Login
Endpoint: /login
Method: POST
Request Body: { "username": "user", "password": "password" }
Response: Returns a JWT token upon successful login.
Logout
Endpoint: /logout
Method: POST
Description: Logs the user out and clears the JWT token from cookies.
Update Profile
Endpoint: /updateUser
Method: POST
Request Body: { "username": "newUsername", "phone": "newPhoneNumber", "profileImage": "base64ImageString" }
Description: Updates the user's profile information. Allows updating of username, phone number, and profile picture.
Contributing
If you would like to contribute to the project, please follow these steps:

Submit an Issue or Bug Report:

You can open an issue on GitHub.
Submit a Pull Request:

Create a new branch, make your changes, and submit a pull request to the main branch on GitHub.
License
This project is licensed under the MIT License. You can read the full license in the LICENSE file.

Contact
If you have any questions, feel free to contact us at email@example.com.

Troubleshooting Configuration Issues
If you encounter issues running the project on your machine:

Issues with Running the Site:

Ensure environment variables are correctly set in the .env file.
Verify that all dependencies are installed using npm install.
Security Settings (CSP and Headers):

Make sure to update Content Security Policy settings if you encounter issues with loading scripts or event handlers.
Accessing from Other Devices:

Ensure the other device has proper network access and can connect to the local IP address.
Port Issues:

Ensure port 4000 is open in firewall settings and that the application is listening on this port.
Thank you for using funChat! We welcome any feedback or suggestions for improving the application.

typescript
Copy code

### Customization Instructions:
1. **Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME`** with your GitHub username and repository name.
2. **Update API details** according to the exact endpoints and request/response formats used in your project.
3. **Adjust the contact information** if you have a different email address or other contact methods.

Feel free to adjust any additional details or sections as needed.
