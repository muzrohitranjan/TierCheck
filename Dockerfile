# Use Node 20 (required)
FROM node:20-alpine

WORKDIR /app

# Required by instructions
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install


# Your server requires PORT to be set; default provided for convenience
ENV PORT=3000
EXPOSE 3000

# Actual start command (from backend/package.json)
CMD ["npm", "start"]

