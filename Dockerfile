FROM node:14 AS development

# Create app directory
WORKDIR /imake/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

##### production
FROM node:14 AS production

# Set node env to prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

#Set working directory
WORKDIR /imake/src/app

# Copy all from development stage
COPY --from=development /imake/src/app/ .



EXPOSE 8080
CMD [ "node", "dist/main" ]

# Example commands to build and run the dockerfile
# docker build -t imake-nest
# docker run imake-nest