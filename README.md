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

---

## Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/4.1.2/maven-plugin)
* [Create an OCI image](https://docs.spring.io/spring-boot/4.1.2/maven-plugin/build-image.html)
* [Spring Boot DevTools](https://docs.spring.io/spring-boot/4.1.2/reference/using/devtools.html)
* [Spring Security](https://docs.spring.io/spring-boot/4.1.2/reference/web/spring-security.html)
* [SpringDoc OpenAPI](https://springdoc.org/)
* [Spring Data JPA](https://docs.spring.io/spring-boot/4.1.2/reference/data/sql.html#data.sql.jpa-and-spring-data)
* [Spring Web](https://docs.spring.io/spring-boot/4.1.2/reference/web/servlet.html)

### Guides
The following guides illustrate how to use some features concretely:

* [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
* [Spring Boot and OAuth2](https://spring.io/guides/tutorials/spring-boot-oauth2/)
* [Authenticating a User with LDAP](https://spring.io/guides/gs/authenticating-ldap/)
* [SpringDoc OpenAPI](https://github.com/springdoc/springdoc-openapi-demos/)
* [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
* [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
* [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
* [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)

### Maven Parent overrides

Due to Maven's design, elements are inherited from the parent POM to the project POM.
While most of the inheritance is fine, it also inherits unwanted elements like `<license>` and `<developers>` from the parent.
To prevent this, the project POM contains empty overrides for these elements.
If you manually switch to a different parent and actually want the inheritance, you need to remove those overrides.

