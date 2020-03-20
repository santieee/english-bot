FROM node:10.13.0-alpine

# Create Directory for the Container
WORKDIR /english_bot
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install
# Copy all other source code to work directory
ADD . /english_bot
# TypeScript
RUN npm run build-ts
# Start
CMD [ "npm", "start" ]
EXPOSE 7001