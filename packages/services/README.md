# graphql-api-server

- [graphql-api-server](#graphql-api-server)
  - [Overview](#overview)
  - [Features](#features)
  - [Docs](#docs)
    - [Workflows](#workflows)
      - [Local Development](#local-development)
      - [Production Deployment](#production-deployment)
    - [Repo Structure](#repo-structure)
    - [Deployment](#deployment)
    - [Authentication Flows](#authentication-flows)
      - [Create Account](#create-account)
      - [Login](#login)
      - [Logout](#logout)
      - [Reset PW](#reset-pw)
    - [Implementation Notes](#implementation-notes)
      - [Security](#security)
    - [Getting Started](#getting-started)

## Overview

## Features

* [ ] easily scale
* [ ] FANTASTIC developer experience
  * [ ] code generation
  * [ ] `intellisense` using TypeScript
* [ ] authentication
  * [ ] `bearer` token auth for intra-server requests, ex: (`graphql-yoga` req from `prisma` db)
  * [ ] `cookie`-based auth using `redis`
    * [ ] used for ensuring requests originating from client application are authenticated
* [ ] modular code
* [ ] `sentry` error reporting
* [ ] `CloudWatch` metrics for `prisma` service

## Docs

### Workflows

#### Local Development

#### Production Deployment

### Repo Structure

```
project
├── package.json
├── api
│   ├── package.json
│   └── index.js
└── react-app
|   ├── package.json
|   └── index.js
├── style-guide
│   ├── package.json
│   └── index.js
```

### Deployment

`prisma` service is deployed to AWS using Fargate. Cluster specs are:

* cpu: 1024 `cpu` units (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
* memory: 2gb

### Authentication Flows

#### Create Account

Creating an account involves a user entering her desired credentials (`email` must be unique and a `password`). Once the account is created, the user must verify they aren't a robot by clicking a confirmation link in an email sent during the new account process. The link contains a fast-expiring token stored in `redis`.

1.  user creates a new user account using an `email` and `password` as credentials
2.  email and hashed PW stored in DB, and we set a property on the new user object `confirmed: false`
3.  send confirmation email to user
4.  set `request.session.userId` to the newly-created users' ID (from DB)
5.  send a `jwt` with the `userId` and the full `user` object to the client

#### Login

1.  Lookup given email in DB
2.  if the email found in step 1 exists, throw if `confirmed: false` (might need to enable a mechanism to request a new confirm token)
3.  Validate raw PW against hashed PW stored in DB
4.  throw if user is not found (step 1) or pw is invalid (step 2)
5.  set `request.session.userId` to the user we found in DB
6.  **REPLACE WITH BRIEF INFO ABOUT HOW WE USE a `redis` list**
7.  send a `jwt` with the `userId` and the full `user` object to the client (**user is now authenticated**)

#### Logout

Logout authenticated user from a given session. If a user is logged in on 3 individual browsers (browserA, browserB, browserC), calling this mutation in browserA will **only** destroy their session in browserA.

1.  Attempt to pull the `userId` off Session obj
2.  destroy the current session
3.  return success message to client

#### Reset PW

Resetting a password requires us to programatically destroy ALL of a given users`sessions (multiple browsers, devices), it is necessary to keep track of all of a users' sessions. If`ctx.request.sessionID`exists, we can infer that the user is authenticated and we want to push this into a list in`redis`that holds all of this users' sessions. This is implemented by creating a list data structure in`redis`using`$userSessionIdPrefix:user.id`as its key and the`sessionID` as the value.

1.

### Implementation Notes

#### Security

To maintain best practices with respect to what to store in a cookie on a user's client (browser), opt to use `connect-redis` as a server side session store, rather than something such as `cookie-session`, which stores the underlying session data on the client.

* [Transport Layer Protection Cheat Sheet][transport layer protection cheat sheet]
* [OWASP Session cheat sheet][owasp session cheat sheet]
* [owasp Authentication cheat sheet][owasp authentication cheat sheet]
* [difference between session and cookie-session][difference between session and cookie-session]
* [MDN: HTTP Cookies][mdn: http cookies]

### Getting Started

1.  **Install Node/npm.** Make sure you have Node >= 8 installed.
2.  **Clone and install dependencies.**
    Run the following commands:

```
git clone https://github.com/peterschussheim/gamma
cd gamma
yarn
```

3.  **Get GitHub API keys.**

* Go to [OAuth applications > Developer applications](https://github.com/settings/developers) in GitHub settings
* Click 'Register a new application' button
* Register your application like below
* Click 'Register application' button at the bottom.
* On the following page, grab the **Client ID** and **Client Secret**

4.  **Add Environment Variables.** Set your Client ID and Client Secret Environment variables in the terminal like this:

```
export GITHUB_CLIENT_ID="your Client ID"
export GITHUB_CLIENT_SECRET="your Client Secret"
```

Or you can use `dotenv`, to do this `cp .env.default .env` and edit with your Github keys.

5.  **Run the app server.**

Start the application server (`graphql-yoga`) on port `4000`.

```
npm run start
```

6.  **Start `playground`** OPTIONAL

During development, having `graphiql` to send queries is very useful. Run `yarn playground` in another shell
to open `graphql-playground`, an improved version of `graphiql` that includes useful features such as remembering the workspace settings, queries, and easily query the **prisma DB** and/or the **application schema** running on the application server.

6.  **Configure debugger** OPTIONAL

Using the following `VSCode` `launch.json` snippet, we can easily debug the application server:

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "inspect ts-node",
      "runtimeArgs": ["-r", "dotenv/config", "-r", "ts-node/register"],
      "args": ["${workspaceFolder}/src/index.ts"]
    }
  ]
}
```

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[githunt-api]: https://github.com/apollographql/GitHunt-API/blob/d3e076eb8e4b9c702ce9890a31fe5d3d5e810e78/api/githubLogin.js
[connector-diagram]: resources/connector-model-diagram.png
[connector-md]: https://github.com/apollographql/graphql-tools/blob/master/designs/connectors.md
[difference between session and cookie-session]: https://stackoverflow.com/questions/15744897/what-is-the-difference-between-session-and-cookiesession-middleware-in-conne/15745086#15745086
[owasp session cheat sheet]: https://www.owasp.org/index.php/Session_Management_Cheat_Sheet
[owasp authentication cheat sheet]: https://www.owasp.org/index.php/Authentication_Cheat_Sheet
[transport layer protection cheat sheet]: https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet
[forgot password cheat sheet]: https://www.owasp.org/index.php/Forgot_Password_Cheat_Sheet
[mdn: http cookies]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
[mdn: redis tips]: https://developer.mozilla.org/en-US/docs/Mozilla/Redis_Tips
