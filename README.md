# 🏨 Finca La Carla Hotel — Reservation API

REST API for managing reservations at a small hotel, built with **Java 21** and **Spring Boot 3.2**.

## Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Main language |
| Spring Boot 3.2 | Backend framework |
| Spring Data JPA | Persistence |
| H2 Database | In-memory database |
| Springdoc OpenAPI | Swagger documentation |
| Lombok | Boilerplate reduction |
| JUnit 5 + Mockito | Testing |

## Architecture

The project follows a **Hexagonal Architecture (Ports & Adapters)** pattern:

```
src/main/java/com/example/datedemo/
├── domain/                    # Business core
│   ├── Reservation.java       # Domain model (Java Record)
│   ├── ReservationStatus.java # Enum: ACTIVE / CANCELLED
│   ├── ReservationRepository.java  # Port (interface)
│   ├── ReservationService.java     # Business logic
│   └── ReservationNotFoundException.java
├── infrastructure/            # Persistence adapters
│   ├── ReservationEntity.java
│   ├── JpaReservationRepository.java
│   └── ReservationRepositoryAdapter.java
└── interfaces/                # REST adapters
    ├── ReservationController.java
    └── GlobalExceptionHandler.java
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/reservations` | Create a reservation |
| `GET` | `/api/reservations` | List all reservations |
| `PUT` | `/api/reservations/{id}` | Update a reservation |
| `PATCH` | `/api/reservations/{id}/cancel` | Cancel a reservation (soft delete) |

### Example request body (create/update):
```json
{
  "customerName": "Carlos García",
  "customerEmail": "carlos@email.com",
  "roomType": "DOUBLE",
  "checkInDate": "2026-04-01",
  "checkOutDate": "2026-04-05"
}
```

## Business Rules

- Check-out date must be after check-in date.
- Overlapping reservations for the same room type are not allowed.
- Cancelled reservations are not deleted — they are marked with status `CANCELLED`.
- Only `ACTIVE` reservations are considered when validating overlaps.

## Getting Started

### Prerequisites
- Java 21 (recommended to install via [SDKMAN](https://sdkman.io/))
- Maven

### Run the application
```bash
mvn spring-boot:run
```

The application starts at **http://localhost:8080**.

### Swagger UI
Interactive interface to test the API endpoints:

👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### H2 Console (Database)
To inspect the in-memory H2 database directly:

👉 [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

Use the following connection settings:

| Field | Value |
|-------|-------|
| JDBC URL | `jdbc:h2:mem:datedemo` |
| User Name | `sa` |
| Password | *(leave empty)* |

Once connected, you will see the `RESERVATIONS` table with pre-loaded sample data.

### Run tests
```bash
mvn clean test
```

Currently there are **12 tests** (8 unit + 4 integration) covering the business logic and REST endpoints.

## Sample Data

The `data.sql` file pre-loads 5 sample reservations on every application startup:

| Customer | Room Type | Check-in | Check-out | Status |
|----------|-----------|----------|-----------|--------|
| Carlos García | DOUBLE | 2026-04-01 | 2026-04-05 | ACTIVE |
| María López | SUITE | 2026-04-10 | 2026-04-15 | ACTIVE |
| Juan Martínez | SINGLE | 2026-03-20 | 2026-03-25 | CANCELLED |
| Ana Fernández | DOUBLE | 2026-05-01 | 2026-05-07 | ACTIVE |
| Pedro Sánchez | SUITE | 2026-04-20 | 2026-04-22 | ACTIVE |

## Next Steps

- [ ] **Phase 2**: Angular frontend (landing page with hotel photos + reservations page)
