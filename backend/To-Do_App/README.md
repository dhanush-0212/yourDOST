# To-Do App

A simple REST API for managing to-do items built with Spring Boot.

## Features

- Create, read, update, and delete to-do items
- Input validation for title and description
- Global exception handling for consistent error responses
- In-memory storage using HashMap
- Timestamps for creation and updates
- RESTful API design

## Prerequisites

- Java 17 or higher
- Maven 3.6+ (or use the included Maven wrapper)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd To-Do_App
   ```

2. Build the application:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   Or using the Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```

The application will start on `http://localhost:8080`.

## API Endpoints

### Get All Todos
- **GET** `/todos`
- Returns a list of all to-do items.

### Create a Todo
- **POST** `/todos`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "title": "Sample Todo",
    "description": "This is a sample to-do item"
  }
  ```
- Validation:
  - `title`: Required, max 100 characters
  - `description`: Optional, max 500 characters

### Update a Todo
- **PUT** `/todos/{id}`
- Content-Type: `application/json`
- Body: Same as create, fields are optional for partial updates.

### Delete a Todo
- **DELETE** `/todos/{id}`
- Returns 204 No Content on success.

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Validation errors with detailed field messages
- **404 Not Found**: When trying to update or delete a non-existent todo
- **500 Internal Server Error**: For unexpected errors

## Testing

Sample API requests are provided in the `apiRequests/` folder:

- `CreateTodo.http`: Example POST request
- `GetTodo.http`: Example GET request
- `updateTodo.http`: Example PUT request

You can use tools like IntelliJ IDEA's HTTP Client or Postman to test the endpoints.

Run unit tests:
```bash
mvn test
```

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/dhanush/todo_app/
│   │       ├── ToDoAppApplication.java          # Main application class
│   │       ├── controller/
│   │       │   └── TodoController.java          # REST controller
│   │       ├── model/
│   │       │   └── Todo.java                    # Todo entity
│   │       ├── service/
│   │       │   ├── TodoService.java             # Service interface
│   │       │   └── TodoServiceImpl.java         # Service implementation
│   │       └── exception/
│   │           └── GlobalExceptionHandler.java  # Global exception handling
│   └── resources/
│       ├── application.properties               # Application configuration
│       ├── static/                              # Static resources
│       └── templates/                           # Thymeleaf templates (if used)
└── test/
    └── java/
        └── com/dhanush/todo_app/
            └── ToDoAppApplicationTests.java     # Unit tests
```

## Technologies Used

- **Spring Boot 3.5.7**: Framework for building the application
- **Spring Web**: For REST API development
- **Spring Validation**: For input validation
- **Lombok**: To reduce boilerplate code
- **Maven**: Build tool and dependency management



