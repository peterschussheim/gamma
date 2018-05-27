# graphql-api-server

## Overview

Modeled after [githunt-api][githunt-api].

## Features

* [ ] easily scale
* [ ]

## Docs

### Implementation Notes

* to maintain best practices with respect to what to store in a cookie on a user's client (browser), opt to use `connect-redis` as a server side session store, rather than something such as `cookie-session`, which stores the underlying session data on the client.
  * [OWASP Session cheat sheet][owasp session cheat sheet]
  * [difference between session and cookie-session][difference between session and cookie-session]

### Connectors

![this document][connector-diagram]

Please see the [connector-md][connector-md] produced by the Apollo team to learn more.

### Getting Started

1.  **Install Node/npm.** Make sure you have Node >= 8 installed.
2.  **Clone and install dependencies.**
    Run the following commands:

```
git clone https://github.com/peterschussheim/gamma
cd gamma
yarn
```

3.  **Run migrations.** Set up the SQLite database and run migrations/seed data with the following commands:

```
npm run migrate
npm run seed
```

4.  **Get GitHub API keys.**

* Go to [OAuth applications > Developer applications](https://github.com/settings/developers) in GitHub settings
* Click 'Register a new application' button
* Register your application like below
* Click 'Register application' button at the bottom.
* On the following page, grab the **Client ID** and **Client Secret**

5.  **Add Environment Variables.** Set your Client ID and Client Secret Environment variables in the terminal like this:

```
export GITHUB_CLIENT_ID="your Client ID"
export GITHUB_CLIENT_SECRET="your Client Secret"
```

Or you can use `dotenv`, to do this `cp .env.default .env` and edit with your Github keys.

6.  **Run the app.**

```
npm run dev
```

1.  **Open the app.** Open http://localhost:4000/graphql to load a local `graphiql` instance.

<!-- ### Project structure

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>|
| :--  | :--         |
| `├── .env` | Defines environment variables |
| `├── .graphqlconfig.yml` | Configuration file based on [`graphql-config`](https://github.com/prisma/graphql-config) (e.g. used by GraphQL Playground).|
| `└── database ` (_directory_) | _Contains all files that are related to the Prisma database service_ |\
| `　　├── prisma.yml` | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `　　└── datamodel.graphql` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.ts` | The entry point for your GraphQL server |
| `　　├── schema.graphql` | The **application schema** defining the API exposed to client applications  |
| `　　└── generated` (_directory_) | _Contains generated files_ |
| `　　　　├── prisma.ts` | The generated TypeScript bindings for the Prisma GraphQL API  |
| `　　　　└── prisma.grapghql` | The **Prisma database schema** defining the Prisma GraphQL API  | -->

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[githunt-api]: https://github.com/apollographql/GitHunt-API/blob/d3e076eb8e4b9c702ce9890a31fe5d3d5e810e78/api/githubLogin.js
[connector-diagram]: resources/connector-model-diagram.png
[connector-md]: https://github.com/apollographql/graphql-tools/blob/master/designs/connectors.md
[difference between session and cookie-session]: https://stackoverflow.com/questions/15744897/what-is-the-difference-between-session-and-cookiesession-middleware-in-conne/15745086#15745086
[owasp session cheat sheet]: https://www.owasp.org/index.php/Session_Management_Cheat_Sheet
