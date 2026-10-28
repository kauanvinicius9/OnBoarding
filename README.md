## Technical Documentation OnBoarding

### Overview

This documentation details the `back-end` architecture in **Spring Boot 3+**, user profiles, `API` endpoints, **10 modules** training navigation flow and **security** rules.

---

## User Profiles and Access

The system has a **Two-Tier** access structure based on *Roles*:

| User | Scroll | Description and Permissions |
| :--- | :--- | :--- |
| **Founder / Administrator** | `ROLE_ADMIN` | You have full access to the system. You can view performance reports, track the progress of all students, list registered users and manage training content. |
| **Trainee / Student** | `ROLE_USER` | You have exclusive access to the learning environment. You can view the available tracks, study the released modules and record progress. |

---

## Security Architecture (Spring Security + JWT)

Application security is based on `JSON` Web Tokens (**JWT**) with **Stateless** communication.

### Operating Mechanism:

1. **Authentication:** User sends credentials to `/api/auth/login`. If valid, the API returns a signed JWT token containing the `email` and `role`.

2. **Interception (`JwtAuthenticationFilter`):** Every request for protected routes must send the header:

   ```http
   Authorization: Bearer <.....lwn0Db204rbS2Q=Bdws34-8n3fw>
   ```

3. **CORS Global:** Explicitly released in `SecurityConfig` for the frontend origin (`http://localhost:4200`), allowing `GET`, `POST`, `PUT`, `DELETE` and `OPTIONS` methods.

### Permission Table by Route:

* `/api/auth/**` $\rightarrow$ **Public** (Login and Registration);
* `/api/admin/**` $\rightarrow$ **Just `ROLE_ADMIN`**;
* `/api/training/**` $\rightarrow$ **Authenticated (`ROLE_USER` or `ROLE_ADMIN`)**;

---

## Training Navigation System (10 Modules)

The training is structured into **10 sequential modules**. The student can only advance to the next module after completing the previous one.

```
[ Module 01 ] ──(Complete)──> [ Module 02 ] ──(Complete)──> ... ──> [ Module 10 ]
```

### Learning Business Rules:

1. **Module 1:** Released by default when starting training;
2. **Modules 2 to 10:** Remain blocked until the previous module has the status `completed = true` in the `user_progress` table;
3. **Module 10 (Completion):** Upon completion of the 10th module, the API automatically checks whether all 10 modules have been completed;
4. **Review:** Completed modules remain accessible for optional reading at any time.

---

## REST API Endpoint Mapping

### Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user (default `ROLE_USER`). |
| `POST` | `/api/auth/login` | Public | Authenticates the user and returns the JWT Token + Role. |

### Management and Monitoring (`/api/admin`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/users` | `ADMIN` | Lists all students and their profiles. |
| `GET` | `/api/admin/progress/{userId}` | `ADMIN` | Returns detailed progress for a specific student. |

### Module Content (`/api/training/modules` or `/api/modules-content`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/modules-content/all` | Authenticated | Returns the list of 10 modules with texts and orders. |
| `GET` | `/api/training/modules/{id}/content` | Authenticated | Returns the complete contents of a specific module by ID. |

### Progress and Validation (`/api/trainning/progress`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/training/progress/finish-module` | Authenticated | Marks the module as complete. If it is the 10th |
| `GET` | `/api/training/progress/user/{userId}` | Authenticated | Returns the IDs of all modules the user has completed. |

`Backend` has a web documentation **Swagger**: `http://localhost:8080/swagger-ui/index.html`