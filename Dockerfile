# Use the official Node.js 18.19.0 image
FROM node:18.19.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD [ "node", "server.js" ]
