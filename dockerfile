# Stage 1: Build the Node.js application
FROM node:current-alpine3.20 as build

# Define build arguments for environment variables
ARG VITE_SERVER_PROD
ARG VITE_apiKey
ARG VITE_authDomain
ARG VITE_projectId
ARG VITE_storageBucket
ARG VITE_messagingSenderId
ARG VITE_appId
ARG VITE_measurementId

# Set environment variables during the build process
ENV VITE_SERVER_PROD=$VITE_SERVER_PROD
ENV VITE_apiKey=$VITE_apiKey
ENV VITE_authDomain=$VITE_authDomain
ENV VITE_projectId=$VITE_projectId
ENV VITE_storageBucket=$VITE_storageBucket
ENV VITE_messagingSenderId=$VITE_messagingSenderId
ENV VITE_appId=$VITE_appId
ENV VITE_measurementId=$VITE_measurementId

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
EXPOSE 4000



FROM nginx:1.23-alpine as production-build
COPY nginx.conf /etc/nginx/conf.d/default.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from the stage 1
COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]