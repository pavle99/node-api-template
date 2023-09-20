FROM node:18-bullseye-slim AS base

# Use /usr/src/app as the CWD
WORKDIR /usr/src/app

# Copy only files required to install dependencies for better layer caching
COPY package*.json ./

# Development stage
FROM base AS dev 
# Install all dependencies and cache them
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install             
# Copy the rest of the code
COPY . .                
# Invoke the build script to transpile code to js
RUN npm run build 
# Run development server
CMD [ "npm", "run", "dev" ]

# Production stage
FROM base AS production
# Set node environment to production
ENV NODE_ENV production
# Install PM2
RUN npm i -g pm2
# Copy process.yml
COPY process.yml ./
# Install only production dependencies
# Use cache mount to speed up install of existing dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --only=production
# Switch to user node
USER node
# Copy js files and change ownership to user node
COPY --chown=node:node --from=dev /usr/src/app/dist ./dist
# Open desired port
EXPOSE 8090
# Use PM2 to run the application as stated in config file
ENTRYPOINT ["pm2-runtime", "./process.yml"]  