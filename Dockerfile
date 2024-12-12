# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Copy SSL certificates for local development
COPY certificates/localhost.crt /app/localhost.crt
COPY certificates/localhost.key /app/localhost.key

# Use npm run dev to enable SSL for development
CMD ["npm", "run", "dev"]
