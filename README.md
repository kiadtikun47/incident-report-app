# Incident Report App

This project is a full-stack incident management application developed using Go (Gin) and React + TypeScript, focusing on RESTful API design and modern frontend architecture.

---

##  Features

-  View all incident reports
-  Create new incident
-  Edit existing incident
-  Delete incident
-  Track category & status (Open, In Progress, Success)
-  Clean and simple UI (Card-style)
-  Full RESTful API using Go (Gin + GORM + SQLite)
-  Frontend built with React + TypeScript

---

##  Tech Stack

###  Backend

- Go (Golang)
- Gin Gonic Framework
- GORM ORM
- SQLite

###  Frontend

- React
- TypeScript
- Axios
- CSS (no UI framework)

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/incident-report-app.git
cd incident-report-app

### 2. Run the Backend (Go)
cd backend
go run main.go

### 3. Run the Frontend (React + TypeScript)
cd frontend
npm install
npm start
