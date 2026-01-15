# Mystforged 

> Platform for managing RPG campaigns, character sheets, and game sessions.

Mystforged is a fullstack application designed to make life easier for both game masters and players. The system features secure JWT authentication and containerized infrastructure.


## Technologies

The project is built using modern architecture and industry best practices.

### Backend
- Java 21 
- Spring Boot 3
- Spring Security + JWT 
- PostgreSQL 
- Lombok 

### Frontend
- React 
- Axios 
- React Router

### Infrastructure
- Docker & Docker Compose 

## RoadMap
- [x] User Authentication System
- [x] Campaign Management
- [x] Docker Containerization
- [ ] Login Interface <---- In development
- [ ] Character Sheets 
- [ ] Campaign Notes
- [ ] In Campaign Chat
- [ ] Character Interface
- [ ] Campaign Interface

## Running the Project 

Thanks to Docker, you do not need to install Java, Node, or PostgreSQL locally. The environment is reproducible with a single command.

### Prerequisites
- Docker and Docker Compose installed

### Step by Step

1. Clone the repository:
   ```bash
   git clone https://github.com/GusHPaiva/mystforged.git
   cd mystforged
   ```
   
2. Start the application:
    ```bash
    docker-compose up --build
    ```
3. Access
    ```
    Frontend (App): http://localhost:5173
    API (Backend): http://localhost:8080
    ```
## Project Structure

The repository operates as an organized Monorepo:   
``` 
/
├── backend/            # RESTful API (Spring Boot)
├── frontend/           # User Interface (React/Vite)
├── docker-compose.yml  # Container orchestration
└── README.md           # Documentation
```
## Security Notes
- Database credentials and secret keys (JWT) are currently configured directly in docker-compose.yml to facilitate reproduction and testing.

- For a production environment, it is strongly recommended to use environment variables (.env) and Secret Managers.

## Author
Developed by Gustavo Henrique Assunção Paiva