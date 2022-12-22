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
