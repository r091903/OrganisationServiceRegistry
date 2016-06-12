FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/organization-service-registry-microservice
WORKDIR /usr/src/organization-service-registry-microservice

# Install app dependencies
COPY package.json /usr/src/organization-service-registry-microservice
RUN npm install

# Bundle app source
COPY . /usr/src/organization-service-registry-microservice

CMD [ "node", "app.js" ]
		
