# Use the official Node image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
