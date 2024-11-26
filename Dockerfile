# Build Stage
FROM node:lts-alpine AS build-stage

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the React app
RUN npm run build

# Production Stage
FROM nginx:latest

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the build stage to the NGINX web server
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for the server
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
