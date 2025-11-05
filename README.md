# NestJS Monorepo: Gateway + Authentication (TCP)

## Overview

- `apps/gateway`: Public HTTP REST API (Swagger at `/docs`).
- `apps/authentication`: Microservice for user registration, listing, and login. Communicates with gateway over TCP.
- MongoDB via Docker Compose for persistence.

### Tech

- NestJS v11, TCP microservices, Mongoose (MongoDB), class-validator, Swagger, JWT.

### Run with Docker Compose

```bash
docker compose up -d --build
```

Services:

- gateway: <http://localhost:3000> (bound from container 3000)
- authentication: internal TCP on `authentication:4002` (host port 4002 also mapped by default)
- mongo: exposed on host 27018, internal at `mongo:27017`

### API

#### Note: The attached Postman collection can be used to call the API

- POST `/auth/register` → body: `{ username, password }` → creates user
- POST `/auth/login` → body: `{ username, password }` → returns `{ accessToken, userId, username }`
- GET `/auth/users` → list users
- GET `/auth/me` → requires `Authorization: Bearer <token>`

### Internals

- Message patterns:
  - `auth.register`, `auth.users.list`, `auth.login`
- TCP host/port driven by env (`TCP_HOST`, `TCP_PORT`).
- Both apps must share the same `JWT_SECRET` for verification.
