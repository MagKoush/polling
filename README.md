# \<Application Name> Server

Polling API application to support basic features as of now. The features include the followings:

- Login Users

- Create/Update/Get Users

- Create/Update/Get Elections

- Create/Update/Get Polls

- Create/Update/Get Votes

## Data Storage

Polling application stores and retrieve the data asynchronously in a secure manner.

### NoSQL

The Data is stored in a [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/docs/) driver.

## Development Environment on macOS

In order to setup the development environment you must go over the followings:

1. Install [Node](https://nodejs.org/en/)
2. Install [nvm](https://github.com/nvm-sh/nvm)
3. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. Clone and install the appropriate node driver and dependencies

   ```bash
     git clone git@github.com:MagKoush/polling.git
     cd polling
     nvm install
     npm i
   ```

5. Please make sure to run your mongo server locally. Learn more mongo online.
6. Run the application

   ```bash
   npm start
   ```

### Environment Variables

By default the environment variables are set already. However if you would like to modify the variables, make sure to create an `.env` file. Do make sure to not commit this file.

| Key                | Default Value                     | Description                                                                                                |
| ------------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| IS_LOCAL_DB        | true                              | Only to run Mongo server locally                                                                           |
| LOCAL_MONGO_DB_URL | mongodb://localhost:27017/polling | Url to run the mongo server locally                                                                        |
| MONGO_DB_USERNAME  | username                          | username to access the cloud mongoDB, talk to the owner to get one                                         |
| MONGO_DB_PASSWORD  | passowrd                          | username to access the cloud mongoDB, talk to the owner to get one                                         |
| PASSPORT_SECRET    | secret                            | secret key to generate the JWT for authentication. this will eventually turn into a PEM-encoded public key |
