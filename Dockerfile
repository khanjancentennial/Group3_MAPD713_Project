# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code into the container
COPY . .

# Expose the backend port
EXPOSE 5000

# Run the backend app
CMD ["npm", "start"]