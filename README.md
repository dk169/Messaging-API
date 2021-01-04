# Messing System API

This project is an example of implementation of a Messing System API with [nodejs](https://nodejs.com/) v14.15.3 and [MongoDB](https://www.mongodb.com/)

# Getting started

Install `nodejs` and `mongodb` in your machine.

Install dependencies with npm and run the application:

```
npm install
npm run start
```

## Requirements

- The project use ecmascript modules so you need [Node.js](https://nodejs.org/en/) 13.2.0+.
- For more details go to [Node.js support for ECMAScript modules](https://nodejs.medium.com/announcing-core-node-js-support-for-ecmascript-modules-c5d6dc29b663)

# Configuration File

You need to create `.env` file in the root of the project.  
Before run the server set your nodejs environment variables

.env

```
# env example #
NODE_ENV = <NODE_ENV>
PORT = 5000
MONGO_URI = <MONGO_URI>
JWT_SECRET = <JWT_SECRET>
JWT_EXPIRESIN = 3d
```

# API

Server url is https://kasa-messaging-api.herokuapp.com, and it expose the following APIs:

#### Users routes

- **POST** - `/ap/users/register` - Register a new user

  - **email** - _string_
  - **name** - _string_
  - **password** - _string_

- **POST** - `/ap/users//login` - Login user

  - **email** - _string_
  - **password** - _string_

- **GET** - `/api/users` - Returns all users (must be logged in)

- **GET** - `/api/users/:id` - Returns user by id (must be logged in)

- **PUT** - `/api/users/:id` - Update user info

  - **name** - _string_
  - **email** - _string_
  - **password** - _string_

- **DELETE** - `/api/users/:id` - Delete user

<br/>

#### Messages routes

- **POST** - `/ap/messages` - Create a new message

  - **receiver** - _string_
  - **message** - _string_
  - **subject** - _string_


- **GET** - `/api/messages` - Get all meesages for login user

- **GET** - `/api/messages/unread` - Get all unread messages for user

- **PUT** - `/api/messages/:meesageId/read` - Read message

- **DELETE** - `/api/messages/:id` - Delete message

# Postman

You can find a postman requests Docs with examples of how to user this API [here](https://documenter.getpostman.com/view/14000405/TVsyeQwr)

# JWT strategy

This project use JSON Web Token ([JWT](https://www.npmjs.com/package/passport-jwt)) Bearer Token authentication .
The login API returns an access_token that you have to use to send a correct authorization header in calls that require authentication. You can find an example with postman [here](https://www.getpostman.com/docs/v6/postman/sending_api_requests/authorization)

Login response:

```
{
   ...
  "data": {
    ...
      "token": {
          "expires_in": "3d",
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...._DkYJJh4s"
      },
  ...
}
```

Authorization header example:

```
 Authorization → Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...._DkYJJh4s
```

# Security

The project implements some of nodejs security techniques:

- [Helmet](https://github.com/helmetjs/helmet) : can help protect our app from some well-known web vulnerabilities by setting HTTP headers appropriately
- [Express Rate Limit](https://github.com/nfriedly/express-rate-limit): to protect our applications from brute-force attacks
  - In the server.js we can set a limit of requests in a time window (default is 100 requests in 15 minutes for all endpoints, and 3 requests in a 1 hour for sign up endpoint)

# Contributing

If you want to contribute to this starter, consider:

- Reporting bugs and errors
- Improve the documentation
- Creating new features and pull requests

# Copyright

Licensed under the MIT license.
