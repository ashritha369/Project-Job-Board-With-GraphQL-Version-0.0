# Authentication

## Authentication Flow

- In this section we'll talk about authentication and authorisation. We know that, in our Job Board application, users can post a new job. But they should only be able to do that if they are logged in. If you're not logged in you don't even see the Post Job link in the page. But that's not sufficient from a security point of view.
- Because somebody could send a createJob request directly to our GraphQL server. Like we did many times ourselves using the Apollo Sandbox. A malicious user could easily call our server and post a "Spam Job". Let's write here that this was "Posted by an intruder".
- And if we execute this mutation, the job will be created, even though we're not logged in into our frontend application.
- This means bad people on the internet could fill our job board with spam posts like this one. Before we jump into writing the code to protect our createJob mutation,

- Overview of how authentication works.

- We have a server application, of course, that talks to the database and exposes a GraphQL API.
- Then we have a separate client app, that is our web frontend. When the user logs in, the client makes an HTTP request to the "/login" path on the server.
- And the server responds with an authentication token, that is a special string that securely identifies the user. Note that this is not a GraphQL request, because it's better to keep the authentication step outside of the GraphQL API.
- So the client receives this "token", and saves it somewhere, like in local storage or in cookies. For the Job Board example we use local storage just because it's simpler, but cookies can be slightly more secure.
- The client saves the token so that, every time it makes any API request, like GraphQL requests in our example, it will include the token in the request, typically in a HTTP header called "Authorization".
- The token identifies the user, and is signed by the server. So when the server receives a request from the client, it can verify that it was sent by a legitimate user.
- Assuming the token is valid, the server will return whatever data the client asked for. This is a pretty standard authentication flow.

![Image](./Imgs/img.png)

- Credentials to login
  -->

```
[
  {
    "id": "uogQAZnLcAlT6lMuNbpQg",
    "email": "alice@facegle.io",
    "password": "alice123",
    "companyId": "pVbRRBQtMVw6lUAkj1k43"
  },
  {
    "id": "i0Nn6qvicHP5DTuKTyaq0",
    "email": "bob@goobook.co",
    "password": "bob123",
    "companyId": "wvdB54Gqbdp_NZTXK9Tue"
  }
]
```

![Image](./Imgs/img1.png)
![Image](./Imgs/img2.png)
![Image](./Imgs/img3.png)
![Image](./Imgs/img4.png)
![Image](./Imgs/img5.png)
![Image](./Imgs/img6.png)

--> Lets see how this is done in code:

1. When the 'login form'
   is submitted
2. In auth.js the logic takes place as shown:
   ![Image](./Imgs/img7.png)
3. The tokens are also called as JWT: JSON Web Tokens, is a standard for encoding user details [https://jwt.io/](https://jwt.io/)
   ![Image](./Imgs/img8.png)
4. The JWT websites include a debugger, where we can decode a token and see what it contains. If I paste the token that I copied from local storage in our application, you can see that it contains a payload, that is some JSON data.
5. In particular, it includes a "sub" property, where "sub" is short for "subject". The "sub" string is effectively the user ID. If I copy that string, and go to our server project, if we look at the users data, you can see that the ID for user "alice" is exactly the same string that was encoded in the JSON web token.
6. This means that, when the server receives a request with a token, it can decode it to find out which user made the request. We can see exactly how that works if we look at the code in "server.js".
7. Every token is signed using a "secret", that is a string that only the server knows. This way the server can verify that the token was created by the server itself and can be trusted. When a user logs in, the request goes to this Express handler.
8. If the credentials are valid, the server generates a new token, signed using the secret, and returns it to the client.
9. For any other request, including GraphQL requests, the server uses the "express-jwt" middleware to check if there is a token. A "middleware" is basically a function that the Express framework applies to every request it receives.
10. Our example uses the "express-jwt" library to verify JSON web tokens. If the request includes a token, this library will decode it, extract its payload and make it available to our code as the "auth" property on the request. We'll see in the next video how to use that feature to check if a user is authenticated or not. This way we'll be able to ensure that only logged in users can create new jobs.
    ![Image](./Imgs/img9.png)
    ![Image](./Imgs/img10.png)
    ![Image](./Imgs/img11.png)
    ![Image](./Imgs/img12.png)
    ![Image](./Imgs/img13.png)

## Resolver Context

- How can we check if the user is authenticated in a graphql resolver?
- It has to make sure that only authenticated user can create a job.
- we know that resolver function will automatically receive some arguments from graphql framework.
- so far we used first two parameters that are the parent object and graphql arguments. Now adding the third parameter called 'context'.
- The "context" is an object that can contain any additional properties we want to make available to our resolvers.

![Image](./Imgs/img14.png)
![Image](./Imgs/img15.png)
![Image](./Imgs/img16.png)

- The 'context' is an empty object. which means in the context we can add objects that is needed.we can do that in server code under server.js where we initialise the apolloserver instance.
  ![Image](./Imgs/img17.png)
  ![Image](./Imgs/img18.png)
  ![Image](./Imgs/img19.png)

- basically 'context' is a function that returns an object
  ![Image](./Imgs/img20.png)
- Since we are running apollo server with express framework, it will be expresscontext.
  ![Image](./Imgs/img21.png)
  ![Image](./Imgs/img22.png)

- The contextParams are of type ExpressContext, because we are running apooloserver using express framework, in this case params as 'req' for 'request' and 'res' for 'response'.

- We can destructure the params to {req}
  ![Image](./Imgs/img23.png)
  ![Image](./Imgs/img24.png)
- This shows that we can use the context to extract information from an HTTP request, and make it available to our resolvers. Note how this kind of information is not part of a standard GraphQL request. GraphQL gives us things like the query string and any GraphQL arguments, but we don't normally get HTTP-specific information, like the method or headers. That's why this object is called "context", because it gives us access to data that's outside the GraphQL engine, and depends on the context in which we're running it.

- So now we will check authentication
- ![Image](./Imgs/img25.png)
- auth : undefined, that means the request we sent doesnot include authentication.
- To be authenticated we need to send a valid token
- ![Image](./Imgs/img26.png)
- ![Image](./Imgs/img27.png)
- ![Image](./Imgs/img28.png)
- ![Image](./Imgs/img29.png)
- ![Image](./Imgs/img30.png)
- ![Image](./Imgs/img31.png)

- The context now contains the 'auth' object, with the payload decoded.

- if the user is authenticated or not. In the createJob resolver, we can extract the "auth" property from the context. Then, instead of logging something, we want to make sure that only authenticated users can create a job. So we can check if "auth" is not set, which means authentication is missing, then we could simply throw an error here, saying "Unauthorized".
- Let's save these changes, and go and test this. First, let's see what happens if the "Authorization" header is missing. We can disable it by unchecking this box. If we run the mutation now, you can see that we get an error response, with a message saying "Unauthorized". So we closed the loophole: it's no longer possible to create a job if you're not logged in. Now, if we re-enable the "Authorization" header, and send the request again, this time the request succeeds, and it created a new job .
- Incidentally, I've been creating a bunch of "Test" jobs, all with the same title. I'll delete them later. The important thing is that we've seen how we can restrict some GraphQL operations only to authenticated users. We can use the context parameter to pass any extra data we need to our resolvers.
- But we are responsible for setting the data passed in the context object. In this example we're setting the "auth" property to be the JSON web token payload, as decoded by the "express-jwt" middleware. But you can use the context to pass any additional information you need, that's not part of the standard GraphQL request.
- ![Image](./Imgs/img32.png)
- ![Image](./Imgs/img33.png)
