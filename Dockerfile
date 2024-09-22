# Utilize the Node.js 18 official image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install the dependencies
RUN yarn install --frozen-lockfile

# Build the Fastboot app
RUN yarn build

# Expose the port the Fastboot app runs on
EXPOSE 5000

# Command to run the fastboot server after app gets build
CMD ["node", "fastboot-server"]
