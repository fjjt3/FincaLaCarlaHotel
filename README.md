# 🏨 Finca La Carla Hotel — Reservation System

Full-stack application for managing reservations at a small hotel in **Antequera, Málaga**.

## Project Structure

- **`/backend`**: Spring Boot 3.2 + Java 21 REST API.
- **`/frontend`**: Angular 19 + Bootstrap 5 web interface.

## Quick Start

### 1. Run the Backend
```bash
cd backend
./mvnw spring-boot:run
```
The API will be available at [http://localhost:8080](http://localhost:8080).
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **H2 Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
  - **JDBC URL**: `jdbc:h2:mem:datedemo`
  - **User**: `sa` (no password)

### 2. Run the Frontend
```bash
cd frontend
npm install
npx ng serve
```
The web interface will be available at [http://localhost:4200](http://localhost:4200).

## 🐳 Run with Docker (Full Stack)

If you have Docker installed, you can launch everything with one command:

```bash
docker compose up --build
```

- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:8080](http://localhost:8080)
- **Swagger**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **H2 Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)


## Tech Stack

| Component | technologies |
|---|---|
| **Backend** | Java 21, Spring Boot 3.2, JPA, H2, Swagger, Lombok, JUnit 5 |
| **Frontend** | Angular 19, Bootstrap 5, RxJS |

## Business Rules

- Check-out date must be after check-in date.
- Overlapping reservations for the same room type are not allowed (only `ACTIVE` ones).
- Soft delete: Cancelled reservations are marked as `CANCELLED`, not deleted.

## Sample Data
The system pre-loads 5 sample reservations on startup (defined in `backend/src/main/resources/data.sql`).
