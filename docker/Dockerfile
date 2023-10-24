FROM eclipse-temurin:17-jdk-alpine

RUN addgroup -S app && adduser -S app -G app
USER app

COPY ./build/libs/storage-0.0.1-SNAPSHOT.jar ~/app.jar
WORKDIR ~/
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar ${0} ${@}"]