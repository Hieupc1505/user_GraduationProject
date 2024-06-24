# Stage 1: Build the Node.js application
FROM node:current-alpine3.20 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application runs on
EXPOSE 5731

# Stage 2: Serve the application with Nginx
FROM nginx:1.23-alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Remove the default Nginx HTML files
RUN rm -rf ./*

# Copy the build output from the previous stage to the Nginx directory
COPY --from=build /app/build .

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
ENTRYPOINT ["nginx", "-g", "daemon off;"]
