# Utilize the Node.js 14 official image
FROM node:18-alpine

USER root

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
# COPY package*.json ./

# Install the dependencies


# Copy the rest of the application code
COPY . .

RUN yarn install --frozen-lockfile

# Build the Fastboot app
RUN yarn build

# Expose the port the Fastboot app runs on
EXPOSE 5000

# Define the command to run your Fastboot app
CMD ["node", "fastboot-server"]
