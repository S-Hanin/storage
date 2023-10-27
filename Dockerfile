FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app
COPY build/libs/storage-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar ${0} ${@}"]