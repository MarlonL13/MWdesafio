# Desafio MW

This repository contains a full-stack application designed for monitoring internet performance and managing alerts. The project is divided into two main parts: a **frontend** built with React and Material-UI, and a **backend** built with Node.js, Express, and Prisma.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Scripts](#scripts)
- [License](#license)

---

## Features

### Frontend
- **Dashboard**: Displays charts and metrics for monitoring internet performance.
- **Alerts**: Lists recent alerts with the ability to mark them as read.
- **Charts**: Includes line and pie charts for visualizing data trends.
- **Responsive Design**: Optimized for various screen sizes using Material-UI.

### Backend
- **WebSocket Notifications**: Real-time notifications for new alerts.
- **Database Integration**: Uses PostgreSQL with Prisma ORM for managing data.
- **Zabbix API Integration**: Fetches monitoring data from Zabbix.
- **Error Handling**: Comprehensive error handling for API and database operations.
- **Cron Jobs**: Periodic checks for errors in monitored items.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Material-UI**: For styling and responsive design.
- **Day.js**: For date manipulation.
- **Axios**: For API requests.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For building RESTful APIs.
- **Prisma**: For database management.
- **WebSocket**: For real-time communication.
- **Zabbix API**: For fetching monitoring data.
- **PostgreSQL**: As the database.

---

## Setup Instructions

### Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install

2. **Set Up Environment Variables**:  
    Create a `.env` file in the `backend` directory with the following variables:  
    ```env
    DATABASE_URL=your_postgresql_connection_string
    ZABBIX_API_URL=your_zabbix_api_url
    ZABBIX_API_USER=your_zabbix_username
    ZABBIX_API_PASSWORD=your_zabbix_password
    ```

3. **Run Database Migrations**:  
    ```bash
    npx prisma migrate dev
    ```

4. **Seed the Database (optional)**:  
    ```bash
    npx prisma seed
    ```

5. **Start the Backend**:  
    ```bash
    npm start
    ```  
    The backend will run on [http://localhost:3335](http://localhost:3335).

### Frontend Setup

1. **Install Dependencies**:  
    ```bash
    cd frontend
    npm install
    ```

2. **Start the Frontend**:  
    ```bash
    npm start
    ```  
    The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Project Structure

### Frontend
- Contains the React application with Material-UI components and routing logic.

### Backend
- Contains the Node.js server, Prisma ORM setup, and integration with Zabbix API.

---

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open [http://localhost:3000](http://localhost:3000) in your browser to access the dashboard.

---

## Scripts

### Backend
- **Start Server**:  
  ```bash
  npm start
  ```
- **Run Migrations**:  
  ```bash
  npx prisma migrate dev
  ```
- **Seed Database**:  
  ```bash
  npm run prisma:seed
  ```

### Frontend
- **Start Development Server**:  
  ```bash
  npm start
  ```
- **Build for Production**:  
  ```bash
  npm run build
  ```
- **Run Tests**:  
  ```bash
  npm test
  ```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.