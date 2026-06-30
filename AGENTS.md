# AGENTS.md — Finca La Carla Hotel

## Quick start

```bash
# Backend (requires Maven + Java 21 on PATH; no mvnw in repo)
cd backend && mvn spring-boot:run          # http://localhost:8080
cd backend && mvn test                      # JUnit 5 + Mockito tests

# Frontend
cd frontend && npm install && npx ng serve  # http://localhost:4200
cd frontend && npm test                     # Karma + Jasmine (Chrome)

# Full stack
docker compose up --build                   # frontend :80, backend :8080
```

## Backend

- **Entrypoint**: `com.example.datedemo.DateDemoApplication` — configures CORS (all origins, all methods).
- **Structure**: `domain/` (records, service, repository interface), `interfaces/` (REST controller, exception handler), `infrastructure/` (JPA entity + adapter).
- **API** (`/api/reservations`): `POST` create, `PUT /{id}` update, `PATCH /{id}/cancel` cancel, `GET` list all.
- **Swagger**: `/swagger-ui.html` (UI), `/api-docs` (JSON). Endpoints sorted by HTTP method.
- **H2 Console**: `/h2-console`, JDBC `jdbc:h2:mem:datedemo`, user `sa`, no password.
- **DB**: H2 in-memory, `ddl-auto: update`, loads `data.sql` (5 sample reservations). **Data lost on restart.**
- **Business rules**: check-out > check-in; no overlapping ACTIVE reservations per room type; cancellation is soft-delete (status → `CANCELLED`); cannot modify cancelled reservations.
- **No Maven Wrapper** (`mvnw`) committed — use system `mvn`.

## Frontend

- **Angular 18** (not 19 as README states), standalone components, Bootstrap 5.3.8.
- **Routes**: `/` → HomeComponent, `/reserve` → ReserveComponent.
- **API proxy**: dev mode uses Angular proxy to `localhost:8080`; production nginx proxies `/api` to Render URL with 300s timeouts.
- **`ReservationService`**: HTTP calls to `/api/reservations` (relative URL).
- **TypeScript**: strict mode, ES2022 target, single quotes (`frontend/.editorconfig`), 2-space indent.
- **Tests**: Karma + Jasmine, Chrome launcher. Schematic generators skip test files (`skipTests: true` in `angular.json`).

## Deployment

- **Render Blueprint** (`render.yaml`): two Docker web services, free tier.
- **Docker Compose**: `docker compose up --build` from root. Backend on `:8080`, frontend on `:80`.


## 