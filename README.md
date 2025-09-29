# Scalable REST API with React Frontend

## About The Project

This project is a full-stack application built for an internship assignment. It features a scalable backend REST API developed with Django and a responsive frontend user interface built with React. The backend handles user authentication with JWT, role-based access control, and provides full CRUD functionality for notes.

---
## Features

* **JWT Authentication:** Secure user registration and login using JSON Web Tokens.
* **Role-Based Access:** Distinction between regular `user` and `admin` roles, where users can only manage their own data.
* **CRUD API:** Full Create, Read, Update, and Delete operations for a "Notes" entity.
* **API Documentation:** Interactive API documentation automatically generated with Swagger/OpenAPI.
* **React Frontend:** A simple, single-page application to register, log in, and manage notes.

---
## Tech Stack

**Backend:**
* Python
* Django & Django REST Framework
* PostgreSQL
* `djangorestframework-simplejwt` for authentication
* `drf-spectacular` for API documentation

**Frontend:**
* React.js (with Vite)
* Axios for API requests
* CSS for styling

---
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Git
* Python 3.10+
* Node.js and npm

### Backend Setup

1.  Clone the repository:
    ```sh
    git clone https://github.com/JackReaper1020/internship-assignment
    ```
2.  Navigate to the backend directory:
    ```sh
    cd internship-assignment/backend
    ```
3.  Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source venv/bin/activate
    ```
4.  Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```
5.  Apply database migrations:
    ```sh
    python manage.py migrate
    ```
6.  Run the development server:
    ```sh
    python manage.py runserver
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  In a **new terminal**, navigate to the frontend directory:
    ```sh
    cd your-repo-name/frontend
    ```
2.  Install npm packages:
    ```sh
    npm install
    ```
3.  Run the development server:
    ```sh
    npm run dev
    ```
    Open your browser and navigate to the URL provided (usually `http://localhost:5173`).

---
## API Documentation

The API documentation is automatically generated and can be viewed at:

[http://127.0.0.1:8000/api/docs/](http://127.0.0.1:8000/api/docs/)

---
## Scalability Considerations

This application is built with a monolithic architecture, which is suitable for its current scope. To handle future growth and increased traffic, several strategies could be implemented:

* **Load Balancing:** Deploying multiple instances of the application and distributing incoming traffic across them using a load balancer like Nginx.
* **Caching:** Integrating a caching layer like Redis to store frequently accessed data (e.g., user profiles or popular notes), reducing database load.
* **Asynchronous Task Processing:** Offloading long-running tasks (like sending emails or processing data) to a distributed task queue like Celery to prevent blocking the main application and improve response times.
