# Task Management API

A RESTful API for managing tasks with authentication, built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Advanced filtering and pagination
- Proper error handling
- Input validation
- Comprehensive API documentation
- Security best practices
- Logging system

## Technology Stack

- **Backend**: Node.js (Express.js)
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: Swagger/OpenAPI

## Project Structure

The project follows a modular structure to improve maintainability and scalability:

- `config/`: Configuration files
- `controllers/`: Request handlers
- `middlewares/`: Custom middlewares
- `models/`: Database schemas and models
- `routes/`: API routes
- `utils/`: Utility functions
- `docs/`: API documentation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/etynosa/codematic-task-api.git
cd task-management-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

4. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides detailed information about all endpoints, request/response schemas, and authentication requirements.

Postman Documentation Url : https://documenter.getpostman.com/view/20930286/2sAYkAP2Xi

Live APIURL: https://taskmgtapi.fly.dev/

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token
- `GET /api/v1/auth/me` - Get current user info
- `GET /api/v1/auth/logout` - Logout User

### Tasks
- `GET /api/v1/tasks` - Get all tasks (with filtering and pagination)
- `POST /api/v1/tasks` - Create a new task
- `GET /api/v1/tasks/:id` - Get a specific task
- `PUT /api/v1/tasks/:id` - Update a task
- `DELETE /api/v1/tasks/:id` - Delete a task

## Security Measures

- Password hashing with bcrypt
- JWT authentication
- Request rate limiting
- Data sanitization against NoSQL injection
- XSS protection
- Security HTTP headers
- Parameter pollution prevention
- CORS enabled

## Error Handling

The API includes a centralized error handling mechanism that:
- Provides consistent error responses
- Handles different types of errors (validation, duplicate keys, etc.)
- Includes appropriate HTTP status codes
- Offers detailed error messages in development mode

## Testing

Run tests with:
```bash
npm test
```

## Linting

Check code style with:
```bash
npm run lint
```

## License

This project is licensed under the MIT License.