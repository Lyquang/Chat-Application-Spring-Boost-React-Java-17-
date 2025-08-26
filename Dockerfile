# -----------------------------
# Stage 1: Build Spring Boot app
# -----------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy file pom.xml và download dependencies trước (tối ưu cache)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy toàn bộ source code
COPY src ./src

# Build ứng dụng
RUN mvn clean package -DskipTests

# -----------------------------
# Stage 2: Run the application
# -----------------------------
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy file JAR từ stage build
COPY --from=build /app/target/*.jar app.jar

# Spring Boot mặc định chạy port 8080
EXPOSE 8080

# Lệnh chạy app
ENTRYPOINT ["java", "-jar", "app.jar"]
