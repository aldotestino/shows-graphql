# shows-graphql-api

### A simple graphql api made with Spring Boot and Dgs

### Links
- https://start.spring.io/
- https://netflix.github.io/dgs/

### Usage
- To run the application
  ```shell
  ./gradlew bootRun  
  ```
- With Docker
  - Build the docker image
    ```shell
    docker-compose build  
    ```
  - Run the container
    ```shell
    docker-compose up  
    ```
- Graphiql will be at `http://localhost:8080/graphiql`

### Query
```graphql
query {
    shows(titleFilter: "title") {
        id,
        title,
        releaseYear
    }
}
```

### Mutation
```graphql
mutation {
    addShow(title: "title", releaseYear: 2021) {
        id,
        title,
        releaseYear
    }
}
```

```graphql
mutation {
    removeShow(id: "id") {
        id
        title,
        releaseYear
    }
}
```
