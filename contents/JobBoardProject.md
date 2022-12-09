# Install the dependencies

- W.r.t package.json install the dependencies
- install npm package with `npm install `

1. SERVER

- In server/server.js it contains most of the server code
- we can start the server with `npm start`
- The server uses 'nodemon' , it will automatically start the server whenever we change our code

2. CLIENT

- In package.json , it uses below dependencies

```
 "dependencies": {
    "@apollo/client": "^3.6.0",
    "bulma": "^0.9.3",
    "graphql": "^16.4.0",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-router": "^6.3.0",
    "react-router-dom": "^6.3.0"
  }
```

- bulma, is a dependency for css
- react is a js framework
- Installing npm package using `npm install`
- Starting react project using `npm start`

# Hardcoded data in client side

# APOLLO SERVER FOR EXPRESS

- Fetching real data from the server side
- We will start using apollo server with express in this project
- [https://www.apollographql.com/docs/](https://www.apollographql.com/docs/)
- [https://www.apollographql.com/docs/apollo-server/getting-started](https://www.apollographql.com/docs/apollo-server/getting-started)

- Go to the server folder and install the dependencies with

` npm install apollo-server-express`

`npm install graphql`

- Then import to server.js as `import { ApolloServer } from "apollo-server-express";`
- So here in "server.js" we now need to load our "schema.graphql" file. And to do that I'm going to import the "readFile" function provided by the "fs/promises" module. "fs" stands for "File System", and is one of the built-in modules that come with Node.js.
- We can call "readFile" passing the file name, that is "schema.graphql".
- "./" in front to make it clear that the path is relative to the project directory. Then we need to pass a second argument that is the character encoding, and should be "utf8".
- Now, this "readFile" function will return a "Promise" with the data, so we'll need to "await" its result. Note that we can use "await" even in top-level code, with recent Node.js versions.
- created the "typeDefs". Now we also need some "resolvers". Just like for the schema, in this project to create a separate file for our resolvers.
- This is a regular JavaScript file, where we can export a "resolvers" object, that's what we'll pass to ApolloServer.
- Here we need a nested "Query" object, and, to match our initial schema, let's write a "greeting" function, that simply returns a hard-coded string.
- This is just like our first example. Now that we have our "resolvers" we can go and import them into our "server.js" file. So import the "resolvers" object from the "resolvers" module, and we need to add ".js", because that's required by Node.js when importing local modules. At this point we can pass this "resolvers" object to ApolloServer.
- The next step is to start ApolloServer, and we can do that by calling its "start" method. But we need to be careful here, because "start" is asynchronous. You can see that it returns a Promise. So we need to "await" the "start" operation.
- At this point we need to plug ApolloServer into our Express application. The way to do this is to call "apolloServer.applyMiddleware". This method takes an object where we can pass our Express "app". So this will expose the GraphQL server as part of the Express server.
- Optionally we can also set a "path" here, specifying where we want to receive GraphQL requests. This defaults to "/graphql", but I like to set it explicitly, so it's easier to find out if you look at the code. This way any HTTP request sent to "/graphql" will be routed by the Express framework to the ApolloServer middleware. While any other request will be handled by Express as usual. For example a POST request for the "/login" path will be routed to the login handler defined on line 20.
- **So by using Apollo Server with Express we can handle both GraphQL requests, and other HTTP requests in the same server.** Now, let's start the server by running "npm start", that will launch our "server.js" script using Nodemon, and we can see that the server is running on port 9000.
- This way we can easily click on this URL to open the Apollo Server welcome page, from where we can open the Sandbox. And if run this query we can see that the GraphQL server is working fine! So this is how we can integrate Apollo Server into an Express application. It's similar to running Apollo Server on its own, but there's an extra step required to plug the GraphQL handler as an Express middleware.

---
