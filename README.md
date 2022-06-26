# Getting Started with RDP - React Dashboard Portal

## About this Project

This project is baiscally a Single Page application developed using react and jsonplaceholder for mock backend

# Available Features - Frontend

The basic functionalities available for the client is as follows

- Login
- View Dashboard
  - Users
  - Photos

## ToDo

- Lazy loading images from thumbnail to HD

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Deployment

## Docker

Docker image has been pushed to docker repo which is publically accessable

Create a common network in docker, which acts as a brige to make the client server and nginx conencted to eachother

- Network
  - `docker network create rdp`

Run the docker image as intructed below on your local

- Client
  - `docker run -d --name client --network=rdp raju6713/rdp_frontend:amd64`

**_NOTE:_** Please make sure no other containers running on the name client on your docker network
