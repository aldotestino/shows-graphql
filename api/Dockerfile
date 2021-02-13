FROM adoptopenjdk/openjdk15
WORKDIR /usr/app/api
COPY . .
RUN ./gradlew clean build -x test
EXPOSE 8080
CMD ["java", "-jar", "./build/libs/shows-graphql-api-0.0.1-SNAPSHOT.jar"]