# Mutations

- Queries are read only operations, i.e we get some data from the server. we never modify that data.
- Use verbs in writing mutation names, and nouns for query names.
- All mutations must return a result.
- Better to return full object.

## Mutation Definition

- Operations that modify data
- Post a job once you log in to the job-board application
- Once you logged in, you will get an option called 'Post a job' along with home and login.
- On submit of 'post a new job ' data, we want to call the graphQL server, and save the new job to the database.

1. Server side functionality:

- server/ schema.graphql

![Image](./Imgs/65.png)

- server/resolver.js

  --> resolver function will always accept two parameters , root and the arguments.
  --> arguments can be destructured
  as {title,companyId, description} in t his example
  --> ![Image](./Imgs//66.png)

- Invoking a mutation using Apollo Sandbox
  --> ![Image](./Imgs//67.png)
  --> ![Image](./Imgs//68.png)
  --> ![Image](./Imgs//69.png)
  --> ![Image](./Imgs/70.png)
  --> Notice that jobid was generated automatically by the server.
  --> If we see the SERVER/DATA/jobs.json, the new job is saved there
  --> ![Image](./Imgs/71.png)
  --> ![Image](./Imgs/72.png)

## Input types

- in graphql schema , we define input types
  --> ![Image](./Imgs/73.png)
- Changing in resolver.js in server code
  --> ![Image](./Imgs/74.png)
  --> Keeping everything in single line
  ![Image](./Imgs/75.png)
- Testing in the apollo sandbox:
  ![Image](./Imgs/76.png)
  ![Image](./Imgs/77.png)
  --> New job data seen in .json file as shown below
  ![Image](./Imgs/78.png)
  ![Image](./Imgs/79.png)

- If we want to delete the data, first stop the server, then delete the objects in jobs.json file

## Mutation Request

- working with client code
- client / query.js
  --> Note that when sending a graphql request over HTTP, the property is still called query (even though in this case it is really a mutation), when we receive a response, it won't contain a "company object".
- ![Image](./Imgs/80.png)
- ![Image](./Imgs/81.png)

---> We can use alias like below, while fetching the data

- ![Image](./Imgs/82.png)
- ![Image](./Imgs/83.png)
  ----> Client/components/JobForm.js
- ![Image](./Imgs/84.png)
- ![Image](./Imgs/85.png)
- ![Image](./Imgs/86.png)

---> We can use `useNavigate()` hook provided by React Router, which allows us to navigate to different path, that is to send data to different route path as shown, which allows to display new job details to the user.

- ![Image](./Imgs/87.png)
- ![Image](./Imgs/88.png)
- ![Image](./Imgs/89.png)
- ![Image](./Imgs/90.png)
- ![Image](./Imgs/91.png)

## Exercise: deleteJob Mutation

--> Reading the data in graph QL is performed by quries, while creatin, updating, deleting the data is performed by Mutataions.

### deleteJobMutatation:

--> STEPS in SERVER folder's files

1. to define deleteJob Mutation in `schema.graphql` in server code
2. move on to the `resolver.js` code, use `Job.delete() table` ,this method expects an 'id' that should be deleted and then it returns a promise with thge deleted object.
3. Use apollo sandbox to test the mutation

- ![Image](./Imgs/92.png)
- ![Image](./Imgs/93.png)
- ![Image](./Imgs/94.png)
- ![Image](./Imgs/95.png)
- ![Image](./Imgs/96.png)

## Exercise: updateJob Mutation

--> STEPS in SERVER folder's files

1. to define updateJob Mutation in `schema.graphql` in server code
2. move on to the `resolver.js` code, use `Job.update() table` ,this method expects an 'input' object that should be updated and then it returns a promise with the updated object.
3. Use apollo sandbox to test the mutation

- ![Image](./Imgs/97.png)
- ![Image](./Imgs/98.png)
- ![Image](./Imgs/99.png)
- ![Image](./Imgs/100.png)
  --> replacing this operation with mutatio
- ![Image](./Imgs/101.png)
- ![Image](./Imgs/102.png)
- ![Image](./Imgs/103.png)
